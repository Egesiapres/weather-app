export const personalAPIkey = 'd84df6a5359d1ca50cf0749743171b50';

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
    return `${temperature} K`
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

export const meteoDegToDirection = meteoDeg => {
  let direction;

  if (0 < meteoDeg < 23 || 337 < meteoDeg < 360) {
    direction = 'N';
  } else if (24 < meteoDeg < 68) {
    direction = 'NE';
  } else if (69 < meteoDeg < 113) {
    direction = 'E';
  } else if (114 < meteoDeg < 158) {
    direction = 'SE';
  } else if (159 < meteoDeg < 203) {
    direction = 'S';
  } else if (204 < meteoDeg < 248) {
    direction = 'SW';
  } else if (249 < meteoDeg < 293) {
    direction = 'W';
  } else if (294 < meteoDeg < 336) {
    direction = 'NW';
  }

  return `${direction} (${meteoDeg}°)`;
};

export const getImg = code => `https://openweathermap.org/img/wn/${code}@2x.png`;
