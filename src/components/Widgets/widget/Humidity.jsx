import { useSelector } from 'react-redux';
import { humudityPer } from '../../../utils/utils';
import s from '../Widgets.module.scss';

const Humidity = () => {
  const { weather } = useSelector(state => state.weatherReducer);
  return (
    <div className={s.frame}>
      <h3>Humidity</h3>
      {weather && (
        <div className={s.humudity}>
          <div className={s.humudity__percent}>
            <p>
              <span>{weather.current.humidity}</span> %
            </p>
            <p>{humudityPer(weather.current.humidity)}</p>
          </div>
          <div className={s.frame__humudity}>
            <div
              style={{
                background: `linear-gradient(360deg, #08E ${weather.current.humidity}%, #fff 50%)`,
              }}
            ></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Humidity;
