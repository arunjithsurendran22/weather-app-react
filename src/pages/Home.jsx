import SearchBox from "../components/shared/SearchBox";
import ShowPlace from "./ShowPlace";
import ForeCastWeather from "../components/shared/ForeCastWeather";
import CurrentWeather from "../components/shared/CurrentWeather";
import ForecastWeatherHours from "../components/shared/ForecastWeatherHours";
import Astro from "../components/shared/Astro";
import SavePlaceButton from "../components/shared/SavePlaceButton";
import SavedLocations from "../components/shared/SavedLocations";
import Navbar from "../components/shared/Navbar";
import { useSelector } from "react-redux";
import { weatherImages } from "./weatherCondtions";

const Home = () => {
  const conditionText = useSelector(
    (state) => state.weather.currentConditionText
  );
  console.log(weatherImages);

  const backgroundImage = weatherImages[conditionText] || "";
  console.log("backgroundImage",backgroundImage);
  console.log("conditionText", conditionText);
  return (
    <div
      className="bg-customPurple h-full"
      style={{
        backgroundImage: `url("${backgroundImage}")`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <Navbar />
      <SavePlaceButton />
      <SavedLocations />
      <SearchBox />
      <ShowPlace />
      <CurrentWeather />
      <ForeCastWeather />
      <ForecastWeatherHours />
      <Astro />
    </div>
  );
};

export default Home;
