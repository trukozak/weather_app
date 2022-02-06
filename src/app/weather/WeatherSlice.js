import { createSlice } from '@reduxjs/toolkit';

const initialState = {
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
    setPlaceRequest(state, action) {
      state.placeRequest = action.payload;
    },
    setLoading(state, action) {
      state.isLoading = action.payload;
    },
    setWeather(state, action) {
      state.weather = action.payload;
    },
    setCurrentName(state, action) {
      state.currentName = action.payload;
    },
  },
});
export const { setPlaceRequest, setWeather, setCurrentName } =
  weatherSlice.actions;
export const weatherReducer = weatherSlice.reducer;
