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
  currentDatePar,
  errorValuePar,
  errorDiv,
  weatherMainImgDiv,
  humidityDiv,
  sunWindDiv,
  otherInfoDiv,
  pressureDiv,
  visibilityDiv,
  tempDiv,
} from './elements.js';
import {
  kelvinToScale,
  changeScale,
  msToKmh,
  meteoDegToDirection,
  getCustomWeatherIcon,
  getBftIcon,
  hideElement,
  showElement,
  formatInputValue,
  getCurrentLocation,
  displayFcDayElements,
  getLhTemps,
  getDateValues,
  displayCurrentDate,
  tsToLocalDateFromOffset,
  addZero,
  setCurrentLocationBtn,
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

  let cityData,
    coordParams,
    fiveDayForecast,
    weatherData,
    pollutionData,
    convertionTemps;

  // no location inputted
  if (!location) {
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

    if (!cityData.lat || !cityData.lon) {
      // error: no cityData
      // stop fetch
      cityData = null;

      hideElement(primaryDiv);
      hideElement(secondaryDiv);

      errorValuePar.innerHTML = `"${input.value}"`;
      errorDiv.removeAttribute('class');
    }

    clearInput();
  }

  // div unhided after its population
  if (cityData) {
    hideElement(errorDiv);

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
    const { dt, timezone, main, sys, visibility, weather, wind } = weatherData;

    const localDate = tsToLocalDateFromOffset(dt, timezone);

    // display current time values
    const { monthName: currentMonthName, date: currentDate } =
      getDateValues(localDate);

    // console.log(
    //   'Month:',
    //   currentMonthName,
    //   'Date:',
    //   currentDate,
    //   // 'Hours:',
    //   // currentHours,
    //   // 'Minutes:',
    //   // currentMinutes
    // );

    displayCurrentDate(currentMonthName, currentDate);

    weatherMainPar.innerHTML = weather[0].main;

    tempPar.innerHTML = kelvinToScale(main.temp, 'celsius');

    perceivedTempPar.innerHTML = `Feels like: ${kelvinToScale(
      main.feels_like,
      'celsius'
    )}`;

    minTempPar.innerHTML = `Min: ${kelvinToScale(main.temp_min, 'celsius')}`;

    maxTempPar.innerHTML = `Max: ${kelvinToScale(main.temp_max, 'celsius')}`;

    convertionTemps = { main: main };

    weatherMainImg.setAttribute('src', getCustomWeatherIcon(weather[0].main));

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

    const localSunriseDate = tsToLocalDateFromOffset(sys.sunrise, timezone);

    const localSunsetDate = tsToLocalDateFromOffset(sys.sunset, timezone);

    const { hours: sunriseHours, minutes: sunriseMinutes } =
      getDateValues(localSunriseDate);

    const { hours: sunsetHours, minutes: sunsetMinutes } =
      getDateValues(localSunsetDate);

    sunrisePar.innerHTML = `Sunrise: ${addZero(sunriseHours)}:${addZero(
      sunriseMinutes
    )}`;
    sunsetPar.innerHTML = `Sunset: ${addZero(sunsetHours)}:${addZero(
      sunsetMinutes
    )}`;

    humidityPar.innerHTML = `${main.humidity}%`;
    pressurePar.innerHTML = `${main.pressure} hPa`;
    visibilityPar.innerHTML = `${(visibility / 1000).toFixed(0)} km`;

    showElement(currentDatePar, 'm-5 text-center');
    showElement(weatherMainImgDiv, 'container x-center');
    showElement(weatherMainPar, 'm-0 text-center text-medium');

    showElement(tempDiv, 'b-1 br-10 bc-transparent bg-transparent');

    showElement(sunWindDiv, 'container cg-15 b-25');

    showElement(
      [humidityDiv, pressureDiv, visibilityDiv],
      'container col-direction b-1 br-10 bc-transparent box-small bg-transparent'
    );

    showElement(otherInfoDiv, 'container cg-15 b-25');

    secondaryDiv.removeAttribute('class');
  }

  if (fiveDayForecast) {
    const { list, city } = fiveDayForecast;

    const { date: currentDate } = getDateValues();

    const dayOneFc = list.filter(
      el =>
        tsToLocalDateFromOffset(el.dt, city.timezone).getDate() ===
        currentDate + 1
    );

    const dayTwoFc = list.filter(
      el =>
        tsToLocalDateFromOffset(el.dt, city.timezone).getDate() ===
        currentDate + 2
    );

    const dayThreeFc = list.filter(
      el =>
        tsToLocalDateFromOffset(el.dt, city.timezone).getDate() ===
        currentDate + 3
    );

    const dayFourFc = list.filter(
      el =>
        tsToLocalDateFromOffset(el.dt, city.timezone).getDate() ===
        currentDate + 4
    );

    const dayFiveFc = list.filter(
      el =>
        tsToLocalDateFromOffset(el.dt, city.timezone).getDate() ===
        currentDate + 5
    );

    // console.log(
    //   'Day 1:',
    //   dayOneFc,
    //   'Day 2:',
    //   dayTwoFc,
    //   'Day 3:',
    //   dayThreeFc,
    //   'Day 4:',
    //   dayFourFc,
    //   'Day 5:',
    //   dayFiveFc
    // );

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
      city.timezone,
      null,
      dayOneDatePar,
      dayOneWeatherImg,
      dayOneLhTempsPar
    );

    displayFcDayElements(
      dayTwoFc,
      city.timezone,
      dayTwoNamePar,
      dayTwoDatePar,
      dayTwoWeatherImg,
      dayTwoLhTempsPar
    );

    displayFcDayElements(
      dayThreeFc,
      city.timezone,
      dayThreeNamePar,
      dayThreeDatePar,
      dayThreeWeatherImg,
      dayThreeLhTempsPar
    );

    displayFcDayElements(
      dayFourFc,
      city.timezone,
      dayFourNamePar,
      dayFourDatePar,
      dayFourWeatherImg,
      dayFourLhTempsPar
    );

    displayFcDayElements(
      dayFiveFc,
      city.timezone,
      dayFiveNamePar,
      dayFiveDatePar,
      dayFiveWeatherImg,
      dayFiveLhTempsPar
    );

    // show data unhiding elements
    showElement(fiveDayForecastDiv, 'b-1 br-10 bc-transparent bg-transparent');

    secondaryDiv.removeAttribute('class');
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
      'container col-direction b-1 br-10 bc-transparent box-small bg-transparent'
    );

    showElement(otherInfoDiv, 'container cg-15 b-25');

    secondaryDiv.removeAttribute('class');
  }
};

displayWeatherData();

form.addEventListener('submit', e => {
  displayWeatherData(input.value, e);
  setCurrentLocationBtn('inactive');
});

currentLocationBtn.addEventListener('click', () => {
  getCurrentLocation();
  setCurrentLocationBtn('active');
});

// in future
// TODO: hour forecast
// TODO: modals containing scales info (beaufort, air pollution params...)
