import { configureStore } from '@reduxjs/toolkit';
import placeReducer from './placeSlice';

export default configureStore({
  reducer: {
    place: placeReducer,
  },
});
