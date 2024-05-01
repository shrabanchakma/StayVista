import MenuItem from "./MenuItem";
import { FaUserCog } from "react-icons/fa";
const AdminMenu = () => {
  return (
    <>
      <MenuItem
        icon={FaUserCog}
        label={"My Bookings"}
        address={"my-bookings"}
      />
    </>
  );
};

export default AdminMenu;
