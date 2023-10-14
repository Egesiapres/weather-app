import {
  input,
  form,
  searchBtn,
  weatherDataDiv,
  namePar,
  positionDetailsPar,
  weatherMainPar,
  tempDegPar,
  sunrisePar,
  sunsetPar,
  windSpeedPar,
  windDegPar,
  weatherMainImg,
  maxTempPar,
  minTempPar,
  scaleSelect,
} from './elements.js';
import {
  kelvinToScale,
  unixTStoHour,
  meteoDegToDirection,
  getImg,
} from './utils.js';
import fetchData from './fetchData.js';

const clearInput = () => {
  input.value = '';
};

const handleChangeScale = ({ temp, temp_max, temp_min }, value) => {
  tempDegPar.innerHTML = kelvinToScale(temp, value);
  minTempPar.innerHTML = `🥶 Min: ${kelvinToScale(temp_min, value)}`;
  maxTempPar.innerHTML = `🥵 Max: ${kelvinToScale(temp_max, value)}`;
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

  const { name, state, country } = cityData;

  const cityCoordinates = {
    lat: cityData.lat,
    lon: cityData.lon,
  };

  const weatherData = await fetchData(cityCoordinates);
  console.log(weatherData);

  const { main, sys, weather, wind } = weatherData;

  // city main info
  namePar.innerHTML = `📍 ${name}`;
  positionDetailsPar.innerHTML = `${state}${country ? `, (${country})` : ''}`;
  weatherMainPar.innerHTML = weather[0].main;

  tempDegPar.innerHTML = kelvinToScale(main.temp, 'celsius');
  minTempPar.innerHTML = `🥶 Min: ${kelvinToScale(main.temp_min, 'celsius')}`;
  maxTempPar.innerHTML = `🥵 Max: ${kelvinToScale(main.temp_max, 'celsius')}`;

  scaleSelect.addEventListener('change', e =>
    handleChangeScale(main, e.target.value)
  );

  weatherMainImg.setAttribute('src', getImg(weather[0].icon));

  // city secondary info
  sunrisePar.innerHTML = `🌅 Sunrise: ${unixTStoHour(sys.sunrise)}`;
  sunsetPar.innerHTML = `🌄 Sunset: ${unixTStoHour(sys.sunset)}`;
  windSpeedPar.innerHTML = `🏎️ Speed: ${wind.speed} km/h`;
  windDegPar.innerHTML = `🧭 Direction: ${meteoDegToDirection(wind.deg)}`;
};

displayWeatherData();

searchBtn.addEventListener('click', () => displayWeatherData(input.value));

form.addEventListener('submit', e => displayWeatherData(input.value, e));

// TODO: UI design with CSS
// TODO: retrieve img
