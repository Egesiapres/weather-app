import { API_KEY } from '../utils.js';

/**
 * Generate the url to obtain the current weather data of a city
 *
 * @param {string} lat - The city latitude (req)
 * @param {string} lon - The city longitude (req)
 * @param {string} APIkey - The API key (req)
 * @returns {string} - The URL for the API request
 */

export const getCurrentWeather = (lat, lon, APIkey = API_KEY) =>
  `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${APIkey}`;
