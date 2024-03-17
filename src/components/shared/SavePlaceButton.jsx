import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaSave, FaCheck } from "react-icons/fa"; // Import icons
import api from "../../authorization/api";
import { IoIosAdd } from "react-icons/io";
import { setPlaceSaved } from "../store/placeSlice";

const SavePlaceButton = () => {
  const [saved, setSaved] = useState(false); 
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
    <div className="flex justify-end container mx-auto mt-5 px-3 md:px-10">
      <button
        onClick={handleSaveLocation}
        className={`flex items-center justify-center w-10  h-10 rounded-full bg-gray-500 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 ${
          saved ? "bg-green-500" : ""
        }`}
      >
        {saved ? (
          <FaCheck className="text-2xl" />
        ) : (
          <IoIosAdd className="text-2xl" />
        )}
      </button>
    </div>
  );
};

export default SavePlaceButton;
