import {
  tempPar,
  perceivedTempPar,
  minTempPar,
  maxTempPar,
} from './elements.js';

export const API_KEY = 'd84df6a5359d1ca50cf0749743171b50';

export const capitalizeFirstLetter = word =>
  `${word.charAt(0).toUpperCase()}${word.slice(1)}`;

export const kelvinToScale = (temperature, scale) => {
  if (scale === 'celsius') {
    return `${(temperature - 273.15).toFixed(1)}°C`;
  }

  if (scale === 'fahrenheit') {
    return `${(((temperature - 273.15) * 9) / 5 + 32).toFixed(1)}°F`;
  }

  if (scale === 'kelvin') {
    return `${temperature} K`;
  }
};

export const unixTStoHour = timestamp => {
  const msTimestamp = timestamp * 1000;

  // Date object accepts ms as input
  const date = new Date(msTimestamp);

  const hour = date.getHours();
  const minutes = date.getMinutes();

  const addZero = number => {
    return number < 10 ? `0${number}` : number;
  };

  return `${addZero(hour)}:${addZero(minutes)}`;
};

export const changeScale = (
  { temp, feels_like, temp_max, temp_min },
  value
) => {
  tempPar.innerHTML = kelvinToScale(temp, value);
  perceivedTempPar.innerHTML = `Feels like: ${kelvinToScale(
    feels_like,
    value
  )}`;
  minTempPar.innerHTML = `Min: ${kelvinToScale(temp_min, value)}`;
  maxTempPar.innerHTML = `Max: ${kelvinToScale(temp_max, value)}`;
};

export const msToKmh = speed => {
  return (speed * 3.6).toFixed(1);
};

export const meteoDegToDirection = meteoDeg => {
  const directions = [
    { direction: 'N', arrow: '↓', interval: [0, 11.25] },
    { direction: 'N', arrow: '↓', interval: [348.75, 360] },
    { direction: 'NNE', arrow: '↙', interval: [11.25, 33.75] },
    { direction: 'NE', arrow: '↙', interval: [33.75, 56.25] },
    { direction: 'ENE', arrow: '↙', interval: [56.25, 78.75] },
    { direction: 'E', arrow: '←', interval: [78.75, 101.25] },
    { direction: 'ESE', arrow: '↖', interval: [101.25, 123.75] },
    { direction: 'SE', arrow: '↖', interval: [123.75, 146.25] },
    { direction: 'SSE', arrow: '↖', interval: [146.25, 168.75] },
    { direction: 'S', arrow: '↑', interval: [168.75, 191.25] },
    { direction: 'SSW', arrow: '↗', interval: [191.25, 213.75] },
    { direction: 'SW', arrow: '↗', interval: [213.75, 236.25] },
    { direction: 'WSW', arrow: '↗', interval: [236.25, 258.75] },
    { direction: 'W', arrow: '→', interval: [258.75, 281.25] },
    { direction: 'WNW', arrow: '↘', interval: [281.25, 303.75] },
    { direction: 'NW', arrow: '↘', interval: [303.75, 326.25] },
    { direction: 'NNW', arrow: '↘', interval: [326.25, 348.75] },
  ];

  let direction;

  directions.forEach(el => {
    if (meteoDeg >= el.interval[0] && meteoDeg < el.interval[1]) {
      direction = `${el.arrow} ${el.direction}`;
    }
  });

  return direction;
};

export const getOriginalIcon = code =>
  `https://openweathermap.org/img/wn/${code}@2x.png`;

// TODO: hour based img
export const getCustomIcon = weather => {
  let icon;

  switch (weather) {
    case 'Clear':
      icon = '/img/clear-day.svg';
      break;

    case 'Clouds':
      icon = '/img/cloudy.svg';
      break;

    case 'Mist':
      icon = '/img/mist.svg';
      break;

    case 'Rain':
      icon = '/img/rain.svg';
      break;

    case 'Snow':
      icon = '/img/snow.svg';
      break;
  }

  return icon;
};

export const getBftIcon = speed => {
  const bftScale = [
    {
      bft: 0,
      icon: '/img/wind-beaufort-0.svg',
      description: 'Calm',
      interval: '',
    },
    {
      bft: 1,
      icon: '/img/wind-beaufort-1.svg',
      description: 'Light air',
      interval: [1, 5],
    },
    {
      bft: 2,
      icon: '/img/wind-beaufort-2.svg',
      description: 'Light breeze',
      interval: [5, 11],
    },
    {
      bft: 3,
      icon: '/img/wind-beaufort-3.svg',
      description: 'Gentle breeze',
      interval: [11, 19],
    },
    {
      bft: 4,
      icon: '/img/wind-beaufort-4.svg',
      description: 'Moderate breeze',
      interval: [19, 28],
    },
    {
      bft: 5,
      icon: '/img/wind-beaufort-5.svg',
      description: 'Fresh breeze',
      interval: [28, 38],
    },
    {
      bft: 6,
      icon: '/img/wind-beaufort-6.svg',
      description: 'Strong breeze',
      interval: [38, 49],
    },
    {
      bft: 7,
      icon: '/img/wind-beaufort-7.svg',
      description: 'High wind',
      interval: [49, 61],
    },
    {
      bft: 8,
      icon: '/img/wind-beaufort-8.svg',
      description: 'Gale',
      interval: [61, 74],
    },
    {
      bft: 9,
      icon: '/img/wind-beaufort-9.svg',
      description: 'Strong gale',
      interval: [74, 88],
    },
    {
      bft: 10,
      icon: '/img/wind-beaufort-10.svg',
      description: 'Storm',
      interval: [88, 102],
    },
    {
      bft: 11,
      icon: '/img/wind-beaufort-11.svg',
      description: 'Violent storm',
      interval: [102, 118],
    },
    {
      bft: 12,
      icon: '/img/wind-beaufort-12.svg',
      description: 'Hurricane-force',
      interval: '',
    },
  ];

  let bftIcon;

  bftScale.forEach(el => {
    if (speed >= el?.interval[0] && speed < el?.interval[1]) {
      bftIcon = el.icon;
    }

    if (speed < 1) {
      bftIcon = bftScale[0].icon;
    }

    if (speed >= 118) {
      bftIcon = bftScale[12].icon;
    }
  });

  return bftIcon;
};

export const hideElement = element => {
  element.setAttribute('class', 'hidden');
};

export const showElement = (element, elClass) => {
  element.setAttribute('class', elClass);
};
