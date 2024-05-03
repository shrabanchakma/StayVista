import axiosSecure from ".";

// create payment intent
export const createPaymentIntent = async (price) => {
  const { data } = await axiosSecure.post("/create-payment-intent", price);
  return data;
};

// save booking info
export const saveBookingInfo = async (bookingInfo) => {
  const { data } = await axiosSecure.post("/bookings", bookingInfo);
  return data;
};

// update room status
export const updateRoomStatus = async (id, status) => {
  const { data } = await axiosSecure.patch(`/rooms/status/${id}`, {
    status,
  });
  return data;
};
