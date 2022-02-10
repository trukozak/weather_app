//* Libs
import { memo, useMemo, useState } from 'react';
import Slider from 'react-slick';
import { Audio } from 'react-loader-spinner';

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
  isLoading: boolean;
}

const Header = ({ sidebarOpened, setSidebarOpened, isLoading }: HeaderProps) => {
  const { weather } = useAppSelector(weatherSelector);
  const [view, setView] = useState(true);
  const [tempType, setTempType] = useState(true);

  const { hourly, daily, timezone } = weather;

  const SliderComponents = useMemo(() => Slider, []);

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
      {!isLoading ? (
        <div className={s.header__content}>
          {weather && (
            <SliderComponents {...settings}>
              {view ? FrameComponentHourly : FrameComponentDays}
            </SliderComponents>
          )}
        </div>
      ) : (
        <Audio color="#a9c6d1" height={50} width={50} />
      )}
    </div>
  );
};

export default memo(Header);
