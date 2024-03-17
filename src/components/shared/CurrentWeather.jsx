import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";

import api from "../../authorization/api";
import { setSelectedPlace } from "../store/placeSlice";
import { setCurrentConditionText } from "../store/weatherSlice";
import { WiHumidity, WiStrongWind, WiThermometer, WiBarometer, WiCloud, WiTime4 } from "react-icons/wi";

const CurrentWeather = () => {
  const APIkey = "fc0f79a144e9415ca3f70223241003";
  const selectedPlace = useSelector((state) => state.place.selectedPlace);
  console.log("selectedPlace", selectedPlace);
  const [weatherData, setWeatherData] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchCurrentWeather = async () => {
      try {
        const response = await axios.get(
          `https://api.weatherapi.com/v1/current.json?key=${APIkey}&q=${selectedPlace}&aqi=no`
        );
        setWeatherData(response.data);
        dispatch(setCurrentConditionText(response.data.current.condition.text));
      } catch (error) {
        console.log("Failed to fetch current weather data:", error);
      }
    };

    if (selectedPlace) {
      fetchCurrentWeather();
      handleAddCurrentLocation();
    }
  }, [selectedPlace]);

  const handleAddCurrentLocation = async () => {
    try {
      // Add selected place to backend
      await api.post("/weather/weather-condition/add", {
        location: selectedPlace,
      });
    } catch (error) {
      console.log("Failed to add current weather location:", error);
    }
  };

  useEffect(() => {
    const fetchAddedLocations = async () => {
      try {
        // Fetch added locations from backend
        const response = await api.get("/weather/weather-condition/get");
        const location = response.data.location;
        dispatch(setSelectedPlace(location)); // Update Redux store with fetched location
      } catch (error) {
        console.log("Failed to fetch added locations:", error);
      }
    };

    fetchAddedLocations();
  }, [dispatch]);

  return (
    <div className="container sm:w-5/12 md:w-6/12 lg:w-4/12 mx-auto text-gray-800 rounded-lg overflow-hidden shadow-md py-5 px-5 relative bg-customPurple bg-opacity-20 backdrop-filter backdrop-blur-md">
      {weatherData && (
        <div className="flex flex-col items-center justify-center">
          <img
            src={weatherData.current.condition.icon}
            alt={weatherData.current.condition.text}
            className="w-24 h-24 sm:w-32 sm:h-32 mb-4"
          />
          <div className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white">
            {weatherData.current.temp_c}°C
          </div>
          <div className="text-lg sm:text-base lg:text-lg mb-4 text-white">
            {weatherData.current.condition.text}
          </div>
          <div className="mb-4 text-white text-sm sm:text-base lg:text-lg">
            {weatherData.location.name}, {weatherData.location.region},{" "}
            {weatherData.location.country}
          </div>
          <div className="mb-4 text-white font-bold text-xs sm:text-sm lg:text-base">
            {weatherData.current.last_updated}
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="flex items-center bg-gray-600 bg-opacity-50 rounded-lg p-3 shadow-md">
              <WiHumidity className="text-blue-500 mr-2 text-3xl" />
              <p className="text-xs sm:text-sm text-white">
                Humidity: {weatherData.current.humidity}%
              </p>
            </div>
            <div className="flex items-center bg-gray-600 bg-opacity-50 rounded-lg p-3 shadow-md">
              <WiStrongWind className="text-green-500 mr-2 text-3xl" />
              <p className="text-xs sm:text-sm text-white">
                Wind: {weatherData.current.wind_kph} km/h{" "}
                {weatherData.current.wind_dir}
              </p>
            </div>
            <div className="flex items-center bg-gray-600 bg-opacity-50 rounded-lg p-3 shadow-md">
              <WiThermometer className="text-red-500 mr-2 text-3xl" />
              <p className="text-xs sm:text-sm text-white">
                Feels like: {weatherData.current.feelslike_c}°C
              </p>
            </div>
            <div className="flex items-center bg-gray-600 bg-opacity-50 rounded-lg p-3 shadow-md">
              <WiBarometer className="text-yellow-500 mr-2 text-3xl" />
              <p className="text-xs sm:text-sm text-white">
                Pressure: {weatherData.current.pressure_mb} mb
              </p>
            </div>
            <div className="flex items-center bg-gray-600 bg-opacity-50 rounded-lg p-3 shadow-md">
              <WiCloud className="text-purple-500 mr-2 text-3xl" />
              <p className="text-xs sm:text-sm text-white">
                Cloud: {weatherData.current.cloud}%
              </p>
            </div>
            <div className="flex items-center bg-gray-600 bg-opacity-50 rounded-lg p-3 shadow-md">
              <WiTime4 className="text-indigo-500 mr-2 text-3xl" />
              <p className="text-xs sm:text-sm text-white">
                Visibility: {weatherData.current.vis_km} km
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CurrentWeather;
