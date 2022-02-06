import { configureStore } from '@reduxjs/toolkit';
import { weatherAPI } from '../services/WeatherServices';
import { weatherReducer } from './weather/WeatherSlice';

export const store = configureStore({
  reducer: {
    weatherReducer,
    [weatherAPI.reducerPath]: weatherAPI.reducer,
  },
  middleware: getDefaultMiddleware => [
    ...getDefaultMiddleware(),
    weatherAPI.middleware,
  ],
});
