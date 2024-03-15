import axiosSecure from ".";

// get all rooms from db
export const getAllRooms = async () => {
  const { data } = await axiosSecure("/rooms");
  return data;
};

// Get single room
export const getSingleRoom = async (id) => {
  const { data } = await axiosSecure(`/room/${id}`);
  return data;
};
