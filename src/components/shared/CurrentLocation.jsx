import { useState } from "react";
import { BiCurrentLocation } from "react-icons/bi";
import { useDispatch } from "react-redux";
import { setSelectedPlace } from "../store/placeSlice";

const CurrentLocation = () => {
  const dispatch = useDispatch();
  const [currentPlace, setCurrentPlace] = useState("");

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          getPlaceName(latitude, longitude);
        },
        (error) => {
          console.error("Error getting location:", error);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  };

  const getPlaceName = async (latitude, longitude) => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`
      );
      const data = await response.json();
      if (data.display_name) {
        const placeName = data.display_name;
        setCurrentPlace(placeName);
        dispatch(setSelectedPlace(placeName)); // Dispatch the place name to Redux
      } else {
        console.error("No place name found.");
      }
    } catch (error) {
      console.error("Error occurred while fetching place name:", error);
    }
  };

  return (
    <div>
      <button onClick={getCurrentLocation}>
        <BiCurrentLocation />
      </button>
    </div>
  );
};

export default CurrentLocation;
