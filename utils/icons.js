import { beaufortScaleMapping } from "./data/scales.js";

/**
 * Resolves the correct icon to be used for the current weather condition.
 *
 * @function resolveWeatherIcon
 *
 * @param {string} weather - The weather condition (e.g., "Clear", "Clouds", etc.).
 *
 * @returns {string} The URL of the corresponding weather icon.
 *
 * @example
 * const iconUrl = resolveWeatherIcon("Rain");
 * console.log(iconUrl); // "assets/icons/rain.svg"
 */
const resolveWeatherIcon = weather => {
  let icon;

  switch (weather) {
    case "Clear":
      icon = "assets/icons/clear-day.svg";
      break;

    case "Clouds":
      icon = "assets/icons/cloudy.svg";
      break;

    case "Fog":
      icon = "assets/icons/fog.svg";
      break;

    case "Mist":
      icon = "assets/icons/mist.svg";
      break;

    case "Drizzle":
      icon = "assets/icons/drizzle.svg";
      break;

    case "Rain":
      icon = "assets/icons/rain.svg";
      break;

    case "Snow":
      icon = "assets/icons/snow.svg";
      break;
  }

  return icon;
};

/**
 * Resolves the correct Beaufort scale icon based on the given wind speed.
 *
 * @function resolveBeaufortIcon
 *
 * @param {number} windSpeed - The wind speed in km/h.
 *
 * @returns {string} The URL of the corresponding Beaufort scale icon.
 *
 * @example
 * const bftIconUrl = resolveBftIcon(15);
 * console.log(bftIconUrl); // "assets/icons/wind-beaufort-3.svg"
 */
const resolveBeaufortIcon = windSpeed => {
  let beaufortIcon;

  beaufortScaleMapping.forEach(el => {
    if (windSpeed >= el?.interval[0] && windSpeed < el?.interval[1]) {
      beaufortIcon = el.icon;
    }

    if (windSpeed < 1) {
      beaufortIcon = beaufortScaleMapping[0].icon;
    }

    if (windSpeed >= 118) {
      beaufortIcon = beaufortScaleMapping[12].icon;
    }
  });

  return beaufortIcon;
};

export { resolveBeaufortIcon, resolveWeatherIcon };
