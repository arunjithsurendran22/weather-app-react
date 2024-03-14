import SearchBox from "../components/shared/SearchBox";
import ShowPlace from "./ShowPlace";
import CurrentLocation from "../components/shared/CurrentLocation";

const Home = () => {
  return (
    <div className="bg-customPurple h-screen">
      <SearchBox />
      <h1>hello</h1>
      <ShowPlace />
      <CurrentLocation />
    </div>
  );
};

export default Home;
