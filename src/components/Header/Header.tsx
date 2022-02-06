import { useState } from 'react';
import Slider from 'react-slick';
import { useAppSelector } from '../../hooks/hooks';
import Frame from '../Frame/Frame';
import { sliderSettings as settings } from '../../utils/utils';
import s from './Header.module.scss';

interface HeaderProps {
  setSidebarOpened: (value: boolean) => void;
  sidebarOpened: boolean;
}

const Header = ({ sidebarOpened, setSidebarOpened }: HeaderProps) => {
  const { weather } = useAppSelector(state => state.weatherReducer);
  const [view, setView] = useState(true);
  const [tempType, setTempType] = useState(true);
  return (
    <div className={s.header}>
      <div className={s.btns}>
        <div
          className={
            sidebarOpened ? `${s.activebrgr} ${s.burger}` : `${s.burger}`
          }
          onClick={() => setSidebarOpened(!sidebarOpened)}
        >
          <div className={s.dash}></div>
          <div className={s.dash}></div>
          <div className={s.dash}></div>
          <div className={s.dash}></div>
        </div>
        <div className={s.btns__view}>
          <p
            className={view ? `${s.activeType}` : ' '}
            onClick={() => setView(true)}
          >
            Today
          </p>
          <p
            className={!view ? `${s.activeType}` : ' '}
            onClick={() => setView(false)}
          >
            Week
          </p>
        </div>
        <div className={s.btns__temperature}>
          <p
            className={tempType ? `${s.activeTemp}` : ' '}
            onClick={() => setTempType(true)}
          >
            °C
          </p>
          <p
            className={!tempType ? `${s.activeTemp}` : ' '}
            onClick={() => setTempType(false)}
          >
            °F
          </p>
        </div>
      </div>
      <div className={s.header__content}>
        {weather && view && (
          <Slider {...settings}>
            {weather.hourly.map(hour => (
              <Frame
                hourly={hour}
                key={hour.dt}
                tempType={tempType}
                timezone={weather.timezone}
              />
            ))}
          </Slider>
        )}
        {weather && !view && (
          <Slider {...settings}>
            {weather.daily.map(day => (
              <Frame
                daily={day}
                key={day.dt}
                tempType={tempType}
                timezone={weather.timezone}
              />
            ))}
          </Slider>
        )}
      </div>
    </div>
  );
};

export default Header;
