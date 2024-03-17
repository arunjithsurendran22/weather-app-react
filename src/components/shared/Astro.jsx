import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { WiSunrise, WiSunset } from "react-icons/wi";
import { FaMoon } from "react-icons/fa";
import { IoMoon } from "react-icons/io5";
import "./style.css";

const Astro = () => {
  const selectedPlace = useSelector((state) => state.place.selectedPlace);
  const selectDate = useSelector((state) => state.date.selectedDate);
  const APIkey = "fc0f79a144e9415ca3f70223241003";
  const [forecastData, setForecastData] = useState(null);

  useEffect(() => {
    const fetchForecastData = async () => {
      try {
        const response = await axios.get(
          `https://api.weatherapi.com/v1/forecast.json?key=${APIkey}&q=${selectedPlace}&days=10&aqi=no&alerts=no`
        );
        setForecastData(response.data);
      } catch (error) {
        console.log("Failed to fetch forecast weather data:", error);
      }
    };

    if (selectedPlace) {
      fetchForecastData();
    }
  }, [selectedPlace]);

  // Function to filter astrological data for the selected date or current date if no date selected
  const filterAstroDataForSelectedDate = () => {
    if (!forecastData) return {};
    const currentDate = new Date().toISOString().split("T")[0]; // Current date in UTC format
    const selectedDate = selectDate
      ? selectDate.toISOString().split("T")[0]
      : currentDate; // Selected date or current date if none selected
    const selectedDayData = forecastData.forecast.forecastday.find(
      (day) => day.date === selectedDate
    );
    return selectedDayData ? selectedDayData.astro : {};
  };

  // Configuration for the slider
  const settings = {
    dots: false,
    infinite: true,
    speed: 1000,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    centerMode: true,
    centerPadding: "20px",
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
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 320,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="container w-full md:w-full lg:w-8/12 xl:w-6/12 mx-auto mt-10">
      <h1 className="font-bold italic text-sm text-white">ASTRO</h1>
      {selectDate ? (
        <div className="overflow-x-auto mb-10 items-center">
        <table className="min-w-full bg-customPurpleDark bg-opacity-20 backdrop-filter backdrop-blur-lg rounded-lg shadow-md">
          <thead>
            <tr className="bg-customPurple bg-opacity-70 text-white">
              <th className="px-6 py-3 text-center text-xs md:text-sm">Sun</th>
              <th className="px-6 py-3 text-center text-xs md:text-sm">Moon</th>
            </tr>
          </thead>
          <tbody className="text-gray-700">
            <tr className="border-b border-gray-400">
              <td className="px-6 py-4">
                <div className="flex justify-between">
                  <div className="flex items-center text-white">
                    <WiSunrise className="mr-2 text-lg text-yellow-400" />
                    <p className="text-xs md:text-sm fondSize">
                      {filterAstroDataForSelectedDate().sunrise}
                    </p>
                  </div>
                  <div className="flex items-center text-white">
                    <WiSunset className="mr-2 text-lg text-orange-400" />
                    <p className="text-xs md:text-sm fondSize">
                      {filterAstroDataForSelectedDate().sunset}
                    </p>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 ">
                <div className="flex justify-between">
                  <div className="flex items-center text-white">
                    <FaMoon className="mr-2 text-lg text-gray-400" />
                    <p className="text-xs md:text-sm fondSize">
                      {filterAstroDataForSelectedDate().moonrise}
                    </p>
                  </div>
                  <div className="flex items-center text-white">
                    <IoMoon className="mr-2 text-lg text-black " />
                    <p className="text-xs md:text-sm fondSize ">
                      {filterAstroDataForSelectedDate().moonset}
                    </p>
                  </div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      
      ) : (
        forecastData && (
          <Slider {...settings} className="gap-2">
            {forecastData.forecast.forecastday.map((dayData) => (
              <div
                key={dayData.date_epoch}
                className="bg-customPurpleDark bg-opacity-20 backdrop-filter backdrop-blur-lg rounded-lg p-4 shadow-md flex flex-col justify-center items-center text-center mb-10"
              >
                <h3 className="text-xs italic dateTime text-white">
                  {dayData.date}
                </h3>
                <div className="flex flex-col">
                  <div className="flex items-center text-white">
                    <WiSunrise className="mr-2 text-lg text-yellow-400" />
                    <p className="text-xs md:text-sm fondSize">
                      {dayData.astro.sunrise}
                    </p>
                  </div>
                  <div className="flex items-center text-white">
                    <WiSunset className="mr-2 text-lg text-orange-400" />
                    <p className="text-xs md:text-sm fondSize">
                      {dayData.astro.sunset}
                    </p>
                  </div>
                  <div className="flex items-center text-white">
                    <FaMoon className="mr-2 text-lg text-gray-400" />
                    <p className="text-xs md:text-sm fondSize">
                      {dayData.astro.moonrise}
                    </p>
                  </div>
                  <div className="flex items-center text-white">
                    <IoMoon className="mr-2 text-lg text-black " />
                    <p className="text-xs md:text-sm fondSize ">
                      {dayData.astro.moonset}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        )
      )}
    </div>
  );
};

export default Astro;
