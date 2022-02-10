//* Selectors
import { weatherSelector } from 'app/weather/WeatherSlice';

//* Hooks
import { useAppSelector } from 'hooks';

//* Style
import s from '../Widgets.module.scss';

const Visibility = () => {
  const { weather } = useAppSelector(weatherSelector);
  const { current } = weather;

  return (
    <div className={s.frame}>
      <h3>Visibility</h3>

      <div className={s.visibility}>
        <span>{current?.visibility || 0}</span> Average visibility, metres
      </div>
    </div>
  );
};

export default Visibility;
