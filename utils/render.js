import { elements } from "./data/elements.js";
import { addLeadingZero, tsToLocalDateFromOffset } from "./dates.js";
import { resolveWeatherIcon } from "./icons.js";
import { kelvinToScale } from "./scale.js";
import { getMinMaxTemperatures } from "./temperature.js";

/**
 * Renders the min and max temperatures for a given day forecast.
 *
 * @function renderLowHighTemperatures
 *
 * @param {Array<{main: {temp: number}}>} dayFc - The forecasted day's data, which can be an array of hourly forecasts or an object containing minTemp and maxTemp properties.
 * @param {HTMLElement} lhTempsId - The DOM element where the low and high temperatures will be displayed.
 * @param {"celsius" | "fahrenheit" | "kelvin"} scale - The temperature scale to be used for conversion ("celsius", "fahrenheit", or "kelvin").
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

/**
 * Renders the forecasted day's elements, including the day name, date, weather icon, and low/high temperatures.
 *
 * @function renderForecastDays
 *
 * @param {Array<{dt: number, weather: Array<{main: string}>, main: {temp: number}}>} dayFc - The forecasted day's data, which can be an array of hourly forecasts or an object containing minTemp and maxTemp properties.
 * @param {number} offset - The timezone offset in seconds for converting timestamps to local dates.
 * @param {HTMLElement|null} nameId - The DOM element where the day name will be displayed (optional).
 * @param {HTMLElement} dateId - The DOM element where the date will be displayed.
 * @param {HTMLElement} imgId - The DOM element where the weather icon will be displayed.
 * @param {HTMLElement} lhTempsId - The DOM element where the low and high temperatures will be displayed.
 *
 * @returns {void}
 *
 * @example
 * renderForecastDays(dayForecast, cityTimezoneOffset, document.getElementById("day-name"), document.getElementById("date"), document.getElementById("weather-icon"), document.getElementById("lh-temps"));
 */
const renderForecastDays = (
  dayFc,
  offset,
  nameId = null,
  dateId,
  imgId,
  lhTempsId
) => {
  // day 1 is just 'Tomorrow'
  if (nameId) {
    const dayName = tsToLocalDateFromOffset(dayFc[0].dt, offset).toLocaleString(
      "en-US",
      {
        weekday: "short",
      }
    );

    nameId.innerHTML = dayName;
  }

  dateId.innerHTML = `${tsToLocalDateFromOffset(
    dayFc[0].dt,
    offset
  ).toLocaleString("en-US", {
    month: "short",
  })} ${tsToLocalDateFromOffset(dayFc[0].dt, offset).getDate()} `;

  imgId.setAttribute("src", resolveWeatherIcon(dayFc[2].weather[0].main));

  renderLowHighTemperatures(dayFc, lhTempsId, "celsius");
};

/**
 * Renders the current date in the specified format and updates the corresponding DOM element.
 *
 * @function renderCurrentDate
 *
 * @param {string} monthName - The name of the current month.
 * @param {number} date - The current date.
 * @param {number | null} hours - The current hours (optional).
 * @param {number | null} minutes - The current minutes (optional).
 * @param {number | null} seconds - The current seconds (optional).
 *
 * @returns {void}
 *
 * @example
 * renderCurrentDate("June", 15, 14, 30, 45);
 * This will update the current date element to display: "June 15, 14:30:45"
 */
const renderCurrentDate = (monthName, date, hours, minutes, seconds) => {
  elements.currentDatePar.innerHTML = `${monthName} ${date}${
    hours && minutes
      ? `, ${addLeadingZero(hours)}:${addLeadingZero(minutes)}${
          seconds ? `: ${addLeadingZero(seconds)}` : ""
        }`
      : ""
  }`;
};

export { renderCurrentDate, renderForecastDays, renderLowHighTemperatures };
