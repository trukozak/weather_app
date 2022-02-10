//* Libs
import cs from 'classnames';

//* Selectors
import { weatherSelector } from 'app/weather/WeatherSlice';

//* Hooks
import { useAppSelector } from 'hooks';

//* Components
import CurrentWeather from './CurrentWeather';
import ButtonGps from './ButtonGps';
import AutocompleteCountry from './AutocompleteCountry';

//* Style
import s from './Sidebar.module.scss';

interface SidebarProps {
  sidebarOpened: boolean;
}

const Sidebar = ({ sidebarOpened }: SidebarProps) => {
  const { weather, currentName } = useAppSelector(weatherSelector);
  const { current, timezone } = weather;

  return (
    <div className={cs(s.sidebar, { [s.activeSidebar]: sidebarOpened })}>
      <div className={s.search}>
        <label className={s.search__field}>
          <i className="fa fa-search"></i>
          <AutocompleteCountry currentName={currentName} />
        </label>
        <ButtonGps />
      </div>
      {weather && (
        <CurrentWeather
          timezone={timezone}
          current={current}
          currentName={currentName}
          weather={weather}
        />
      )}
    </div>
  );
};

export default Sidebar;
