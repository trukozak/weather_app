import { useSelector } from 'react-redux';
import s from '../Widgets.module.scss';

const Visibility = () => {
  const { weather } = useSelector(state => state.weatherReducer);
  return (
    <div className={s.frame}>
      <h3>Visibility</h3>

      <div className={s.visibility}>
        <span>{weather?.current?.visibility || 0}</span> Average visibility,
        metres
      </div>
    </div>
  );
};

export default Visibility;
