import { personalAPIkey } from "../utils.js";

/**
 * Generate the url to obtain the current weather data of a city
 *
 * @param {string} lat - The city latitude (req)
 * @param {string} lon - The city longitude (req)
 * @param {string} APIkey - The API key (req)
 * @returns {array} - The cities that match the params
 */

export const getCurrentWeather = (lat, lon, APIkey = personalAPIkey) =>
  `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${APIkey}`;