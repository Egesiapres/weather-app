/**
 * Extracts the minimum and maximum temperatures from a forecasted day's data.
 *
 * @function getMinMaxTemperatures
 *
 * @param {Array<{main: {temp: number}}>} dayForecast - The forecasted day's data.
 *
 * @returns {{minTemp: number, maxTemp: number}} An object containing the minimum and maximum temperatures.
 *
 * @example
 * const minMaxTemps = getMinMaxTemperatures(dayFc);
 * console.log(minMaxTemps); // { minTemp: 280.15, maxTemp: 295.15 }
 */
const getMinMaxTemperatures = dayForecast => {
  const allHoursTemps = dayForecast.map(el => el.main.temp).sort();

  const minTemp = allHoursTemps[0];
  const maxTemp = allHoursTemps[allHoursTemps.length - 1];

  return { minTemp, maxTemp };
};

export { getMinMaxTemperatures };
