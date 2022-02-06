import { useSelector } from 'react-redux';
import { uviIndex } from '../../../utils/utils';
import s from '../Widgets.module.scss';

const Uvi = () => {
  const { weather } = useSelector(state => state.weatherReducer);
  return (
    <div className={s.frame}>
      <h3>UV index</h3>
      {weather && (
        <div className={s.frame__uv}>
          <div className={s.gradient}>
            <svg id="half-circle" viewBox="0 0 106 57" width="150">
              <defs>
                <linearGradient id="orange-to-pink" x1="1" x2="0" y1="0" y2="0">
                  <stop
                    offset={`${uviIndex(weather?.current?.uvi)}`}
                    stopColor="darkblue"
                  />
                  <stop
                    offset={
                      `${uviIndex(weather?.current?.uvi)}` === '0' ? 0 : 0.7
                    }
                    stopColor="#f8f8ff"
                  />
                </linearGradient>
              </defs>
              <path d="M101 4c0 27.1-21.9 49-49 49S4 31.1 4 4"></path>
            </svg>
            <span className={s.firstIndex}>1</span>
            <span className={s.secondIndex}>6</span>
            <span className={s.thirdIndex}>9</span>
            <span className={s.lastIndex}>12</span>
            <span className={s.mainIndex}>{weather.current.uvi}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Uvi;
