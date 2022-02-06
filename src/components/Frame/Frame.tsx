import { IDaily, IHourly } from '../../app/type/weatherTypes';
import {
  formatDay,
  formatDays,
  toCelcius,
  toFahrenheit,
} from '../../utils/utils';
import s from './Frame.module.scss';

type FrameProps = {
  hourly?: IHourly;
  daily?: IDaily;
  tempType: boolean;
  timezone: string;
};

const Frame = ({ hourly, daily, tempType, timezone }: FrameProps) => {
  return (
    <div className={s.frame}>
      {hourly && (
        <>
          <p className={s.title}>{formatDay(hourly.dt, timezone)}</p>
          <img
            src={`http://openweathermap.org/img/wn/${hourly.weather[0].icon}@2x.png`}
            alt="icon"
          />
          <p className={s.temperature}>
            {tempType
              ? `${toCelcius(hourly.temp)} °C`
              : `${toFahrenheit(hourly.temp)} °F`}
          </p>
        </>
      )}
      {daily && (
        <>
          <p className={s.title}>{formatDays(daily.dt, timezone)}</p>
          <img
            src={`http://openweathermap.org/img/wn/${daily.weather[0].icon}@2x.png`}
            alt="icon"
          />
          <p className={s.temperature}>
            {tempType
              ? `${toCelcius(daily.temp.min)} °C ‒ ${toCelcius(
                  daily.temp.max,
                )} °C`
              : `${toFahrenheit(daily.temp.min)} °F ‒ ${toFahrenheit(
                  daily.temp.max,
                )} °F`}
          </p>
        </>
      )}
    </div>
  );
};

export default Frame;
