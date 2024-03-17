import axios from "axios";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { setSelectedPlace } from "../store/placeSlice";


const SearchBox = () => {
  const nominatimBaseUrl = "https://nominatim.openstreetmap.org/search";
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const dispatch = useDispatch();

  console.log(searchQuery);
  useEffect(() => {
    const handleSearch = async () => {
      try {
        const response = await axios.get(
          `${nominatimBaseUrl}?q=${searchQuery}&format=json`
        );
        console.log(response.data);
        setSearchResults(response.data);
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

  const handleSelectResult = async (result) => {
    try {
      setSearchQuery("");
      setSearchResults([]);
      dispatch(setSelectedPlace(result.display_name));
    } catch (error) {
      console.error("Error posting selected place:", error);
    }
  };

  return (
    <div className="relative flex flex-col items-center space-y-4 mt-10 mb-10 w-full max-w-md mx-auto">
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Enter a location"
        className="px-3 py-2 border-0 rounded-md shadow-sm focus:outline-none focus:border-blue-400 w-full bg-gray-600 container"
      />
      {searchResults.length > 0 && (
        <ul className="absolute top-full left-1/2 transform -translate-x-1/2 w-full max-w-md max-h-40 overflow-y-auto border border-gray-300 rounded-md shadow-sm bg-white backdrop-blur-lg backdrop-filter bg-opacity-50 z-50">
          {searchResults.map((result, index) => (
            <li
              key={index}
              onClick={() => handleSelectResult(result)}
              className="px-3 py-2 cursor-pointer hover:bg-gray-100"
            >
              {result.display_name}
            </li>
          ))}
        </ul>
      )}
      
    </div>
  );
};

export default SearchBox;
