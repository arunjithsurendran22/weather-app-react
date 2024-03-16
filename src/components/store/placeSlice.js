import { createSlice } from "@reduxjs/toolkit";

const placeSlice = createSlice({
  name: "place",
  initialState: {
    selectedPlace: "",
    placeSaved: false, // Add a flag to indicate if place is saved
  },
  reducers: {
    setSelectedPlace: (state, action) => {
      state.selectedPlace = action.payload;
    },
    setPlaceSaved: (state, action) => {
      state.placeSaved = action.payload;
    },
  },
});

export const { setSelectedPlace, setPlaceSaved } = placeSlice.actions;
export default placeSlice.reducer;
