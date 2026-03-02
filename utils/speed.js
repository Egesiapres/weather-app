/**
 * Converts speed from meters per second (m/s) to kilometers per hour (km/h).
 *
 * @function msToKmh
 *
 * @param {number} speed - The speed in meters per second.
 * @param {number} [decimals=0] - The number of decimal places to round the result to.
 *
 * @returns {string} The speed in kilometers per hour, rounded to the specified number of decimal places.
 *
 * @example
 * msToKmh(10); // returns "36"
 * msToKmh(10, 2); // returns "36.00"
 */
const msToKmh = (speed, decimals = 0) => (speed * 3.6).toFixed(decimals);

export { msToKmh };
