//* Libs
import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';

//* Servises
import { weatherAPI } from 'services/WeatherServices';

//* WeatherReducer
import { weatherReducer } from './weather/WeatherSlice';

export const store = configureStore({
  reducer: {
    weatherReducer,
    [weatherAPI.reducerPath]: weatherAPI.reducer,
  },
  middleware: getDefaultMiddleware => [...getDefaultMiddleware(), weatherAPI.middleware],
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
