import { baseOpenWeatherUrl } from "../utils/data/constants.js";

/**
 * Makes a request to the specified URL with the given options.
 *
 * @function request
 *
 * @param {string} url - The URL to which the request is sent.
 * @param {object} options - The options for the fetch request (e.g., method, headers).
 *
 * @returns {Promise<Response>} - A promise that resolves to the response of the fetch request.
 *
 * @example
 * const response = await request('https://api.example.com/data', { method: 'GET' });
 */
const request = async (url, options) => {
  try {
    const response = await fetch(url, options);

    const data = await response.json();

    return Array.isArray(data) ? data[0] : data;
  } catch (error) {
    console.log(error);
    throw new Error("Error fetching data");
  }
};

// ------------- HTTP METHODS -------------
/**
 * Makes a GET request to the specified URL.
 *
 * @function get
 *
 * @param {string} resource - The base URL for the specific data type (e.g., geolocation, weather).
 * @param {string} url - The endpoint URL with query parameters.
 *
 * @returns {Promise<Response>} - A promise that resolves to the response of the fetch request.
 *
 * @example
 * const response = await get('/data/2.5', '/weather?lat=51.5074&lon=-0.1278&appid=API_KEY');
 */
const get = (resource, url) =>
  request(`${baseOpenWeatherUrl}${resource}${url}`, { method: "GET" });

export { get };
