import { useEffect, useState } from "react";
import Card from "./Card";
import Container from "../Shared/Container";
import { useSearchParams } from "react-router-dom";
import Heading from "../Shared/Heading/Heading";
import Loader from "../Shared/Loader";
import { getAllRooms } from "../../Api/rooms";

const Rooms = () => {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(false);

  const getRooms = async () => {
    try {
      setLoading(true);
      const allRooms = await getAllRooms();
      setRooms(allRooms);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getRooms();
  }, []);

  if (loading) return <Loader />;
  return (
    <Container>
      {rooms && rooms.length > 0 ? (
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
          {rooms.map((room) => (
            <Card key={room._id} room={room}></Card>
          ))}
        </div>
      ) : (
        <div className="flex items-center justify-center min-h-[calc(100vh-300px)]">
          <Heading
            title={"No rooms available in this category!"}
            subtitle={"Please select other category"}
            center={true}
          />
        </div>
      )}
    </Container>
  );
};

export default Rooms;
