import { formatDistance } from "date-fns";
import Button from "../Button/Button";
import Calender from "./Calender";
import { useState } from "react";

const RoomReservation = ({ room }) => {
  const { from, to } = room;
  // const [value, setValue] = useState({
  //   startDate: new Date(from),
  //   endDate: new Date(to),
  //   key: "selection",
  // });
  // const totalDays = parseInt(
  //   formatDistance(new Date(to), new Date(from)).split(" ")[0]
  // );
  // const totalPrice = totalDays * room?.price;
  // console.log(totalPrice);
  const totalPrice = room?.price;
  return (
    <div className="rounded-xl border-[1px] border-neutral-200 overflow-hidden bg-white">
      <div className="flex items-center gap-1 p-3">
        <div className="text-2xl font-semibold">${room?.price}</div>
        <div className="font-light text-neutral-600">night</div>
      </div>
      <hr />
      <div className="flex justify-center">
        <Calender />
      </div>
      <hr />
      <div className="p-4">
        <Button label={"Reserve"} />
      </div>
      <hr />
      <div className="flex items-center justify-between text-lg font-semibold p-4">
        <div>Total</div>
        <div>${totalPrice}</div>
      </div>
    </div>
  );
};

export default RoomReservation;
