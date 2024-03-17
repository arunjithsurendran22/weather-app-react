import { configureStore } from "@reduxjs/toolkit";
import placeReducer from "./placeSlice";
import weatherReducer from "./weatherSlice";
import dateReducer from "./dateSlice";

export default configureStore({
  reducer: {
    place: placeReducer,
    weather: weatherReducer,
    date: dateReducer,
  },
});
