import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';

export const formatDay = (date, zoneTime) => {
  dayjs.extend(timezone);
  dayjs.extend(utc);
  if (date.current) {
    return dayjs(new Date(date.current.dt * 1000))
      .tz(zoneTime)
      .format('dddd,HH:mm');
  }

  return dayjs(new Date(date * 1000))
    .tz(zoneTime)
    .format('dddd,HH:mm');
};

export const formatDays = (date, zoneTime) => {
  dayjs.extend(timezone);
  dayjs.extend(utc);

  return dayjs(new Date(date * 1000))
    .tz(zoneTime)
    .format('dddd,DD.MM');
};

export const humudityPer = humidity => {
  return !humidity
    ? ''
    : humidity >= 70
    ? 'Poor high'
    : humidity >= 60 && humidity < 70
    ? 'Fair'
    : humidity >= 30 && humidity < 60
    ? 'Maintain'
    : humidity >= 25 && humidity < 30
    ? 'Fair'
    : 'Poor low';
};

export const sunInformation = time => {
  return !time
    ? new Date()
    : new Date(time * 1000).getHours() +
        ':' +
        new Date(time * 1000).getMinutes();
};

export const uviIndex = uvi => {
  return uvi === 0
    ? 0
    : uvi <= 2
    ? 0.05
    : uvi <= 4
    ? 0.1
    : uvi <= 6
    ? 0.35
    : uvi <= 8
    ? 0.65
    : uvi <= 10
    ? 0.85
    : 1;
};

export const toCelcius = temp => {
  return Math.floor(temp - 273);
};

export const toFahrenheit = temp => {
  return Math.round(((temp - 273) * 9) / 5 + 32);
};

export const sliderSettings = {
  dots: false,
  infinite: false,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 1,
  arrows: true,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
      },
    },
  ],
};
