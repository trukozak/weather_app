import { useCallback, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { GoogleMap, Marker } from '@react-google-maps/api';
import {
  useFetchOneCallApiQuery,
  useFetchCurWeatherQuery,
} from './services/WeatherServices';
import { setCurrentName, setWeather } from './app/weather/WeatherSlice';
import Header from './components/Header/Header';
import Sidebar from './components/Sidebar/Sidebar';
import Widgets from './components/Widgets/Widgets';

const App = () => {
  const { placeRequest } = useSelector(state => state.weatherReducer);
  const { data: oneCall, isLoading } = useFetchOneCallApiQuery(placeRequest);
  const { data: singleDay } = useFetchCurWeatherQuery(placeRequest);
  const dispatch = useDispatch();
  const [sidebarOpened, setSidebarOpened] = useState(false);
  const [map, setMap] = useState(null);

  useEffect(() => {
    dispatch(setWeather(oneCall));
    dispatch(setCurrentName(`${singleDay?.name}, ${singleDay?.sys?.country}`));
  }, [dispatch, oneCall, singleDay]);

  const onLoad = useCallback(function callback(map) {
    const bounds = new window.google.maps.LatLngBounds();
    map.fitBounds(bounds);
    setMap(map);
  }, []);

  const onUnmount = useCallback(function callback() {
    setMap(null);
  }, []);

  return (
    <div className="container">
      {isLoading && (
        <div id="mdiv">
          <div className="cdiv">
            <div className="rot"></div>
            <h1 className="lh">Loading</h1>
          </div>
        </div>
      )}
      <Sidebar sidebarOpened={sidebarOpened} />
      <div className="content">
        <Header
          setSidebarOpened={setSidebarOpened}
          sidebarOpened={sidebarOpened}
        />
        <h2 className="page-title">Today`s Highlights</h2>
        <div className="container__content">
          <Widgets />
          <div className="googleMap">
            <GoogleMap
              mapContainerStyle={{
                width: '100%',
                height: '100%',
                borderRadius: '30px',
              }}
              center={{
                lat: placeRequest.lat,
                lng: placeRequest.lng,
              }}
              zoom={11}
              onLoad={onLoad}
              onUnmount={onUnmount}
            >
              <Marker
                position={{
                  lat: placeRequest.lat,
                  lng: placeRequest.lng,
                }}
              />
            </GoogleMap>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
