// elements
const input = document.querySelector('input');
const searchBtn = document.querySelector('#search-btn');
const weatherDataDiv = document.querySelector('#weather-data-div');

// variables
const personalAPIkey = 'd84df6a5359d1ca50cf0749743171b50';
const defaultCityName = 'Brescia';

const setLocationUrl = (
  cityName = defaultCityName,
  stateCode = '',
  countryCode = '',
  limit = '',
  APIkey = personalAPIkey
) =>
  `http://api.openweathermap.org/geo/1.0/direct?q=${cityName},${stateCode},${countryCode}&limit=${limit}&appid=${APIkey}`;

const setCurrentWeatherUrl = (lat, lon, APIkey = personalAPIkey) =>
  `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${APIkey}`;

// f that retrieves the data
const fetchData = async location => {
  try {
    let url;
    const options = {
      method: 'GET',
    };
    let response;
    let data;

    if (!location || typeof location === 'string') {
      url = setLocationUrl(location);
    } else if (typeof location === 'object') {
      url = setCurrentWeatherUrl(location.lat, location.lon);
    }

    response = await fetch(url, options);
    data = await response.json();    

    return data[0] || data;
  } catch (error) {
    console.error(error);
  }
};

const resetInput = () => {
  input.value = '';
};

// f that displays the data retrieved
const displayWeatherData = async location => {
  let cityData;

  if (location) {
    const data = await fetchData(location);

    cityData = data;

    resetInput();
  } else {
    const data = await fetchData();
    cityData = data;
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
  weatherP.innerHTML = `${weatherData.weather[0].description}`

  weatherDataDiv.appendChild(weatherP);

  // TODO city data display
};

displayWeatherData();

searchBtn.addEventListener('click', () => displayWeatherData(input.value));
