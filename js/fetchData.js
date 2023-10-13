import { getGeocoding } from './api/location.js';
import { getCurrentWeather } from './api/weather.js';

const options = {
  method: 'GET',
};

export default async function fetchData(location) {
  try {
    let url;
    let response;
    let data;

    if (!location || typeof location === 'string') {
      url = getGeocoding(location);
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
