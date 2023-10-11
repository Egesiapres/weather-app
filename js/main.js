import { input, form, searchBtn, weatherDataDiv } from './elements.js';
import {
  setNewElement,
  capitalizeFirstLetter,
  kelvinToCelsius,
  unixTStoHour,
} from './utils.js';
import fetchData from './fetchData.js';

const clearInput = () => {
  input.value = '';
};

const clearWeatherDataDiv = () => {
  weatherDataDiv.innerHTML = '';
};

// f that displays the data retrieved
const displayWeatherData = async (location, event) => {
  // avoid the automatic submitting of the form
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

  const { name, state, country } = cityData;

  const cityCoordinates = {
    lat: cityData.lat,
    lon: cityData.lon,
  };

  const weatherData = await fetchData(cityCoordinates);
  console.log(weatherData);

  const { main, sys, weather, wind } = weatherData;

  // if (weatherData?.weather[0]?.icon){

  //   console.log(weatherData.weather[0].icon);
  // }

  // clear the weather data of the previous city
  clearWeatherDataDiv();

  // city data display
  const mainInfoDiv = setNewElement('div', 'container col-direction ym-20');

  const namePar = setNewElement('h3', 'container x-center', name);

  const positionDetailsPar = setNewElement(
    'p',
    'container x-center small',
    `${state ? `${state}, ` : ''}  (${country})`
  );

  weatherDataDiv.appendChild(mainInfoDiv);

  mainInfoDiv.appendChild(namePar);
  mainInfoDiv.appendChild(positionDetailsPar);

  // weather data display
  // most important data

  const mainTempPar = setNewElement(
    'h3',
    'container x-center big',
    kelvinToCelsius(main.temp)
  );

  const weatherMainPar = setNewElement(
    'p',
    'container x-center medium',
    weather[0].main
  );

  // const weatherDescriptionPar = setNewElement(
  //   'p',
  //   'description container x-center',
  //   capitalizeFirstLetter(weather[0].description)
  // );

  mainInfoDiv.appendChild(mainTempPar);
  mainInfoDiv.appendChild(weatherMainPar);
  // weatherDiv.appendChild(weatherDescriptionPar);

  const secondaryInfoDiv = setNewElement(
    'div',
    'container justify-between b-25'
  );

  const sysDiv = setNewElement('div', 'container flex col-direction br-15');

  const sysSunrisePar = setNewElement(
    'p',
    'container x-center',
    `Sunrise: ${unixTStoHour(sys.sunrise)}`
  );

  const sysSunsetPar = setNewElement(
    'p',
    'container x-center',
    `Sunset: ${unixTStoHour(sys.sunset)}`
  );

  const windDiv = setNewElement('div', 'container flex col-direction br-15');

  const windSpeedPar = setNewElement(
    'p',
    'container x-center',
    `Speed: ${wind.speed} km/h`
  );

  const windDegPar = setNewElement(
    'p',
    'container x-center',
    `Degrees: ${wind.deg}`
  );

  sysDiv.appendChild(sysSunrisePar);
  sysDiv.appendChild(sysSunsetPar);

  windDiv.appendChild(windSpeedPar);
  windDiv.appendChild(windDegPar);

  secondaryInfoDiv.appendChild(sysDiv);
  secondaryInfoDiv.appendChild(windDiv);
  weatherDataDiv.appendChild(secondaryInfoDiv);
};

displayWeatherData();

searchBtn.addEventListener('click', () => displayWeatherData(input.value));

form.addEventListener('submit', e => displayWeatherData(input.value, e));

// TODO: UI design with CSS
// TODO: retrieve img
