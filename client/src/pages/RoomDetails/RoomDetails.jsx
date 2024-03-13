import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loader from "../../components/Shared/Loader";
import Container from "../../components/Shared/Container";
import { Helmet } from "react-helmet-async";
import Header from "../../components/RoomDetails/Header";
import RoomInfo from "../../components/RoomDetails/RoomInfo";
import RoomReservation from "../../components/RoomDetails/RoomReservation";

const RoomDetails = () => {
  const { id } = useParams();
  const [room, setRoom] = useState({});
  const [loading, setLoading] = useState(false);

  const getRooms = async () => {
    try {
      setLoading(true);
      const res = await fetch("/rooms.json");
      const data = await res.json();
      if (id) {
        const singleRoom = data.find((room) => room._id === id);
        setRoom(singleRoom);
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getRooms();
  }, [id]);
  if (loading) return <Loader />;
  return (
    <Container>
      <Helmet>
        <title>{room.title}</title>
      </Helmet>
      <div className="max-w-screen-lg mx-auto">
        <div className="flex flex-col gap-6">
          <Header roomData={room} />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-7 mt-6 gap-10">
          <RoomInfo roomData={room} />
          {/* calender */}
          <div className="md:col-span-3 order-first md:order-last mb-10">
            <RoomReservation room={room} />
          </div>
        </div>
      </div>
    </Container>
  );
};

export default RoomDetails;
