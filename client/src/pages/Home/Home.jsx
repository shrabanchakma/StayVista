import Categories from "../../components/Rooms/Categories/Categories";
import Rooms from "../../components/Rooms/Rooms";

const Home = () => {
  return (
    <div>
      {/* category section */}
      <Categories />
      {/* room cards */}
      <Rooms />
    </div>
  );
};

export default Home;
