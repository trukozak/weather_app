//* Libs
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

//* Types
import { ICoord, IWeatherAll } from '../type/weatherTypes';

interface WeatherState {
  weather: IWeatherAll | null;
  isLoading: boolean;
  placeRequest: ICoord;
  currentName: string;
}

const initialState: WeatherState = {
  weather: null,
  currentName: 'Kiev, UA',
  placeRequest: {
    lat: 50.4333,
    lng: 30.5167,
  },
  isLoading: true,
};

export const weatherSlice = createSlice({
  name: 'weather',
  initialState,
  reducers: {
    setPlaceRequest(state, action: PayloadAction<ICoord>) {
      state.placeRequest = action.payload;
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload;
    },
    setWeather(state, action: PayloadAction<IWeatherAll>) {
      state.weather = action.payload;
    },
    setCurrentName(state, action: PayloadAction<string>) {
      state.currentName = action.payload;
    },
  },
});
export const { setPlaceRequest, setWeather, setCurrentName } = weatherSlice.actions;
export const weatherSelector = state => state.weatherReducer;
export const weatherReducer = weatherSlice.reducer;
