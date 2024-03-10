import { useEffect, useState } from "react";
import Card from "./Card";
import Container from "../Shared/Container";

const Rooms = () => {
  const [rooms, setRooms] = useState([]);
  const getRooms = async () => {
    try {
      const res = await fetch("rooms.json");
      const data = await res.json();
      setRooms(data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getRooms();
  }, []);
  return (
    <Container>
      <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
        {rooms.map((room) => (
          <Card key={room._id} room={room}></Card>
        ))}
      </div>
    </Container>
  );
};

export default Rooms;
