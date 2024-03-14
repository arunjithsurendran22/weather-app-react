import axios from "axios";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { setSelectedPlace } from "../store/placeSlice";

const SearchBox = () => {
  const mapBoxAPIKey =
    "pk.eyJ1IjoiYXJ1bmppdGhzdXJlbmRyYW4iLCJhIjoiY2x0a2J2OXQ3MHVrbzJqbzE0MW1semZmNCJ9.HvCIQ_P6rIKrSmqe5b3b9A";

  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [selectedName, setSelectedName] = useState("");

  const dispatch = useDispatch();

  useEffect(() => {
    const handleSearch = async () => {
      try {
        const response = await axios.get(
          `https://api.mapbox.com/geocoding/v5/mapbox.places/${searchQuery}.json?access_token=${mapBoxAPIKey}`
        );
        setSearchResults(response.data.features);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    if (searchQuery.trim() !== "") {
      handleSearch();
    } else {
      setSearchResults([]);
    }
  }, [searchQuery]);

  const handleSelectResult = (result) => {
    setSearchQuery("");
    setSearchResults([]);
    setSelectedName(result.place_name);
    dispatch(setSelectedPlace(result.place_name));
  };

  return (
    <div className="relative flex flex-col items-center space-y-4 ">
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Enter a location"
        className="px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-400  w-96  md:w-6/12 mt-10 bg-gray-300"
      />
      {searchResults.length > 0 && (
        <ul className="absolute top-full left-1/2 transform -translate-x-1/2 w-96 md:w-6/12 max-h-40 overflow-y-auto border border-gray-300 rounded-md shadow-sm bg-white  backdrop-blur-lg backdrop-filter bg-opacity-50">
          {searchResults.map((result) => (
            <li
              key={result.id}
              onClick={() => handleSelectResult(result)}
              className="px-4 py-2 cursor-pointer hover:bg-gray-100"
            >
              {result.place_name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBox;
