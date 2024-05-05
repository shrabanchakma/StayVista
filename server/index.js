const express = require("express");
const app = express();
require("dotenv").config();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const jwt = require("jsonwebtoken");
const morgan = require("morgan");
const port = process.env.PORT || 8000;
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
// middleware
const corsOptions = {
  origin: ["http://localhost:5173", "http://localhost:5174"],
  credentials: true,
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());
app.use(morgan("dev"));
const verifyToken = async (req, res, next) => {
  const token = req.cookies?.token;
  console.log(token);
  if (!token) {
    return res.status(401).send({ message: "unauthorized access" });
  }
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) {
      console.log(err);
      return res.status(401).send({ message: "unauthorized access" });
    }
    req.user = decoded;
    next();
  });
};
const client = new MongoClient(process.env.DB_URI, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});
async function run() {
  try {
    const usersCollection = client.db("stayVistaDb").collection("users");
    const roomsCollection = client.db("stayVistaDb").collection("rooms");
    const bookingsCollection = client.db("stayVistaDb").collection("bookings");
    // Role verification middleware
    // for admin
    const verifyAdmin = async (req, res, next) => {
      const user = req.user;
      const result = await usersCollection.findOne({ email: user?.email });
      if (!result || result?.data?.role !== "admin")
        return res.status(401).send({ message: "unauthorized access" });
      next();
    };
    // for host
    const verifyHost = async (req, res, next) => {
      const user = req.user;
      const result = await usersCollection.findOne({ email: user?.email });
      if (!result || result?.data?.role !== "host")
        return res.status(401).send({ message: "unauthorized access" });
      next();
    };
    // auth related api
    app.post("/jwt", async (req, res) => {
      const user = req.body;
      console.log("I need a new jwt", user);
      const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: "365d",
      });
      res
        .cookie("token", token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
        })
        .send({ success: true });
    });

    // Logout
    app.get("/logout", async (req, res) => {
      try {
        res
          .clearCookie("token", {
            maxAge: 0,
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
          })
          .send({ success: true });
        console.log("Logout successful");
      } catch (err) {
        res.status(500).send(err);
      }
    });

    // Get all rooms
    app.get("/rooms", async (req, res) => {
      const result = await roomsCollection.find().toArray();
      res.send(result);
    });

    // Get single room
    app.get("/room/:id", async (req, res) => {
      try {
        const roomId = req.params.id;
        console.log(roomId);
        const query = { _id: new ObjectId(roomId) };
        const room = await roomsCollection.findOne(query);
        res.send(room);
      } catch (error) {
        res.status(500).send(error);
      }
    });

    // save single room
    app.post("/rooms", verifyToken, async (req, res) => {
      const roomData = req.body;
      const result = await roomsCollection.insertOne(roomData);
      res.send(result);
    });

    // Save user in db
    app.put("/users/:email", async (req, res) => {
      const email = req.params.email;
      const user = req.body;
      const query = { email: email };
      const options = { upsert: true };
      const isExist = await usersCollection.findOne(query);
      console.log("User found?----->", isExist);
      if (isExist) {
        if (user?.status === "Requested") {
          const result = await usersCollection.updateOne(
            query,
            {
              $set: { ...user },
            },
            options
          );
          return res.send(result);
        }
        return res.send(isExist);
      }
      const result = await usersCollection.updateOne(
        query,
        {
          $set: { ...user, timestamp: Date.now() },
        },
        options
      );
      res.send(result);
    });

    // get user
    app.get("/user/:email", async (req, res) => {
      const email = req.params.email;
      const result = await usersCollection.findOne({ email });
      // use projection to send specific properties
      res.send(result);
    });

    // host rooms
    app.get("/rooms/:email", async (req, res) => {
      console.log("entering");
      const email = req.params.email;
      const result = await roomsCollection
        .find({ "host.email": email })
        .toArray();
      res.send(result);
    });

    // create payment intent
    app.post("/create-payment-intent", async (req, res) => {
      const { price } = req.body;
      const amount = parseInt(price * 100);
      if (!price || amount < 1) return;
      const { client_secret } = await stripe.paymentIntents.create({
        amount: amount,
        currency: "usd",
        payment_method_types: ["card"],
      });
      res.send({ clientSecret: client_secret });
    });

    // save booking info in booking collection
    app.post("/bookings", async (req, res) => {
      const data = req.body;
      const result = await bookingsCollection.insertOne(data);
      // send email
      res.send(result);
    });

    // update room booking status
    app.patch("/rooms/status/:id", async (req, res) => {
      const userId = req.params.id;
      const status = req.body.status;
      console.log(userId, status);
      const query = { _id: new ObjectId(userId) };
      const updateDoc = {
        $set: {
          booked: status,
        },
      };
      const result = await roomsCollection.updateOne(query, updateDoc);
      res.send(result);
    });

    // get all bookings for guest
    app.get("/bookings", verifyToken, async (req, res) => {
      const email = req.query.email;
      if (!email) return res.send([]);
      const result = await bookingsCollection
        .find({ "guest.email": email })
        .toArray();
      res.send(result);
    });

    // get all bookings for host
    app.get("/bookings/host", verifyToken, verifyHost, async (req, res) => {
      const email = req.query.email;
      if (!email) return res.send([]);
      const result = await bookingsCollection.find({ host: email }).toArray();
      res.send(result);
    });

    // get all users
    app.get("/users", verifyToken, verifyAdmin, async (req, res) => {
      const result = await usersCollection.find().toArray();
      console.log(result.data);
      res.send(result);
    });

    // update user role
    app.put("/users/update/:email", async (req, res) => {
      const email = req.params.email;
      const user = req.body;
      const result = await usersCollection.updateOne(
        { email },
        {
          $set: {
            ...user,
            timestamp: Date.now(),
          },
        },
        { upsert: true }
      );
      res.send(result);
    });
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Hello from StayVista Server..");
});

app.listen(port, () => {
  console.log(`StayVista is running on port ${port}`);
});
