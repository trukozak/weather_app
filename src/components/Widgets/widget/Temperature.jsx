import { useSelector } from 'react-redux';
import s from '../Widgets.module.scss';
import maxTemp from '../../../images/hot.png';
import minTemp from '../../../images/cold.png';

const Temperature = () => {
  const { weather } = useSelector(state => state.weatherReducer);
  return (
    <div className={s.frame}>
      <h3>Min & Max temperature</h3>
      {weather && (
        <div className={s.temperature}>
          <p>
            <img src={maxTemp} alt="max" />
            <span>{Math.floor(weather.daily[0].temp.max) - 273} °C</span>
          </p>
          <p>
            <img src={minTemp} alt="min" />
            <span>{Math.floor(weather.daily[0].temp.min) - 273} °C</span>
          </p>
        </div>
      )}
    </div>
  );
};

export default Temperature;
