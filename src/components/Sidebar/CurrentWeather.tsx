//* Utils
import { baseImgUrl, formatDay } from 'utils';

//* Types
import { ICurrent, IWeatherAll } from 'app/type/weatherTypes';

//* Style
import s from './Sidebar.module.scss';

interface CurrentWeatherProps {
  current: ICurrent;
  currentName: string;
  weather: IWeatherAll;
  timezone: string;
}
const CurrentWeather = ({ current, currentName, weather, timezone }: CurrentWeatherProps) => {
  const imgCurrentWeatherUrl = `${baseImgUrl}${current.weather[0].icon}@2x.png`;

  return (
    <div key={current.dt}>
      <div className={s.info}>
        <h1 className={s.title}>{Math.floor(current.temp - 273)}°</h1>
        <div>
          <h3 className={s.city}>{currentName}</h3>
          <p className={s.date}>{formatDay(weather, timezone)}</p>
        </div>
        <img className={s.icon} src={imgCurrentWeatherUrl} alt="" />
      </div>

      <div className={s.clouds}>
        <p>Weather Details:</p>
        <ul>
          <li>
            <span>Clouds</span> <span>{current.clouds}%</span>
          </li>
          <li>
            <span>Description</span>
            <span>{current.weather[0].description}</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default CurrentWeather;
