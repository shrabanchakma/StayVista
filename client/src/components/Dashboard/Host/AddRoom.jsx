import { Helmet } from "react-helmet-async";
import AddRoomForm from "../../Form/AddRoomForm";
import { useState } from "react";

const AddRoom = () => {
  const [dates, setDates] = useState({
    startDate: new Date(),
    endDate: new Date(),
    key: "selection",
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const location = form.location.value;
    const title = form.title.value;
    const category = form.category.value;
    const from = "";
    const to = "";
    const price = form.price.value;
    const bedrooms = form.bedrooms.value;
    const bathrooms = form.bathrooms.value;
    const description = form.description.value;
    const image = form.image.files[0];
  };
  return (
    <div>
      <Helmet>
        <title>Add Room | Dashboard</title>
      </Helmet>
      {/* Form */}
      <AddRoomForm handleSubmit={handleSubmit} />
    </div>
  );
};
export default AddRoom;
