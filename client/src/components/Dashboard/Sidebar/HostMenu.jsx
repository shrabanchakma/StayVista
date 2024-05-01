import MenuItem from "./MenuItem";
import { BsFillHouseAddFill } from "react-icons/bs";
import { MdMapsHomeWork } from "react-icons/md";
const HostMenu = () => {
  return (
    <>
      <MenuItem icon={BsFillHouseAddFill} label="Add Room" address="add-room" />
      <MenuItem
        icon={MdMapsHomeWork}
        label="My Listings"
        address="my-listings"
      />
    </>
  );
};

export default HostMenu;
