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
  todayMinTempPar,
  todayMaxTempPar,
  todayWeatherImg,
  dayOneWeatherImg,
  dayOneNamePar,
  dayOneMinTempPar,
  dayOneMaxTempPar,
  dayTwoNamePar,
  dayTwoWeatherImg,
  dayTwoMinTempPar,
  dayTwoMaxTempPar,
  dayThreeNamePar,
  dayThreeWeatherImg,
  dayThreeMinTempPar,
  dayThreeMaxTempPar,
  dayFourNamePar,
  dayFourWeatherImg,
  dayFourMinTempPar,
  dayFourMaxTempPar,
  dayFiveNamePar,
  dayFiveWeatherImg,
  dayFiveMinTempPar,
  dayFiveMaxTempPar,
  fiveDayForecastDiv,
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
  fillFcDayElements,
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

  let cityData;
  let coordParams;

  let fiveDayForecast;
  let weatherData;
  let pollutionData;

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

  // div unhided after its population
  if (cityData) {
    // api calls
    fiveDayForecast = await fetchData(getFiveDayForecast, coordParams);

    weatherData = await fetchData(getCurrentWeather, coordParams);
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

    scaleSelect.addEventListener('change', e =>
      changeScale(main, e.target.value)
    );

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

    // show data unhiding elements
    secondaryDiv.removeAttribute('class');
  }

  if (fiveDayForecast) {
    const { list } = fiveDayForecast;

    const todayDate = new Date().getDate();

    const todayFc = list.filter(el => dtToDate(el.dt).getDate() === todayDate);
    console.log('Today fc', todayFc);

    const dayOneFc = list.filter(
      el => dtToDate(el.dt).getDate() === todayDate + 1
    );
    console.log('Day 1 fc:', dayOneFc);
    console.log('Img 1:', dayOneFc.map(el => el.weather[0].description));

    const dayTwoFc = list.filter(
      el => dtToDate(el.dt).getDate() === todayDate + 2
    );
    console.log('Day 2 fc:', dayTwoFc);
    console.log('Img 2:', dayTwoFc.map(el => el.weather[0].description));

    const dayThreeFc = list.filter(
      el => dtToDate(el.dt).getDate() === todayDate + 3
    );
    console.log('Day 3 fc:', dayThreeFc);
    console.log('Img 3:', dayThreeFc.map(el => el.weather[0].description));

    const dayFourFc = list.filter(
      el => dtToDate(el.dt).getDate() === todayDate + 4
    );
    console.log('Day 4 fc:', dayFourFc);
    console.log('Img 4:', dayOneFc.map(el => el.weather[0].description));

    const dayFiveFc = list.filter(
      el => dtToDate(el.dt).getDate() === todayDate + 5
    );
    console.log('Day 5 fc:', dayFiveFc);
    console.log('Img 5:', dayFiveFc.map(el => el.weather[0].main));

    // today
    fillFcDayElements(
      todayFc,
      null,
      todayWeatherImg,
      todayMinTempPar,
      todayMaxTempPar
    );

    fillFcDayElements(
      dayOneFc,
      dayOneNamePar,
      dayOneWeatherImg,
      dayOneMinTempPar,
      dayOneMaxTempPar
    );

    fillFcDayElements(
      dayTwoFc,
      dayTwoNamePar,
      dayTwoWeatherImg,
      dayTwoMinTempPar,
      dayTwoMaxTempPar
    );

    fillFcDayElements(
      dayThreeFc,
      dayThreeNamePar,
      dayThreeWeatherImg,
      dayThreeMinTempPar,
      dayThreeMaxTempPar
    );

    fillFcDayElements(
      dayFourFc,
      dayFourNamePar,
      dayFourWeatherImg,
      dayFourMinTempPar,
      dayFourMaxTempPar
    );

    fillFcDayElements(
      dayFiveFc,
      dayFiveNamePar,
      dayFiveWeatherImg,
      dayFiveMinTempPar,
      dayFiveMaxTempPar
    );

    showElement(fiveDayForecastDiv, 'b-1 br-15 bc-transparent bg-transparent');
  }

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

form.addEventListener('submit', e => displayWeatherData(input.value, e));

currentLocationBtn.addEventListener('click', getCurrentLocation);

// TODO: current location
// TODO: air pollution
// TODO: hour/daily forecast
