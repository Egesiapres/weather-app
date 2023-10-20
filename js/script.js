import {
  input,
  form,
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
  currentLocationBtn,
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
  formatInputValue,
  getCurrentLocation,
} from './utils.js';
import { getCurrentWeather } from './api/weather.js';
import { getGeocoding } from './api/location.js';
import { getAirPollution } from './api/pollution.js';
import { fetchData } from './api/api.js';

const clearInput = () => {
  input.value = '';
};

// f that displays the data retrieved
export const displayWeatherData = async (location, event) => {
  // no automatic form submit
  if (event) {
    event.preventDefault();
  }

  let cityData;
  let coordParams;

  if (!location) {
    // no location inputted
    cityData = await fetchData(getGeocoding);

    coordParams = [cityData.lat, cityData.lon];
  }

  if (location) {
    let locationParams;

    // location inputted manually
    if (typeof location === 'string') {
      locationParams = formatInputValue(location);

      const cityName = locationParams[0] || '';
      const countryCode = locationParams[1] || '';
      const limit = locationParams[2] || '';
      const stateCode = locationParams[3] || '';

      console.log(
        'cityName:',
        cityName,
        'countryCode:',
        countryCode,
        'limit:',
        limit,
        'stateCode:',
        stateCode
      );

      locationParams = [cityName, countryCode, limit, stateCode];
    } else {
      const { name, sys } = await fetchData(getCurrentWeather, [
        location.lat,
        location.lon,
      ]);

      locationParams = [name, sys.country];
    }

    cityData = await fetchData(getGeocoding, locationParams);

    // location not necessary a string
    // coordParams = [location.lat || cityData.lat, location.lon || cityData.lon];
    coordParams = [cityData.lat, cityData.lon];

    clearInput();
  }

  const { name, state, country } = cityData;

  const weatherData = await fetchData(getCurrentWeather, coordParams);

  const pollutionData = await fetchData(getAirPollution, coordParams);

  // show data unhidind elements
  if (cityData || weatherData) {
    primaryDiv.removeAttribute('class');
    secondaryDiv.removeAttribute('class');
  }

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

form.addEventListener('submit', e => displayWeatherData(input.value, e));

currentLocationBtn.addEventListener('click', getCurrentLocation);

// TODO: current location
// TODO: air pollution
// TODO: hour/daily forecast
