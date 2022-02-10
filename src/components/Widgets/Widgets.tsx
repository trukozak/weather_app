//* Components
import Humidity from './widget/Humidity';
import SunInfo from './widget/SunInfo';
import Temperature from './widget/Temperature';
import Uvi from './widget/Uvi';
import Visibility from './widget/Visibility';
import WindStatus from './widget/WindStatus';

//* Style
import s from './Widgets.module.scss';

const Widgets = () => {
  return (
    <div className={s.widgets}>
      <Uvi />
      <WindStatus />
      <SunInfo />
      <Humidity />
      <Visibility />
      <Temperature />
    </div>
  );
};

export default Widgets;
