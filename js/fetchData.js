import { getGeocoding } from './api/location.js';
import { getCurrentWeather } from './api/weather.js';

const options = {
  method: 'GET',
};

export default async function fetchData(location) {
  let cityName;
  let countryCode;
  let limit;
  let stateCode;

  if (location && location.length > 0) {
    cityName = location[0];
    countryCode = location[1];
    limit = location[2];
    stateCode = location[3];
  }

  console.log(
    'cityName',
    cityName,
    'countryCode',
    countryCode,
    'limit',
    limit,
    'stateCode',
    stateCode
  );

  try {
    let url;
    let response;
    let data;

    if (!location || (location && location.length > 0)) {
      url = getGeocoding(cityName, countryCode, limit, stateCode);
    } else if (typeof location === 'object') {
      url = getCurrentWeather(location.lat, location.lon);
    }

    response = await fetch(url, options);
    data = await response.json();

    return data[0] || data;
  } catch (error) {
    console.error(error);
  }
}
