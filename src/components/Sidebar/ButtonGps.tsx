//* Libs
import { toast } from 'react-hot-toast';

//* Selectors
import { setPlaceRequest } from 'app/weather/WeatherSlice';

//* Hooks
import { useAppDispatch } from 'hooks';

//* Style
import s from './Sidebar.module.scss';

const ButtonGps = () => {
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

  return (
    <button className={s.search__btn} onClick={getUserLocation}>
      <i className="fa fa-home"></i>
    </button>
  );
};

export default ButtonGps;
