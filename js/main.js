import { input, searchBtn, weatherDataDiv } from './elements.js';
import fetchData from './data.js';

const resetInput = () => {
  input.value = '';
};

// f that displays the data retrieved
const displayWeatherData = async location => {
  let cityData;

  if (location) {
    cityData = await fetchData(location);

    resetInput();
  } else {
    cityData = await fetchData();
  }

  const cityCoordinates = {
    lat: cityData.lat,
    lon: cityData.lon,
  };

  const weatherData = await fetchData(cityCoordinates);
  console.log(weatherData);

  // city data display
  const cityP = document.createElement('p');
  cityP.setAttribute('class', 'container x-centering');
  cityP.innerHTML = `Location: ${cityData.name}, ${
    cityData.state ? `${cityData.state},` : ''
  }  (${cityData.country})`;

  weatherDataDiv.appendChild(cityP);

  // weather data display
  const weatherP = document.createElement('p');
  weatherP.setAttribute('class', 'container x-centering');
  weatherP.innerHTML = `${weatherData.weather[0].description}`;

  weatherDataDiv.appendChild(weatherP);

  // TODO city data display
};

displayWeatherData();

searchBtn.addEventListener('click', () => displayWeatherData(input.value));
