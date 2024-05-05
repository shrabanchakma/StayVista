import { GrUserAdmin } from "react-icons/gr";
import useUserRole from "../../../hooks/useUserRole";
import MenuItem from "../Sidebar/MenuItem";
import { BsFingerprint } from "react-icons/bs";
import useAuth from "../../../hooks/useAuth";
import { useState } from "react";
import HostModal from "../../Modal/HostRequestModal";
import { updateStatus } from "../../../Api/Auth";
import toast from "react-hot-toast";
const GuestMenu = () => {
  const [role] = useUserRole();
  const { user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const closeModal = () => {
    setIsOpen(false);
  };
  const modalHandler = async () => {
    // request to be a host
    try {
      const { modifiedCount } = await updateStatus(user?.email);
      if (modifiedCount > 0)
        toast.success("Request SuccessFull! Please wait for confirmation");
      else toast.success("Already Requested! Please wait for confirmation");
    } catch (err) {
      console.log(err.message);
    }
  };
  return (
    <>
      <MenuItem
        icon={BsFingerprint}
        label={"My Bookings"}
        address={"my-bookings"}
      />
      {role === "guest" && (
        <div
          onClick={() => setIsOpen(true)}
          className="flex items-center px-4 py-2 mt-5  transition-colors duration-300 transform text-gray-600  hover:bg-gray-300   hover:text-gray-700 cursor-pointer"
        >
          <GrUserAdmin className="w-5 h-5" />

          <span className="mx-4 font-medium">Become A Host</span>
        </div>
      )}
      <HostModal
        modalHandler={modalHandler}
        closeModal={closeModal}
        isOpen={isOpen}
      />
    </>
  );
};

export default GuestMenu;
