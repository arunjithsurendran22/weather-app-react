import { createSlice } from "@reduxjs/toolkit";


const placeSlice = createSlice({
  name: "place",
  initialState: {
    selectedPlace: "",
  },
  reducers: {
    setSelectedPlace: (state, action) => {
      console.log("Payload:", action.payload);
      state.selectedPlace = action.payload;
    },
  },
  
});

// Extract action creators and reducer from the slice
export const { setSelectedPlace } = placeSlice.actions;
export default placeSlice.reducer;
