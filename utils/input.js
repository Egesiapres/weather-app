/**
 * Formats the input location string by converting it to lowercase, trimming whitespace, and splitting it into components based on commas.
 * This function is useful for standardizing user input for location queries.
 *
 * @function queryToArr
 *
 * @param {string} query - The input query string to be formatted.
 *
 * @returns {Array<string>} An array containing the formatted location components.
 *
 * @example
 * queryToArr("  New York, USA  "); // returns ["new york", "usa"]
 * queryToArr("London"); // returns ["london"]
 */
const queryToArr = query => {
  const _query = query.toLowerCase().trim();

  let queryArr = _query.split(/\s*,\s*/);
  queryArr = queryArr.map(el => el.trim());

  return queryArr;
};

export { queryToArr };
