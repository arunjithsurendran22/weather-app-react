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
    };

    return (
        <div className="w-2/4 mx-auto mt-10">
        {forecastData && (
            <Slider {...settings} className="gap-2">
            {forecastData.forecast.forecastday.map((day) => (
                <div
                key={day.date_epoch}
                className="bg-gray-800 bg-opacity-25 rounded-lg p-4 shadow-lg flex flex-col justify-center items-center"
                >
                <h3 className="text-xs italic">{day.date}</h3>
                <img
                    src={day.day.condition.icon}
                    alt=""
                    className="w-12 h-12 mx-auto mb-2"
                />
                {day.hour.map((hourData) => (
                    <div key={hourData.time_epoch} className="flex items-center">
                    <p className="text-sm">{hourData.time}</p>
                    <SiCodeclimate className="mr-2 text-xl" />
                    <p className="text-xs">{hourData.condition.text}</p>
                    <WiHumidity className="mr-2 text-xl" />
                    <p className="text-sm">{hourData.humidity}</p>
                    <MdVisibilityOff className="mr-2 text-xl" />
                    <p className="text-sm">{hourData.vis_km} km</p>
                    <LuThermometerSun className="mr-2 text-xl" />
                    <p className="text-sm">UV: {hourData.uv}</p>
                    </div>
                ))}
                </div>
            ))}
            </Slider>
        )}
        </div>
    );
    };

    export default ForecastWeatherHours;
