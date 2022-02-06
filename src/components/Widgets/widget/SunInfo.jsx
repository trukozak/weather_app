import { useSelector } from 'react-redux';
import { sunInformation } from '../../../utils/utils';
import s from '../Widgets.module.scss';
import sunriseIcon from '../../../images/sunrise.png';
import sunsetIcon from '../../../images/sunset.png';

const SunInfo = () => {
  const { weather } = useSelector(state => state.weatherReducer);
  return (
    <div className={s.frame}>
      <h3>Sunrise & Sunset</h3>
      {weather && (
        <div className={s.frame__sunInfo}>
          <p>
            <img src={sunriseIcon} alt="sunrise" />
            {sunInformation(weather?.current.sunrise)}
          </p>
          <p>
            <img src={sunsetIcon} alt="sunset" />
            {sunInformation(weather?.current.sunset)}
          </p>
        </div>
      )}
    </div>
  );
};

export default SunInfo;
