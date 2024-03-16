import React from "react";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import api from "../../authorization/api";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { IoMdClose } from "react-icons/io";
import { setSelectedPlace } from "../store/placeSlice"; // Import the action creator

const SavedLocations = () => {
  const [places, setPlaces] = useState([]);
  const placeSaved = useSelector((state) => state.place.placeSaved);
  const dispatch = useDispatch(); // Dispatch function to update Redux state

  useEffect(() => {
    const fetchSavedLocations = async () => {
      try {
        const response = await api.get(
          "/weather/weather-condition/save-locations/get"
        );
        const placeDetails = response.data.savedLocations.map((item) => ({
          title: item.title.split(",")[0].substring(0, 26),
          _id: item._id,
        }));
        setPlaces(placeDetails);
      } catch (error) {
        console.log("Failed to get data");
      }
    };
    fetchSavedLocations();
  }, [placeSaved]);

  const handleDelete = async (locationId) => {
    try {
      const response = await api.delete(
        `/weather/weather-condition/save-locations/delete/${locationId}`
      );
      console.log(response.data.message);
      setPlaces(places.filter((place) => place._id !== locationId));
    } catch (error) {
      console.log("Failed to delete location:", error);
    }
  };

  const handleLocationClick = (place) => {
    dispatch(setSelectedPlace(place.title));
  };

  return (
    <>
      {places.length > 0 && (
        <div className="flex items-center justify-center h-full overflow-hidden">
          <Slider
            dots={false}
            infinite={places.length > 1}
            speed={500}
            slidesToShow={Math.min(places.length, 5)}
            slidesToScroll={Math.min(places.length, 3)}
            responsive={[
              {
                breakpoint: 1024,
                settings: {
                  slidesToShow: 3,
                  slidesToScroll: 3,
                  infinite: true,
                  dots: true,
                },
              },
              {
                breakpoint: 600,
                settings: {
                  slidesToShow: 3,
                  slidesToScroll: 2,
                  arrows: false,
                },
              },
              {
                breakpoint: 480,
                settings: {
                  slidesToShow: 1,
                  slidesToScroll: 1,
                  arrows: false,
                },
              },
            ]}
            className="w-full md:w-5/12"
          >
            {places.map((place) => (
              <div key={place._id} className="px-1.5 mt-10">
                <div
                  className="bg-white bg-opacity-20 backdrop-filter backdrop-blur-md p-4 rounded-md shadow-md relative h-14 w-full flex items-center justify-center cursor-pointer transition duration-300 hover:bg-white hover:bg-opacity-30 hover:backdrop-blur-lg transform hover:scale-105"
                  onClick={() => handleLocationClick(place)}
                >
                  <h3 className="text-sm font-semibold mb-0 truncate text-white">
                    {place.title}
                  </h3>
                  <button
                    onClick={() => handleDelete(place._id)}
                    className="absolute top-2 right-2 w-6 h-6 opacity-0 hover:opacity-100 transition duration-300 flex items-center justify-center text-red-500" // Changed text color to red
                  >
                    <IoMdClose />
                  </button>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      )}
    </>
  );
};

export default SavedLocations;
