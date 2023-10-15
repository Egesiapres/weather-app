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

export const msToKm = speed => {
  return `${(speed * 3.6).toFixed(1)}km/h`;
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
