import { personalAPIkey } from "../utils.js";

/**
 * Generate the url to obtain the location data of a city
 *
 * @param {string} cityName - The city name (req)
 * @param {string} stateCode - The state/province code (opt)
 * @param {string} countryCode - The country code (opt)
 * @param {string} limit - The limit of results (opt)
 * @param {string} APIkey - The API key (req)
 * @returns {string} - The URL for the API request
 */

// TODO: improve params input managing
export const getGeocoding = (
  cityName = 'Barcelona',
  stateCode = '',
  countryCode = '',
  limit = '',
  APIkey = personalAPIkey
) =>
  `https://api.openweathermap.org/geo/1.0/direct?q=${cityName},${stateCode},${countryCode}&limit=${limit}&appid=${APIkey}`;