import { useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaSave, FaCheck } from "react-icons/fa"; // Import icons
import api from "../../authorization/api";
import { IoIosAdd } from "react-icons/io";

const SavePlaceButton = () => {
  const selectedPlace = useSelector((state) => state.place.selectedPlace);
  const [saved, setSaved] = useState(false); // State to track whether place is saved

  const handleSaveLocation = async () => {
    try {
      const response = await api.post(
        "/weather/weather-condition/save-locations/add",
        {
          title: selectedPlace,
        }
      );
      toast.success(response.data.message);
      setSaved(true); // Change button icon to saved
      console.log(response.data);
    } catch (error) {
      console.error("Error saving selected place:", error);
      toast.error("Place already exists");
    }
  };

  return (
    <div>
      <button onClick={handleSaveLocation}>
        {saved ? <FaCheck /> : <IoIosAdd />} 
      </button>
    </div>
  );
};

export default SavePlaceButton;
