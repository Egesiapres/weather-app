import { API_KEY, dataUrl } from "../../utils/constants.js";
import { get } from "./api.js";

/**
 * Generates the url to obtain the air pollution data of a city.
 *
 * @function getAirPollution
 *
 * @param {string} latitude - The city latitude.
 * @param {string} longitude - The city longitude.
 *
 * @returns {string} - The URL for the API request.
 *
 * @example
 * getAirPollution(51.5074, -0.1278);
 */
const getAirPollution = (latitude, longitude) =>
  get(
    dataUrl,
    `/air_pollution?lat=${latitude}&lon=${longitude}&appid=${API_KEY}`
  );

export { getAirPollution };
