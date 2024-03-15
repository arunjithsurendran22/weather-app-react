import SearchBox from "../components/shared/SearchBox";
import ShowPlace from "./ShowPlace";
import CurrentLocation from "../components/shared/CurrentLocation";
import ForeCastWeather from "../components/shared/ForeCastWeather";
import CurrentWeather from "../components/shared/CurrentWeather";
import ForecastWeatherHours from "../components/shared/ForecastWeatherHours";
import Astro from "../components/shared/Astro";

const Home = () => {
  return (
    <div className="bg-customPurple h-full">
      <SearchBox />
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
