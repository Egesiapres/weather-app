import { get, dataUrl, API_KEY } from './api.js';

/**
 * Generate the url to obtain the current weather/dive days forecast data of a city
 *
 * @param {string} lat - The city latitude (req)
 * @param {string} lon - The city longitude (req)
 * @param {string} APIkey - The API key (req)
 * @returns {string} - The URL for the API request
 */

// TODO: check async
export const getCurrentWeather = (lat, lon, APIkey = API_KEY) =>
  get(dataUrl, `/weather?lat=${lat}&lon=${lon}&appid=${APIkey}`);

export const getFiveDayForecast = async (lat, lon, APIkey = API_KEY) => {
  return get(dataUrl, `/forecast?lat=${lat}&lon=${lon}&appid=${APIkey}`);
};
