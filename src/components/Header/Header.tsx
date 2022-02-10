//* Libs
import { useMemo, useState } from 'react';
import Slider from 'react-slick';

//* Hooks
import { useAppSelector } from 'hooks';

//* Utils
import { sliderSettings as settings } from 'utils';

//* Selectors
import { weatherSelector } from 'app/weather/WeatherSlice';

//* Components
import Frame from 'components/Frame';
import HeaderNav from './HeaderNav';

//* Style
import s from './Header.module.scss';

interface HeaderProps {
  setSidebarOpened: (value: boolean) => void;
  sidebarOpened: boolean;
}

const Header = ({ sidebarOpened, setSidebarOpened }: HeaderProps) => {
  const { weather } = useAppSelector(weatherSelector);
  const [view, setView] = useState(true);
  const [tempType, setTempType] = useState(true);

  const { hourly, daily, timezone } = weather || '';

  const FrameComponentHourly = useMemo(
    () =>
      hourly.map(hour => (
        <Frame hourly={hour} key={hour.dt} tempType={tempType} timezone={timezone} />
      )),
    [hourly, tempType, timezone],
  );

  const FrameComponentDays = useMemo(
    () =>
      daily.map(day => <Frame daily={day} key={day.dt} tempType={tempType} timezone={timezone} />),
    [daily, tempType, timezone],
  );

  return (
    <div className={s.header}>
      <HeaderNav
        setSidebarOpened={setSidebarOpened}
        setView={setView}
        sidebarOpened={sidebarOpened}
        tempType={tempType}
        setTempType={setTempType}
        view={view}
      />
      <div className={s.header__content}>
        {weather && view && <Slider {...settings}>{FrameComponentHourly}</Slider>}
        {weather && !view && <Slider {...settings}>{FrameComponentDays}</Slider>}
      </div>
    </div>
  );
};

export default Header;
