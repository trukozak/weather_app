import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';
import { CurWeather, ICoord, IWeatherAll } from '../app/type/weatherTypes';

export const weatherAPI = createApi({
  reducerPath: 'weatherAPI',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://api.openweathermap.org/data/2.5/',
  }),
  endpoints: build => ({
    fetchCurWeather: build.query<CurWeather, ICoord>({
      query: arg => ({
        url: `weather?lat=${arg.lat}&lon=${arg.lng}&appid=${process.env.REACT_APP_API_KEY}`,
      }),
    }),
    fetchOneCallApi: build.query<IWeatherAll, ICoord>({
      query: arg => ({
        url: `onecall?lat=${arg.lat}&lon=${arg.lng}&exclude=minutely&appid=${process.env.REACT_APP_API_KEY}`,
      }),
    }),
  }),
});

export const { useFetchCurWeatherQuery, useFetchOneCallApiQuery } = weatherAPI;
