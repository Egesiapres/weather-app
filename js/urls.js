const personalAPIkey = 'd84df6a5359d1ca50cf0749743171b50';
const defaultCityName = 'Brescia';

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

export const setLocationUrl = (
  cityName = defaultCityName,
  stateCode = '',
  countryCode = '',
  limit = '',
  APIkey = personalAPIkey
) =>
  `http://api.openweathermap.org/geo/1.0/direct?q=${cityName},${stateCode},${countryCode}&limit=${limit}&appid=${APIkey}`;

/**
 * Generate the url to obtain the current weather data of a city
 * 
 * @param {string} lat - The city latitude (req)
 * @param {string} lon - The city longitude (req)
 * @param {string} APIkey - The API key (req)
 * @returns {array} - The cities that match the params
 */

export const setCurrentWeatherUrl = (lat, lon, APIkey = personalAPIkey) =>
  `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${APIkey}`;
