import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { WiHumidity } from "react-icons/wi";
import { SiCodeclimate } from "react-icons/si";
import { MdVisibilityOff } from "react-icons/md";
import { LuThermometerSun } from "react-icons/lu";

const ForecastWeatherHours = () => {
  const selectedPlace = useSelector((state) => state.place.selectedPlace);
  const APIkey = "fc0f79a144e9415ca3f70223241003";
  const [forecastData, setForecastData] = useState(null);

  useEffect(() => {
    const fetchForecastData = async () => {
      try {
        const response = await axios.get(
          `http://api.weatherapi.com/v1/forecast.json?key=${APIkey}&q=${selectedPlace}&days=10&aqi=no&alerts=no`
        );
        setForecastData(response.data);
        console.log(response.data);
      } catch (error) {
        console.log("Failed to fetch forecast weather data:", error);
      }
    };

    if (selectedPlace) {
      fetchForecastData();
    }
  }, [selectedPlace]);

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

  // Function to filter out hours data for the current date
  const filterHoursForToday = () => {
    if (!forecastData) return [];
    const currentDate = new Date().toISOString().slice(0, 10);
    const todayData = forecastData.forecast.forecastday.find(
      (day) => day.date === currentDate
    );
    return todayData ? todayData.hour : [];
  };

  return (
    <div className="w-full md:w-5/12 mx-auto mt-10">
      <Slider {...settings} className="gap-5">
        {filterHoursForToday().map((hourData) => (
          <div
            key={hourData.time_epoch}
            className="bg-customPurpleDark bg-opacity-20 backdrop-filter backdrop-blur-lg rounded-lg p-4 shadow-md flex flex-col justify-center items-center text-center "
          >
            <h3 className="text-xs italic dateTime text-white">{hourData.time}</h3>
            <img
              src={hourData.condition.icon}
              alt=""
              className="w-12 h-12 mx-auto mb-2"
            />
            <div className="space-y-2">
              <div className="flex items-center text-white">
                <SiCodeclimate className="mr-1 text-lg text-blue-500" />
                <p className="text-xs md:text-sm">{hourData.condition.text}</p>
              </div>
              <div className="flex items-center text-white">
                <WiHumidity className="mr-1 text-lg text-green-500" />
                <p className="text-xs md:text-sm">Humidity: {hourData.humidity}</p>
              </div>
              <div className="flex items-center text-white">
                <MdVisibilityOff className="mr-1 text-lg text-red-500" />
                <p className="text-xs md:text-sm">Visibility: {hourData.vis_km} km</p>
              </div>
              <div className="flex items-center text-white">
                <LuThermometerSun className="mr-1 text-lg text-yellow-500" />
                <p className="text-xs md:text-sm">UV: {hourData.uv}</p>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default ForecastWeatherHours;
