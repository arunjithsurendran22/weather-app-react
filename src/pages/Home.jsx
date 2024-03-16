import SearchBox from "../components/shared/SearchBox";
import ShowPlace from "./ShowPlace";
import ForeCastWeather from "../components/shared/ForeCastWeather";
import CurrentWeather from "../components/shared/CurrentWeather";
import ForecastWeatherHours from "../components/shared/ForecastWeatherHours";
import Astro from "../components/shared/Astro";
import SavePlaceButton from "../components/shared/SavePlaceButton";
import SavedLocations from "../components/shared/SavedLocations";
import Navbar from "../components/shared/Navbar";

const Home = () => {
  return (
    <div className="bg-customPurple h-full">
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
