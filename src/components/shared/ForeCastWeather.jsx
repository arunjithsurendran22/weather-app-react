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
import DateSelector from "./DateSelector";

const ForeCastWeather = () => {
  const selectedPlace = useSelector((state) => state.place.selectedPlace);
  const selectDate = useSelector((state) => state.date.selectedDate);
  console.log("selectDate", selectDate);
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

  // Filter forecast data based on the selected date, or display all data if no date selected
  const filteredForecast = selectDate
    ? forecastData &&
      forecastData.forecast.forecastday.filter(
        (day) => day.date === selectDate?.toISOString().split("T")[0]
      )
    : forecastData && forecastData.forecast.forecastday;

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

  // Render forecast data either as a slider or a table based on whether a date is selected
  return (
    <div className="container w-full md:w-full lg:w-8/12 xl:w-6/12 mx-auto mt-10">
      <DateSelector/>
      <h1 className="font-bold italic text-sm text-white">DAY</h1>
      {forecastData &&
        (selectDate ? (
          <div className="overflow-x-auto">
            <h1 className="font-bold italic text-sm text-white">DAY</h1>
            <table className="min-w-full bg-customPurpleDark bg-opacity-20 backdrop-filter backdrop-blur-lg rounded-lg shadow-md">
              <thead>
                <tr className="bg-customPurple bg-opacity-70 text-white">
                  <th className="px-6 py-3 text-left text-xs md:text-sm">Date</th>
                  <th className="px-6 py-3 text-left text-xs md:text-sm">Condition</th>
                  <th className="px-6 py-3 text-left text-xs md:text-sm">Humidity</th>
                  <th className="px-6 py-3 text-left text-xs md:text-sm">Visibility</th>
                  <th className="px-6 py-3 text-left text-xs md:text-sm">UV</th>
                </tr>
              </thead>
              <tbody className="text-white ">
                {filteredForecast.map((day) => (
                  <tr key={day.date_epoch} className="border-b border-gray-400">
                    <td className="px-6 py-4 text-xs md:text-sm">{day.date}</td>
                    <td className="px-6 py-4 text-xs md:text-sm">{day.day.condition.text}</td>
                    <td className="px-6 py-4 text-xs md:text-sm">{day.day.avghumidity}</td>
                    <td className="px-6 py-4 text-xs md:text-sm">{day.day.avgvis_km} km</td>
                    <td className="px-6 py-4 text-xs md:text-sm">{day.day.uv}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <Slider {...settings} className="gap-5">
            {filteredForecast.map((day) => (
              <div
                key={day.date_epoch}
                className="bg-customPurpleDark bg-opacity-20 backdrop-filter backdrop-blur-lg rounded-lg p-4 text-xs md:text-sm shadow-md flex flex-col justify-center items-center text-center"
              >
                <h3 className="text-sm italic mb-2 text-gray-100">
                  {day.date}
                </h3>
                <img
                  src={day.day.condition.icon}
                  alt=""
                  className="w-12 h-12 mx-auto mb-3"
                />
                <div className="space-y-2">
                  <div className="flex items-center text-white">
                    <SiCodeclimate className="mr-1 text-lg text-blue-500" />
                    <p className="text-xs md:text-sm">
                      {day.day.condition.text.length > 10
                        ? `${day.day.condition.text.substring(0, 12)}...`
                        : day.day.condition.text}
                    </p>
                  </div>

                  <div className="flex items-center text-white">
                    <WiHumidity className="mr-1 text-lg text-green-500" />
                    <p className="text-xs md:text-sm">
                      Humidity: {day.day.avghumidity}
                    </p>
                  </div>
                  <div className="flex items-center text-white">
                    <MdVisibilityOff className="mr-1 text-lg text-red-500" />
                    <p className="text-xs md:text-sm">
                      Visibility: {day.day.avgvis_km} km
                    </p>
                  </div>
                  <div className="flex items-center text-white">
                    <LuThermometerSun className="mr-1 text-lg text-yellow-500" />
                    <p className="text-xs md:text-sm">UV: {day.day.uv}</p>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        ))}
    </div>
  );
};
export default ForeCastWeather;
