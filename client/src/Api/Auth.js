import axiosSecure from ".";

// Save user data in database
export const saveUser = async (user) => {
  const currentUser = {
    email: user.email,
    role: "quest",
    status: "Verified",
  };
  const { data } = await axiosSecure.put(`/users/${user?.email}`, currentUser);
  return data;
};

// Create token for the user

export const getToken = async (email) => {
  const { data } = await axiosSecure.post("/jwt", email);
  console.log("token is :  ", data);
  return data;
};
