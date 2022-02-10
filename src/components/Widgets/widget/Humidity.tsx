//* Selectors
import { weatherSelector } from 'app/weather/WeatherSlice';

//* Hooks
import { useAppSelector } from 'hooks';

//* Utils
import { humudityPer } from 'utils';

//* Style
import s from '../Widgets.module.scss';

const Humidity = () => {
  const { weather } = useAppSelector(weatherSelector);
  const { current } = weather;

  return (
    <div className={s.frame}>
      <h3>Humidity</h3>
      {weather && (
        <div className={s.humudity}>
          <div className={s.humudity__percent}>
            <p>
              <span>{current.humidity}</span> %
            </p>
            <p>{humudityPer(current.humidity)}</p>
          </div>
          <div className={s.frame__humudity}>
            <div
              style={{
                background: `linear-gradient(360deg, #08E ${current.humidity}%, #fff 50%)`,
              }}
            ></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Humidity;
