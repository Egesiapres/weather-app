import { get, geolocationUrl, API_KEY } from './api.js';

/**
 * Generate the url to obtain the location data of a city
 *
 * @param {string} cityName - The city name (req)
 * @param {string} countryCode - The country code (opt)
 * @param {string} limit - The limit of results (opt)
 * @param {string} stateCode - The state/province code (opt)
 * @param {string} APIkey - The API key (req)
 * @returns {string} - The URL for the API request
 */

export const getGeocoding = (
  cityName = 'milan',
  countryCode = '',
  limit = '5',
  stateCode = '',
  APIkey = API_KEY
) =>
  get(
    geolocationUrl,
    `/direct?q=${cityName}${(stateCode || countryCode) && ','}${stateCode}${
      countryCode && ','
    }${countryCode}&limit=${limit}&appid=${APIkey}`
  );
