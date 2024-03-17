import { useState } from "react";
import { BiCurrentLocation } from "react-icons/bi";
import { useDispatch } from "react-redux";
import { setSelectedPlace } from "../store/placeSlice";

const CurrentLocation = () => {
  const dispatch = useDispatch();
  const [currentPlace, setCurrentPlace] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const getCurrentLocation = () => {
    setLoading(true);
    setError(null);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          getPlaceName(latitude, longitude);
        },
        (error) => {
          console.error("Error getting location:", error);
          setError("Error getting location. Please try again.");
          setLoading(false);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
      setError("Geolocation is not supported by this browser.");
      setLoading(false);
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
        setError("No place name found.");
      }
      setLoading(false);
    } catch (error) {
      console.error("Error occurred while fetching place name:", error);
      setError("Error occurred while fetching place name. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center">
      <button
        onClick={getCurrentLocation}
        className="bg-gray-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        {loading ? (
          <svg
            className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.373A8.004 8.004 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.565zM20 12c0-3.042-1.135-5.824-3-7.938l-3 2.565A7.96 7.96 0 0116 12h4zm-2 5.373c1.865-2.114 3-4.896 3-7.938h-4c0 1.381-.346 2.675-.952 3.82l1.952 1.952zM12 20a8 8 0 01-8-8h-4c0 6.627 5.373 12 12 12v-4zm0-16a8 8 0 018 8h4c0-6.627-5.373-12-12-12v4z"
            ></path>
          </svg>
        ) : (
          <BiCurrentLocation />
        )}
      </button>
      {error && <p className="text-red-500 ml-2">{error}</p>}
    </div>
  );
};

export default CurrentLocation;
