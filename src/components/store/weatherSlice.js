import { createSlice } from "@reduxjs/toolkit";

const weatherSlice = createSlice({
  name: "weather",
  initialState: {
    currentConditionText: "",
  },
  reducers: {
    setCurrentConditionText: (state, action) => {
      state.currentConditionText = action.payload;
    },
  },
});

export const { setCurrentConditionText } = weatherSlice.actions;
export default weatherSlice.reducer;
