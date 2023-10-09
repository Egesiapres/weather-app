import { input, form, searchBtn, weatherDataDiv } from './elements.js';
import fetchData from './data.js';

const clearInput = () => {
  input.value = '';
};

const clearWeatherDataDiv = () => {
  weatherDataDiv.innerHTML = '';
};

// f that generates a new custom element
const setNewElement = (element, classes, innerHTML, id) => {
  const newElement = document.createElement(element);
  newElement.setAttribute('class', classes);
  newElement.innerHTML = innerHTML;

  if (id) {
    newElement.setAttribute('id', id);
  }

  return newElement;
};

// f that capitalizes the first letter
const capitalizeFirstLetter = word => {
  return `${word.charAt(0).toUpperCase()}${word.slice(1)}`;
};

// f that displays the data retrieved
const displayWeatherData = async location => {
  let cityData;

  if (location) {
    cityData = await fetchData(location);

    clearInput();
  } else {
    cityData = await fetchData();
  }

  const cityCoordinates = {
    lat: cityData.lat,
    lon: cityData.lon,
  };

  const weatherData = await fetchData(cityCoordinates);
  console.log(weatherData);

  // if (weatherData?.weather[0]?.icon){

  //   console.log(weatherData.weather[0].icon);
  // }

  // clear the weather data of the previous city
  clearWeatherDataDiv();

  // city data display
  const cityHead = setNewElement('h4', 'container x-centering', 'Location');

  const cityPar = setNewElement(
    'p',
    'container x-centering',
    `${cityData.name}, ${cityData.state ? `${cityData.state},` : ''}  (${
      cityData.country
    })`
  );

  weatherDataDiv.appendChild(cityHead);
  
  weatherDataDiv.appendChild(cityPar);

  // weather data display
  const weatherHead = setNewElement('h4', 'container x-centering', 'Weather');

  const weatherMainPar = setNewElement(
    'p',
    'container x-centering',
    weatherData.weather[0].main
  );

  const weatherDescriptionPar = setNewElement(
    'p',
    'description container x-centering',
    capitalizeFirstLetter(weatherData.weather[0].description),
  );

  weatherDataDiv.appendChild(weatherHead);

  weatherDataDiv.appendChild(weatherMainPar);
  weatherDataDiv.appendChild(weatherDescriptionPar);
  // TODO city data display
};

displayWeatherData();

searchBtn.addEventListener('click', () => displayWeatherData(input.value));

// TODO: gestire il submit del form
// TODO: UI design with CSS
// TODO: retrieve img
