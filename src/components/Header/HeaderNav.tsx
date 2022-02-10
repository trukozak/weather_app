//* Libs
import cs from 'classnames';

//* Style
import s from './Header.module.scss';

interface HeaderNavProps {
  setSidebarOpened: (value: boolean) => void;
  setView: (value: boolean) => void;
  sidebarOpened: boolean;
  tempType: boolean;
  setTempType: (value: boolean) => void;
  view: boolean;
}

const HeaderNav = ({
  setSidebarOpened,
  setView,
  sidebarOpened,
  tempType,
  setTempType,
  view,
}: HeaderNavProps) => {
  return (
    <div className={s.btns}>
      <div
        className={cs(s.burger, { [s.activebrgr]: sidebarOpened })}
        onClick={() => setSidebarOpened(!sidebarOpened)}
      >
        <div className={s.dash}></div>
        <div className={s.dash}></div>
        <div className={s.dash}></div>
        <div className={s.dash}></div>
      </div>
      <div className={s.btns__view}>
        <p className={cs({ [s.activeType]: view })} onClick={() => setView(true)}>
          Today
        </p>
        <p className={cs({ [s.activeType]: !view })} onClick={() => setView(false)}>
          Week
        </p>
      </div>
      <div className={s.btns__temperature}>
        <p className={cs({ [s.activeType]: tempType })} onClick={() => setTempType(true)}>
          °C
        </p>
        <p className={cs({ [s.activeType]: !tempType })} onClick={() => setTempType(false)}>
          °F
        </p>
      </div>
    </div>
  );
};

export default HeaderNav;
