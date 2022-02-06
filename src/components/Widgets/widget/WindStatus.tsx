import { useAppSelector } from '../../../hooks/hooks';
import s from '../Widgets.module.scss';

const WindStatus = () => {
  const { weather } = useAppSelector(state => state.weatherReducer);
  return (
    <div className={s.frame}>
      <h3>Wind Status</h3>
      {weather && (
        <div className={s.windStatus}>
          <p>
            <span>{weather.current.wind_speed}</span> m/s
          </p>
          <p>Light breeze</p>
        </div>
      )}
    </div>
  );
};

export default WindStatus;
