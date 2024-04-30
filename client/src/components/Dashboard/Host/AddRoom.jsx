import { Helmet } from "react-helmet-async";
import AddRoomForm from "../../Form/AddRoomForm";
import { useState } from "react";

const AddRoom = () => {
  const [dates, setDates] = useState({
    startDate: new Date(),
    endDate: new Date(),
    key: "selection",
  });
  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const location = form.location.value;
    const title = form.title.value;
    const category = form.category.value;
    const from = dates.startDate;
    const to = dates.endDate;
    const price = form.price.value;
    const bedrooms = form.bedrooms.value;
    const bathrooms = form.bathrooms.value;
    const description = form.description.value;
    const image = form.image.files[0];
  };

  //   handle date change with react-date-change calender
  const handleDates = (ranges) => {
    setDates(ranges.selection);
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
      />
    </div>
  );
};
export default AddRoom;
