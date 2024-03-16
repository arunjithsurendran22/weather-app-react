import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaSave, FaCheck } from "react-icons/fa"; // Import icons
import api from "../../authorization/api";
import { IoIosAdd } from "react-icons/io";
import { setPlaceSaved } from "../store/placeSlice";

const SavePlaceButton = () => {
  const [saved, setSaved] = useState(false); // State to track whether place is saved
  const selectedPlace = useSelector((state) => state.place.selectedPlace);
  const placeSaved = useSelector((state) => state.place.placeSaved);
  const dispatch = useDispatch();

  const handleSaveLocation = async () => {
    try {
      const response = await api.post(
        "/weather/weather-condition/save-locations/add",
        {
          title: selectedPlace,
        }
      );
      dispatch(setPlaceSaved(true)); 
      setSaved(true);
      toast.success(response.data.message);
      setSaved(true); 
      console.log(response.data);
    } catch (error) {
      console.error("Error saving selected place:", error);
      toast.error("Place already exists");
    }
  };

  useEffect(() => {
    setSaved(placeSaved); 
  }, [placeSaved]);

  useEffect(() => {
    setSaved(false); // Reset saved state when selectedPlace changes
  }, [selectedPlace]);

  return (
    <div>
      <button onClick={handleSaveLocation} className="text-white text-2xl">
        {saved ? <FaCheck /> : <IoIosAdd />} 
      </button>
    </div>
  );
};

export default SavePlaceButton;
