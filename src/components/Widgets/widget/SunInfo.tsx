//* Hooks
import { useAppSelector } from 'hooks';

//* Utils
import { sunInformation } from 'utils';

//* Selectors
import { weatherSelector } from 'app/weather/WeatherSlice';

//* Style
import s from '../Widgets.module.scss';

//* Image
import sunriseIcon from 'images/sunrise.png';
import sunsetIcon from 'images/sunset.png';

const SunInfo = () => {
  const { weather } = useAppSelector(weatherSelector);
  const { current } = weather;

  return (
    <div className={s.frame}>
      <h3>Sunrise & Sunset</h3>
      {weather && (
        <div className={s.frame__sunInfo}>
          <p>
            <img src={sunriseIcon} alt="sunrise" />
            {sunInformation(current?.sunrise)}
          </p>
          <p>
            <img src={sunsetIcon} alt="sunset" />
            {sunInformation(current?.sunset)}
          </p>
        </div>
      )}
    </div>
  );
};

export default SunInfo;
