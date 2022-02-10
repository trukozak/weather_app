//* Selectors
import { weatherSelector } from 'app/weather/WeatherSlice';

//* Hooks
import { useAppSelector } from 'hooks';

//* Style
import s from '../Widgets.module.scss';

const WindStatus = () => {
  const { weather } = useAppSelector(weatherSelector);
  const { current } = weather;

  return (
    <div className={s.frame}>
      <h3>Wind Status</h3>
      {weather && (
        <div className={s.windStatus}>
          <p>
            <span>{current.wind_speed}</span> m/s
          </p>
          <p>Light breeze</p>
        </div>
      )}
    </div>
  );
};

export default WindStatus;
