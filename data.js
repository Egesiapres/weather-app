import { setLocationUrl, setCurrentWeatherUrl } from './urls.js';

export default async function fetchData(location) {
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
}
