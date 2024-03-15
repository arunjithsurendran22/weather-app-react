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
import "./style.css"

const ForecastWeatherHours = () => {
  const selectedPlace = useSelector((state) => state.place.selectedPlace);
  const APIkey = "fc0f79a144e9415ca3f70223241003";
  const [forecastData, setForecastData] = useState(null);
  const [slidesToShow, setSlidesToShow] = useState(getSlidesToShow());

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

  // Function to determine the number of slides to show based on screen width
  function getSlidesToShow() {
    const screenWidth = window.innerWidth;
    if (screenWidth >= 1280) {
      return 5;
    } else if (screenWidth >= 1024) {
      return 4;
    } else if (screenWidth >= 768) {
      return 3;
    } else if (screenWidth >= 640) {
      return 3;
    } else {
      return 3;
    }
  }

  useEffect(() => {
    function handleResize() {
      setSlidesToShow(getSlidesToShow());
    }
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

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
    <div className="w-full md:w-2/4 mx-auto mt-10">
      <Slider {...settings} className="gap-2">
        {filterHoursForToday().map((hourData) => (
          <div
            key={hourData.time_epoch}
            className="bg-gray-800 bg-opacity-25 rounded-lg p-4 shadow-lg flex flex-col justify-center items-center"
          >
            <h3 className="text-xs italic dateTime">{hourData.time}</h3>
            <img
              src={hourData.condition.icon}
              alt=""
              className="w-12 h-12 mx-auto mb-2"
            />
            <div className="flex flex-col">
              <div className="flex">
                <SiCodeclimate className="mr-2 text-lg" />
                <p className="text-xs md:text-sm fondSize">
                  {hourData.condition.text}
                </p>
              </div>
              <div className="flex">
                <WiHumidity className="mr-2 text-lg" />
                <p className="text-xs md:text-sm fondSize" >
                  {hourData.humidity}
                </p>
              </div>
              <div className="flex">
                <MdVisibilityOff className="mr-2 text-lg" />
                <p className="text-xs md:text-sm fondSize" >
                  {hourData.vis_km} km
                </p>
              </div>
              <div className="flex">
                <LuThermometerSun className="mr-2 text-lg" />
                <p className="text-xs md:text-sm fondSize">
                  UV: {hourData.uv}
                </p>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default ForecastWeatherHours;
