import { API_KEY, dataUrl } from "../utils/data/constants.js";
import { get } from "./api.js";

/**
 * Generates the URL to obtain the current weather/dive days forecast data of a city.
 *
 * @function getCurrentWeather
 *
 * @param {string} latitude - The city latitude.
 * @param {string} longitude - The city longitude.
 *
 * @returns {string} - The URL for the API request.
 *
 * @example
 * getCurrentWeather(51.5074, -0.1278);
 */
const getCurrentWeather = (latitude, longitude) =>
  get(dataUrl, `/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}`);

/**
 * Generates the URL to obtain the 5 day/3 hour forecast data of a city.
 *
 * @function getFiveDayForecast
 *
 * @param {string} latitude - The city latitude.
 * @param {string} longitude - The city longitude.
 * @returns {string} - The URL for the API request.
 *
 * @example
 * getFiveDayForecast(51.5074, -0.1278);
 */
const getFiveDayForecast = async (latitude, longitude) =>
  get(dataUrl, `/forecast?lat=${latitude}&lon=${longitude}&appid=${API_KEY}`);

export { getCurrentWeather, getFiveDayForecast };
