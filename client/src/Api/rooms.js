import axiosSecure from ".";

// get all rooms from db
export const getAllRooms = async () => {
  const { data } = await axiosSecure("/rooms");
  return data;
};

// get all rooms for host
export const getHostRooms = async (email) => {
  const { data } = await axiosSecure(`/rooms/${email}`);
  return data;
};

// Get single room
export const getSingleRoom = async (id) => {
  const { data } = await axiosSecure(`/room/${id}`);
  return data;
};

// save single room
export const addRoom = async (roomData) => {
  const { data } = await axiosSecure.post("/rooms", roomData);
  return data;
};
