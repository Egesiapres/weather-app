import { elements } from "./data/elements.js";
import { renderLowHighTemperatures } from "./render.js";

/**
 * Converts a temperature from Kelvin to the specified scale (Celsius, Fahrenheit, or Kelvin) and formats the output with optional decimals and scale symbol.
 *
 * @function kelvinToScale
 *
 * @param {number} temperature - The temperature in Kelvin to be converted.
 * @param {"celsius" | "fahrenheit" | "kelvin"} scale - The target scale for conversion ("celsius", "fahrenheit", or "kelvin").
 * @param {number} decimals - The number of decimal places to include in the output (default is 0).
 * @param {boolean} showScale - If true, appends the scale symbol to the output (default is true).
 *
 * @returns {string} The converted temperature as a string, formatted according to the specified scale and options.
 *
 * @example
 * kelvinToScale(300, "celsius"); // returns "27°C"
 * kelvinToScale(300, "fahrenheit", 1); // returns "80.3°F"
 * kelvinToScale(300, "kelvin", 2, false); // returns "300.00"
 */
const kelvinToScale = (temperature, scale, decimals = 0, showScale = true) => {
  if (scale === "celsius") {
    return `${(temperature - 273.15).toFixed(decimals)}${
      showScale ? "°C" : ""
    }`;
  }

  if (scale === "fahrenheit") {
    return `${(((temperature - 273.15) * 9) / 5 + 32).toFixed(decimals)}${
      showScale ? "°F" : ""
    }`;
  }

  if (scale === "kelvin") {
    return `${temperature.toFixed(decimals)}${showScale ? " K" : ""}`;
  }
};

/**
 * Changes the temperature scale for the displayed weather data, including the current temperature and the forecasted temperatures for the next five days.
 *
 * @function changeScale
 *
 * @param {Object} param0 - The weather data object containing main and forecast data.
 * @param {number} value - The target temperature scale ("celsius", "fahrenheit", or "kelvin").
 *
 * @returns {void}
 *
 * @example
 * changeScale(weatherData, "celsius");
 */
const changeScale = (
  { main, dayOneLh, dayTwoLh, dayThreeLh, dayFourLh, dayFiveLh },
  value
) => {
  elements.secondary.temperature.current.innerHTML = kelvinToScale(
    main.temp,
    value
  );
  elements.secondary.temperature.perceived.innerHTML = `Feels like: ${kelvinToScale(
    main.feels_like,
    value
  )}`;
  elements.secondary.temperature.min.innerHTML = `Min: ${kelvinToScale(main.temp_min, value)}`;
  elements.secondary.temperature.max.innerHTML = `Max: ${kelvinToScale(main.temp_max, value)}`;

  // Updates the forecasted temperatures for the next five days
  renderLowHighTemperatures(dayOneLh, elements.forecast.dayOne.temps, value);
  renderLowHighTemperatures(dayTwoLh, elements.forecast.dayTwo.temps, value);
  renderLowHighTemperatures(
    dayThreeLh,
    elements.forecast.dayThree.temps,
    value
  );
  renderLowHighTemperatures(dayFourLh, elements.forecast.dayFour.temps, value);
  renderLowHighTemperatures(dayFiveLh, elements.forecast.dayFive.temps, value);
};

export { changeScale, kelvinToScale };
