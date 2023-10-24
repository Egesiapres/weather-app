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
  airDiv,
  airAqiPar,
  dayOneWeatherImg,
  dayOneLhTempsPar,
  dayTwoNamePar,
  dayTwoWeatherImg,
  dayTwoLhTempsPar,
  dayThreeNamePar,
  dayThreeWeatherImg,
  dayThreeLhTempsPar,
  dayFourNamePar,
  dayFourWeatherImg,
  dayFourLhTempsPar,
  dayFiveNamePar,
  dayFiveWeatherImg,
  dayFiveLhTempsPar,
  fiveDayForecastDiv,
  dayOneDatePar,
  dayTwoDatePar,
  dayThreeDatePar,
  dayFourDatePar,
  dayFiveDatePar,
  todayDatePar,
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
  dtToDate,
  displayFcDayElements,
  getLhTemps,
  getTime,
  addZero,
} from './utils.js';
import { getCurrentWeather, getFiveDayForecast } from './api/weather.js';
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

  const todayMonth = new Date().toLocaleDateString('en-US', { month: 'short' });
  const todayDate = new Date().getDate();

  setInterval(() => {
    const { hours, minutes, seconds } = getTime();

    todayDatePar.innerHTML = `${todayMonth} ${todayDate}, ${addZero(
      hours
    )}:${addZero(minutes)}`;
  }, 1000);

  let cityData;
  let coordParams;

  let fiveDayForecast;
  let weatherData;
  let pollutionData;

  let convertionTemps;

  if (!location) {
    // no location inputted
    cityData = await fetchData(getGeocoding, ['barcelona']);

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

      locationParams = [cityName, countryCode, limit, stateCode];
    } else {
      // location retrieved automatically
      const { name, sys } = await fetchData(getCurrentWeather, [
        location.lat,
        location.lon,
      ]);

      locationParams = [name, sys.country];
    }

    cityData = await fetchData(getGeocoding, locationParams);

    coordParams = [cityData.lat, cityData.lon];

    clearInput();
  }

  // div unhided after its population
  if (cityData) {
    // api calls
    weatherData = await fetchData(getCurrentWeather, coordParams);
    fiveDayForecast = await fetchData(getFiveDayForecast, coordParams);
    pollutionData = await fetchData(getAirPollution, coordParams);

    const { name, state, country } = cityData;

    namePar.innerHTML = name;

    positionDetailsPar.innerHTML = `${state ? state : ''}${
      state && country ? ', ' : ''
    }${country ? `(${country})` : ''}`;

    // show data unhiding elements
    primaryDiv.removeAttribute('class');
  }

  if (weatherData) {
    const { main, sys, visibility, weather, wind } = weatherData;

    weatherMainPar.innerHTML = weather[0].main;

    tempPar.innerHTML = kelvinToScale(main.temp, 'celsius');

    perceivedTempPar.innerHTML = `Feels like: ${kelvinToScale(
      main.feels_like,
      'celsius'
    )}`;

    minTempPar.innerHTML = `Min: ${kelvinToScale(main.temp_min, 'celsius')}`;

    maxTempPar.innerHTML = `Max: ${kelvinToScale(main.temp_max, 'celsius')}`;

    convertionTemps = { main: main };

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
    visibilityPar.innerHTML = `${(visibility / 1000).toFixed(0)} km`;

    // show data unhiding elements
    secondaryDiv.removeAttribute('class');
  }

  if (fiveDayForecast) {
    const { list } = fiveDayForecast;

    const dayOneFc = list.filter(
      el => dtToDate(el.dt).getDate() === todayDate + 1
    );

    const dayTwoFc = list.filter(
      el => dtToDate(el.dt).getDate() === todayDate + 2
    );

    const dayThreeFc = list.filter(
      el => dtToDate(el.dt).getDate() === todayDate + 3
    );

    const dayFourFc = list.filter(
      el => dtToDate(el.dt).getDate() === todayDate + 4
    );

    const dayFiveFc = list.filter(
      el => dtToDate(el.dt).getDate() === todayDate + 5
    );

    convertionTemps = {
      ...convertionTemps,
      dayOneLh: getLhTemps(dayOneFc),
      dayTwoLh: getLhTemps(dayTwoFc),
      dayThreeLh: getLhTemps(dayThreeFc),
      dayFourLh: getLhTemps(dayFourFc),
      dayFiveLh: getLhTemps(dayFiveFc),
    };

    displayFcDayElements(
      dayOneFc,
      null,
      dayOneDatePar,
      dayOneWeatherImg,
      dayOneLhTempsPar
    );

    displayFcDayElements(
      dayTwoFc,
      dayTwoNamePar,
      dayTwoDatePar,
      dayTwoWeatherImg,
      dayTwoLhTempsPar
    );

    displayFcDayElements(
      dayThreeFc,
      dayThreeNamePar,
      dayThreeDatePar,
      dayThreeWeatherImg,
      dayThreeLhTempsPar
    );

    displayFcDayElements(
      dayFourFc,
      dayFourNamePar,
      dayFourDatePar,
      dayFourWeatherImg,
      dayFourLhTempsPar
    );

    displayFcDayElements(
      dayFiveFc,
      dayFiveNamePar,
      dayFiveDatePar,
      dayFiveWeatherImg,
      dayFiveLhTempsPar
    );

    // show data unhiding elements
    showElement(fiveDayForecastDiv, 'b-1 br-15 bc-transparent bg-transparent');
  }

  scaleSelect.addEventListener('change', e => {
    changeScale(convertionTemps, e.target.value);
  });

  if (pollutionData) {
    const { list } = pollutionData;

    airAqiPar.innerHTML = `AQI: ${list[0].main.aqi}`;

    // show data unhiding elements
    showElement(
      airDiv,
      'container col-direction b-1 br-15 bc-transparent box-small bg-transparent'
    );
  }
};

displayWeatherData();

form.addEventListener('submit', e => {
  displayWeatherData(input.value, e);
  currentLocationBtn.setAttribute('class', 'b-0 br-10 inactive');
});

currentLocationBtn.addEventListener('click', () => {
  getCurrentLocation();
  currentLocationBtn.setAttribute('class', 'b-0 br-10 active');
});

// TODO: manage search result = undefined
// TODO: improve API results conditional display
// TODO: check code

// in future
// TODO: hour forecast
// TODO: modals containing scales info (beaufort, air pollution params...)
