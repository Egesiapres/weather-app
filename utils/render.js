import { kelvinToScale } from "./scale.js";
import { getMinMaxTemperatures } from "./temperature.js";

/**
 * Renders the min and max temperatures for a given day forecast.
 *
 * @function renderLowHighTemperatures
 *
 * @param {Array<{main: {temp: number}}>} dayFc - The forecasted day's data, which can be an array of hourly forecasts or an object containing minTemp and maxTemp properties.
 * @param {HTMLElement} lhTempsId - The DOM element where the low and high temperatures will be displayed.
 * @param {"celsius"|"fahrenheit"|"kelvin"} scale - The temperature scale to be used for conversion ("celsius", "fahrenheit", or "kelvin").
 *
 * @returns {void}
 *
 * @example
 * renderLowHighTemperatures(dayForecast, document.getElementById("lh-temps"), "celsius");
 */
const renderLowHighTemperatures = (dayFc, lhTempsId, scale) => {
  let lowTemp, highTemp;

  if (dayFc && dayFc.length > 0) {
    const { minTemp, maxTemp } = getMinMaxTemperatures(dayFc);
    lowTemp = minTemp;
    highTemp = maxTemp;
  } else {
    const { minTemp, maxTemp } = dayFc;
    lowTemp = minTemp;
    highTemp = maxTemp;
  }

  lhTempsId.innerHTML = `${kelvinToScale(
    lowTemp,
    scale,
    null,
    false
  )}/${kelvinToScale(highTemp, scale)}`;
};

export { renderLowHighTemperatures };
