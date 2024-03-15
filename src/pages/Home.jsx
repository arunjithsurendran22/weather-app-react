import SearchBox from "../components/shared/SearchBox";
import ShowPlace from "./ShowPlace";
import CurrentLocation from "../components/shared/CurrentLocation";
import ForeCastWeather from "../components/shared/ForeCastWeather";
import CurrentWeather from "../components/shared/CurrentWeather";
import ForecastWeatherHours from "../components/shared/ForecastWeatherHours";
import Astro from "../components/shared/Astro";
import SavePlaceButton from "../components/shared/SavePlaceButton";
import SavedLocations from "../components/shared/SavedLocations";


const Home = () => {
  return (
    <div className="bg-customPurple h-full">
      <SavedLocations/>
      <SearchBox />
      <SavePlaceButton/>
      <ShowPlace />
      <CurrentLocation />
      <CurrentWeather />
      <ForeCastWeather />
      <ForecastWeatherHours />
      <Astro />
    </div>
  );
};

export default Home;
