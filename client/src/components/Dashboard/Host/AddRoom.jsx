import { Helmet } from "react-helmet-async";
import AddRoomForm from "../../Form/AddRoomForm";
import { useState } from "react";
import useAuth from "../../../hooks/useAuth";
import { imageUpload } from "../../../Api/utils";
import { addRoom } from "../../../Api/rooms";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const AddRoom = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [uploadButtonText, setUploadButtonText] = useState("Upload Image");
  const [dates, setDates] = useState({
    startDate: new Date(),
    endDate: new Date(),
    key: "selection",
  });
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const form = e.target;
    const location = form.location.value;
    const title = form.title.value;
    const category = form.category.value;
    const from = dates.startDate;
    const to = dates.endDate;
    const price = form.price.value;
    const bedrooms = form.bedrooms.value;
    const guests = form.total_guest.value;
    const bathrooms = form.bathrooms.value;
    const description = form.description.value;
    const image = form.image.files[0];

    const image_url = await imageUpload(image);
    const host = {
      name: user?.displayName,
      image: user?.photoURL,
      email: user?.email,
    };
    const roomData = {
      location,
      title,
      category,
      from,
      to,
      price,
      bedrooms,
      guests,
      bathrooms,
      host,
      description,
      image: image_url?.data?.display_url,
    };
    // console.table(roomData);
    try {
      const data = await addRoom(roomData);
      console.log(data);
      toast.success("Room Added Successfully");
      navigate("/dashboard/my-listings");
    } catch (err) {
      toast.error(err);
    } finally {
      setLoading(false);
    }
  };

  //   handle date change with react-date-change calender
  const handleDates = (ranges) => {
    setDates(ranges.selection);
  };

  const handleImageChange = (image) => {
    setUploadButtonText(image.name);
  };
  return (
    <div>
      <Helmet>
        <title>Add Room | Dashboard</title>
      </Helmet>
      {/* Form */}
      <AddRoomForm
        handleSubmit={handleSubmit}
        handleDates={handleDates}
        dates={dates}
        handleImageChange={handleImageChange}
        uploadButtonText={uploadButtonText}
        loading={loading}
      />
    </div>
  );
};
export default AddRoom;
