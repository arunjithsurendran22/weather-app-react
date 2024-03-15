import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import {
  WiHumidity,
  WiStrongWind,
  WiThermometer,
  WiBarometer,
  WiCloud,
  WiTime4,
} from "react-icons/wi";
import api from "../../authorization/api";
import { setSelectedPlace } from "../store/placeSlice";

const CurrentWeather = () => {
  const APIkey = "fc0f79a144e9415ca3f70223241003";
  const selectedPlace = useSelector((state) => state.place.selectedPlace);
  const [weatherData, setWeatherData] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchCurrentWeather = async () => {
      try {
        const response = await axios.get(
          `http://api.weatherapi.com/v1/current.json?key=${APIkey}&q=${selectedPlace}&aqi=no`
        );
        setWeatherData(response.data);
      } catch (error) {
        console.log("Failed to fetch current weather data:", error);
      }
    };

    if (selectedPlace) {
      fetchCurrentWeather();
      handleAddCurrentLocation()
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
    <div className="max-w-md mx-auto bg-gray-800 text-white shadow-lg rounded-lg overflow-hidden border-2 border-gray-700">
      {weatherData && (
        <div className="p-6">
          <div className="flex items-center justify-center">
            <img
              src={weatherData.current.condition.icon}
              alt={weatherData.current.condition.text}
              className="w-24 h-24 mr-4"
            />
            <div>
              <h1 className="text-4xl font-bold">
                {weatherData.current.temp_c}°C
              </h1>
              <p className="text-xl">{weatherData.current.condition.text}</p>
              <p className="text-xl">
                {weatherData.location.name}, {weatherData.location.region},{" "}
                {weatherData.location.country}
              </p>
              <p className="text-xl">{weatherData.current.last_updated}</p>
            </div>
          </div>
          <div className="mt-6 grid grid-cols-2 gap-4">
            <div className="flex items-center bg-blue-600 rounded-lg p-3 shadow-md">
              <WiHumidity className="text-blue-300 mr-2" />
              <p className="text-lg">
                Humidity: {weatherData.current.humidity}%
              </p>
            </div>
            <div className="flex items-center bg-green-600 rounded-lg p-3 shadow-md">
              <WiStrongWind className="text-green-300 mr-2" />
              <p className="text-lg">
                Wind: {weatherData.current.wind_kph} km/h{" "}
                {weatherData.current.wind_dir}
              </p>
            </div>
            <div className="flex items-center bg-red-600 rounded-lg p-3 shadow-md">
              <WiThermometer className="text-red-300 mr-2" />
              <p className="text-lg">
                Feels like: {weatherData.current.feelslike_c}°C
              </p>
            </div>
            <div className="flex items-center bg-purple-600 rounded-lg p-3 shadow-md">
              <WiBarometer className="text-purple-300 mr-2" />
              <p className="text-lg">
                Pressure: {weatherData.current.pressure_mb} mb
              </p>
            </div>
            <div className="flex items-center bg-gray-600 rounded-lg p-3 shadow-md">
              <WiCloud className="text-gray-300 mr-2" />
              <p className="text-lg">Cloud: {weatherData.current.cloud}%</p>
            </div>
            <div className="flex items-center bg-indigo-600 rounded-lg p-3 shadow-md">
              <WiTime4 className="text-indigo-300 mr-2" />
              <p className="text-lg">
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
