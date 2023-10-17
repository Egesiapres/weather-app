import {
  input,
  form,
  searchBtn,
  namePar,
  positionDetailsPar,
  weatherMainPar,
  tempPar,
  sunrisePar,
  sunsetPar,
  windSpeedPar,
  windDegPar,
  weatherMainImg,
  maxTempPar,
  minTempPar,
  scaleSelect,
  perceivedTempPar,
  windBftIcon,
  primaryDiv,
  gustBftIcon,
  gustSpeedPar,
  gustSpeedDiv,
  humidityPar,
  pressurePar,
  visibilityPar,
  secondaryDiv,
} from './elements.js';
import {
  kelvinToScale,
  unixTStoHour,
  changeScale,
  msToKmh,
  meteoDegToDirection,
  getCustomIcon,
  getBftIcon,
  hideElement,
  showElement,
} from './utils.js';
import fetchData from './fetchData.js';

const clearInput = () => {
  input.value = '';
};

// f that displays the data retrieved
const displayWeatherData = async (location, event) => {
  // avoid the automatic form submit
  if (event) {
    event.preventDefault();
  }

  let cityData;

  if (location) {
    cityData = await fetchData(location);

    clearInput();
  } else {
    cityData = await fetchData();
  }

  // show data
  if (cityData) {
    primaryDiv.removeAttribute('class');
    secondaryDiv.removeAttribute('class');
  }

  const { name, state, country } = cityData;

  const cityCoordinates = {
    lat: cityData.lat,
    lon: cityData.lon,
  };

  const weatherData = await fetchData(cityCoordinates);
  console.log(weatherData);

  const { main, sys, visibility, weather, wind } = weatherData;

  namePar.innerHTML = name;
  positionDetailsPar.innerHTML = `${state ? state : ''}${
    state && country ? ', ' : ''
  }${country ? `(${country})` : ''}`;
  weatherMainPar.innerHTML = weather[0].main;

  tempPar.innerHTML = kelvinToScale(main.temp, 'celsius');
  perceivedTempPar.innerHTML = `Feels like: ${kelvinToScale(
    main.feels_like,
    'celsius'
  )}`;
  minTempPar.innerHTML = `Min: ${kelvinToScale(main.temp_min, 'celsius')}`;
  maxTempPar.innerHTML = `Max: ${kelvinToScale(main.temp_max, 'celsius')}`;

  scaleSelect.addEventListener('change', e =>
    changeScale(main, e.target.value)
  );

  // weatherMainImg.setAttribute('src', getOriginalIcon(weather[0].icon));
  weatherMainImg.setAttribute('src', getCustomIcon(weather[0].main));

  windBftIcon.setAttribute('src', getBftIcon(msToKmh(wind.speed)));
  windSpeedPar.innerHTML = `Wind: ${msToKmh(wind.speed)} km/h`;

  if (wind.gust) {
    showElement(gustSpeedDiv, 'container y-center');

    gustBftIcon.setAttribute('src', getBftIcon(msToKmh(wind.gust)));
    gustSpeedPar.innerHTML = `Gust: ${msToKmh(wind.gust)} km/h`;
  } else {
    hideElement(gustSpeedDiv);
  }

  windDegPar.innerHTML = `Direction: ${meteoDegToDirection(wind.deg)}`;

  sunrisePar.innerHTML = `Sunrise: ${unixTStoHour(sys.sunrise)}`;
  sunsetPar.innerHTML = `Sunset: ${unixTStoHour(sys.sunset)}`;

  humidityPar.innerHTML = `${main.humidity}%`;
  pressurePar.innerHTML = `${main.pressure} hPa`;
  visibilityPar.innerHTML = `${(visibility / 1000).toFixed(1)} km`;
};

displayWeatherData();

searchBtn.addEventListener('click', () => displayWeatherData(input.value));

form.addEventListener('submit', e => displayWeatherData(input.value, e));
