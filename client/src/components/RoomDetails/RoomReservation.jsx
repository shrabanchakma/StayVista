import { formatDistance } from "date-fns";
import Button from "../Button/Button";
import Calender from "./Calender";
import { useState } from "react";
import BookingModal from "../Modal/BookingModal";
import useAuth from "../../hooks/useAuth";

const RoomReservation = ({ room }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useAuth();
  const [value, setValue] = useState({
    startDate: new Date(room?.from),
    endDate: new Date(room?.to),
    key: "selection",
  });

  const totalDays = parseInt(
    formatDistance(new Date(room?.to), new Date(room?.from)).split(" ")[0]
  );
  const totalPrice = totalDays * room?.price;

  const closeModal = () => {
    setIsOpen(false);
  };

  const handleDateChange = (range) => {
    setValue({
      startDate: new Date(range?.from),
      endDate: new Date(range?.to),
      key: "selection",
    });
  };

  const [bookingInfo, setBookingInfo] = useState({
    guest: {
      name: user?.displayName,
      email: user?.email,
      image: user?.photoURL,
    },
    host: room?.host?.email,
    location: room?.location,
    price: totalPrice,
    to: value?.endDate,
    from: value?.startDate,
    title: room?.title,
    roomId: room?._id,
    image: room?.image,
  });

  return (
    <div className="rounded-xl border-[1px] border-neutral-200 overflow-hidden bg-white">
      <div className="flex items-center gap-1 p-3">
        <div className="text-2xl font-semibold">${room?.price}</div>
        <div className="font-light text-neutral-600">night</div>
      </div>
      <hr />
      <div className="flex justify-center">
        <Calender value={value} handleDateChange={handleDateChange} />
      </div>
      <hr />
      <div className="p-4">
        <Button onClick={() => setIsOpen(true)} label={"Reserve"} />
      </div>
      <hr />
      <div className="flex items-center justify-between text-lg font-semibold p-4">
        <div>Total</div>
        <div>${totalPrice}</div>
      </div>
      <BookingModal
        closeModal={closeModal}
        isOpen={isOpen}
        bookingInfo={bookingInfo}
      />
    </div>
  );
};

export default RoomReservation;
