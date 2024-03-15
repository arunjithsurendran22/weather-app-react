import { useState } from "react";
import { BiCurrentLocation } from "react-icons/bi";
import { useDispatch } from "react-redux";
import { setSelectedPlace } from "../store/placeSlice";
import api from "../../authorization/api";

const CurrentLocation = () => {
  const dispatch = useDispatch();
  const [currentPlace, setCurrentPlace] = useState("");
  const accessToken =
    "pk.eyJ1IjoiYXJ1bmppdGhzdXJlbmRyYW4iLCJhIjoiY2x0bndtODQ2MGFtYTJpcXBmcmdic3B3NSJ9.9nqnmlBgy-DAxDPWu4l3Gw";

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
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${longitude},${latitude}.json?access_token=${accessToken}`
      );
      const data = await response.json();
      if (data.features && data.features.length > 0) {
        const placeName = data.features[0].place_name;
        setCurrentPlace(placeName);
        addPlaceName(placeName); // Add place name to backend
      } else {
        console.error("No place name found.");
      }
    } catch (error) {
      console.error("Error occurred while fetching place name:", error);
    }
  };

  const addPlaceName = async (placeName) => {
    try {
      // Store place name to backend
      await api.post("/weather/weather-condition/add", { location: placeName });
      // Fetch data from backend to update Redux store
      const response = await api.get("/weather/weather-condition/get");
      console.log(response.data);
      dispatch(setSelectedPlace(response.data.location));
    } catch (error) {
      console.error("Error storing or fetching data:", error);
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
