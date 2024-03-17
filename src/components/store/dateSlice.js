// dateSlice.js
import { createSlice } from '@reduxjs/toolkit';

const dateSlice = createSlice({
  name: 'date',
  initialState: {
    selectedDate: null,
  },
  reducers: {
    setDate: (state, action) => {
      state.selectedDate = action.payload;
    },
  },
});

export const { setDate } = dateSlice.actions;

export default dateSlice.reducer;
