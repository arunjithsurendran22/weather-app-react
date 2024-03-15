import { useEffect, useState } from "react";
import api from "../../authorization/api";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./style.css";
import { IoMdClose } from "react-icons/io";

const SavedLocations = () => {
  const [places, setPlaces] = useState([]);

  useEffect(() => {
    const fetchSavedLocations = async () => {
      try {
        const response = await api.get(
          "/weather/weather-condition/save-locations/get"
        );
        const placeNames = response.data.savedLocations.map(
          (item) => item.title.split(",")[0].substring(0, 26) // Limit to 25 characters
        );
        console.log(placeNames);
        setPlaces(placeNames);
      } catch (error) {
        console.log("Failed to get data");
      }
    };
    fetchSavedLocations();
  }, []);

  const settings = {
    dots: false,
    infinite: true,
    speed: 1000,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: false,
    autoplaySpeed: 2000,
    centerMode: true,
    centerPadding: "20px",
    variableWidth: true, 
    responsive: [
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 1,
          infinite: true,
          dots: false,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 1,
          infinite: true,
          dots: false,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 320,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="md:w-2/4 mx-auto ">
      <Slider {...settings}>
        {places.map((place, index) => (
          <div key={index} className="mt-10">
            <div className="bg-gray-800 bg-opacity-25 rounded-lg p-4 shadow-lg flex justify-between items-center  saved-location ">
              <h3 className="md:text-xs font-semibold italic">{place}</h3>
              <button>
                <IoMdClose />
              </button>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default SavedLocations;
