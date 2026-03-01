/**
 * Adds a leading zero to a number if it is less than 10.
 *
 * @function addZero
 *
 * @param {number} number - The number to be zero-padded.
 *
 * @returns {string} The zero-padded number as a string.
 *
 * @example
 * addZero(5); // returns "05"
 */
const addZero = number => (number < 10 ? `0${number}` : number);

/**
 * Converts a timestamp to a local date based on the provided offset.
 *
 * @function tsToLocalDateFromOffset
 *
 * @param {number} timestamp - The Unix timestamp (in seconds) to be converted.
 * @param {number} offset - The offset in seconds to be added to the timestamp.
 *
 * @returns {Date} The local date object.
 *
 * @example
 * const localDate = tsToLocalDateFromOffset(1625097600, -14400);
 */
const tsToLocalDateFromOffset = (timestamp, offset) =>
  new Date(timestamp * 1000 + offset * 1000);

/**
 * Extracts date values from a given date object, including the date, month name, hours, minutes, and seconds.
 *
 * @function getDateValues
 *
 * @param {Date} inputDate - The date object from which to extract values.
 *
 * @returns {{date: number, monthName: string, hours: number, minutes: number, seconds: number}} An object containing the extracted date values.
 *
 * @example
 * const dateValues = getDateValues(new Date());
 * console.log(dateValues);
 * Output: { date: 15, monthName: "Jun", hours: 14, minutes: 30, seconds: 45 }
 */
const getDateValues = (inputDate = new Date()) => {
  const date = inputDate.getUTCDate();
  const monthName = inputDate.toLocaleString("en-US", { month: "short" });
  const hours = inputDate.getUTCHours();
  const minutes = inputDate.getUTCMinutes();
  const seconds = inputDate.getUTCSeconds();

  return {
    date,
    monthName,
    hours,
    minutes,
    seconds,
  };
};

export { addZero, getDateValues, tsToLocalDateFromOffset };
