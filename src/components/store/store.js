import { configureStore } from "@reduxjs/toolkit";
import placeReducer from "./placeSlice";
import weatherReducer from "./weatherSlice";

export default configureStore({
  reducer: {
    place: placeReducer,
    weather: weatherReducer,
  },
});
