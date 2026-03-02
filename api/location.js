import { API_KEY, geolocationUrl } from "../utils/data/constants.js";
import { get } from "./api.js";

/**
 * Generates the url to obtain the location data of a city.
 *
 * @function getGeocoding
 *
 * @param {string} cityName - The city name.
 * @param {string} [countryCode] - The country code.
 * @param {number} [limit] - The limit of results.
 * @param {string} [stateCode] - The state/province code.
 *
 * @returns {Promise<Object>} - The location data for the specified city.
 *
 * @example
 * getGeocoding('London', 'GB', 5, '');
 */
const getGeocoding = async (
  cityName = "",
  countryCode = "",
  limit = 5,
  stateCode = ""
) =>
  await get(
    geolocationUrl,
    `/direct?q=${cityName}${(stateCode || countryCode) && ","}${stateCode}${
      countryCode && ","
    }${countryCode}&limit=${limit}&appid=${API_KEY}`
  );

export { getGeocoding };
