import {
  Key,
  ReactChild,
  ReactFragment,
  ReactPortal,
  useEffect,
  useState,
} from 'react';
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from 'react-places-autocomplete';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { ToastContainer, toast } from 'react-toastify';
import { setPlaceRequest } from '../../app/weather/WeatherSlice';
import { formatDay } from '../../utils/utils';
import s from './Sidebar.module.scss';
import 'react-toastify/dist/ReactToastify.min.css';
import { ICoord } from '../../app/type/weatherTypes';

interface SidebarProps {
  sidebarOpened: boolean;
}

const Sidebar = ({ sidebarOpened }: SidebarProps) => {
  const { weather, currentName } = useAppSelector(
    state => state.weatherReducer,
  );
  const [address, setAddress] = useState('');
  const dispatch = useAppDispatch();
  const getUserLocation = () => {
    navigator.geolocation.getCurrentPosition(
      position => {
        dispatch(
          setPlaceRequest({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          }),
        );
      },
      error => {
        if (error.code === 1) {
          toast.error(
            'To determine your geolocation, you must allow this action in the browser settings',
          );
        }
      },
    );
  };

  useEffect(() => {
    setAddress(currentName);
  }, [currentName]);

  const onError = () => {
    if (window.google.maps.places.PlacesServiceStatus) {
      toast.error('Invalid data');
    }
  };

  const handleSelect = async (value: any) => {
    geocodeByAddress(value)
      .then((results: any[]) => {
        return getLatLng(results[0]);
      })
      .then((latLng: ICoord) => {
        toast.error(latLng);
        dispatch(setPlaceRequest(latLng));
      })
      .catch(() => toast.warning('Enter city name'));
  };
  return (
    <div
      className={
        sidebarOpened ? `${s.activeSidebar} ${s.sidebar}` : `${s.sidebar}`
      }
    >
      <div className={s.search}>
        <ToastContainer />
        <label className={s.search__field}>
          <i className="fa fa-search"></i>
          <PlacesAutocomplete
            value={address}
            onChange={setAddress}
            onSelect={handleSelect}
            onError={onError}
          >
            {({
              getInputProps,
              suggestions,
              getSuggestionItemProps,
              loading,
            }) => (
              <div className={s.dropdown}>
                <input {...getInputProps({ placeholder: 'Type address' })} />

                <ul className={s.dropdown__content}>
                  {loading ? <div>...loading</div> : null}
                  {suggestions.map(
                    (suggestion: {
                      active: any;
                      placeId: Key;
                      description:
                        | boolean
                        | ReactChild
                        | ReactFragment
                        | ReactPortal;
                    }) => {
                      const s = suggestion.active
                        ? {
                            color: '#808080',
                            cursor: 'pointer',
                            lists: 'none',
                          }
                        : {
                            backgroundColor: 'transparent',
                            cursor: 'pointer',
                            lists: 'none',
                          };
                      return (
                        <li
                          key={suggestion.placeId}
                          {...getSuggestionItemProps(suggestion, { s })}
                        >
                          {suggestion.description}
                        </li>
                      );
                    },
                  )}
                </ul>
              </div>
            )}
          </PlacesAutocomplete>
        </label>
        <button className={s.search__btn} onClick={() => getUserLocation()}>
          <i className="fa fa-home"></i>
        </button>
      </div>
      {weather && (
        <div key={weather.current.dt}>
          <div className={s.info}>
            <h1 className={s.title}>
              {Math.floor(weather.current.temp - 273)}°
            </h1>
            <div>
              <h3 className={s.city}>{currentName}</h3>
              <p className={s.date}>{formatDay(weather, weather?.timezone)}</p>
            </div>
            <img
              className={s.icon}
              src={`http://openweathermap.org/img/wn/${weather.current.weather[0].icon}@2x.png`}
              alt=""
            />
          </div>

          <div className={s.clouds}>
            <p>Weather Details:</p>
            <ul>
              <li>
                <span>Clouds</span> <span>{weather.current.clouds}%</span>
              </li>
              <li>
                <span>Description</span>
                <span>{weather.current.weather[0].description}</span>
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
