import { createSlice } from "@reduxjs/toolkit";

const placeSlice = createSlice({
  name: "place",
  initialState: {
    selectedPlace: "",
  },
  reducers: {
    setSelectedPlace: (state, action) => {
      state.selectedPlace = action.payload;
    },
  },
});

export const { setSelectedPlace } = placeSlice.actions;
export default placeSlice.reducer;
