import { getGeocoding } from "../api/location.js";
import { getAirPollution } from "../api/pollution.js";
import { getCurrentWeather, getFiveDayForecast } from "../api/weather.js";
import { elements } from "../utils/data/elements.js";
import {
  addLeadingZero,
  getDateValues,
  tsToLocalDateFromOffset,
} from "../utils/dates.js";
import { meteoDegToDirection } from "../utils/directions.js";
import {
  clearInput,
  hideElement,
  setCurrentLocationBtnStatus,
  setElementClass,
  setElementsClass,
} from "../utils/dom.js";
import { resolveBeaufortIcon, resolveWeatherIcon } from "../utils/icons.js";
import { queryToArr } from "../utils/input.js";
import { renderCurrentDate, renderForecastDays } from "../utils/render.js";
import { changeScale, kelvinToScale } from "../utils/scale.js";
import { msToKmh } from "../utils/speed.js";
import { getMinMaxTemperatures } from "../utils/temperature.js";
import { getCurrentLocation } from "../utils/utils.js";
// TODO: hourly forecast
// TODO: modals containing scales info (beaufort, air pollution params...)
// TODO: enhance containers' show/hide logic just removing "hidden" class and not setting a new class every time

// f that displays the data retrieved
const displayWeatherData = async (location, e) => {
  e?.preventDefault(); // prevent default form submission behavior

  let cityData, fiveDayForecast, weatherData, pollutionData, conversionTemps;

  /**
   * At the first page load, when there's still no location set,
   * they will be retrieved automatically the data of a fallback city
   * to show the app's functionalities and avoid showing an empty page.
   */
  if (!location) {
    cityData = await getGeocoding("barcelona");
  }

  if (location) {
    let locationParams;

    // location manually set by user
    if (typeof location === "string") {
      locationParams = queryToArr(location);

      const cityName = locationParams[0] || "";
      const countryCode = locationParams[1] || "";
      const limit = locationParams[2] || "";
      const stateCode = locationParams[3] || "";

      locationParams = { cityName, countryCode, limit, stateCode };
    } else {
      // location retrieved automatically
      const {
        name: cityName,
        sys: { country: countryCode },
      } = await getCurrentWeather(location.lat, location.lon);

      locationParams = { cityName, countryCode };
    }

    cityData = await getGeocoding(
      locationParams.cityName,
      locationParams.countryCode,
      locationParams.limit,
      locationParams.stateCode
    );

    /**
     * Error Handling:
     * If no city data have been retrieved, show an error message
     * (and hide top and bottom containers with weather data if they were previously shown).
     */
    if (!cityData.lat || !cityData.lon) {
      cityData = null;

      hideElement(elements.top.primaryInfo.container);
      hideElement(elements.bottom.container);

      elements.error.value.innerHTML = `"${elements.top.form.input.value}"`;
      elements.error.container.removeAttribute("class");
    }

    clearInput();
  }

  // If city data have been retrieved, show the weather data related to that city
  if (cityData) {
    hideElement(elements.error.container);

    // API calls
    weatherData = await getCurrentWeather(cityData.lat, cityData.lon);
    fiveDayForecast = await getFiveDayForecast(cityData.lat, cityData.lon);
    pollutionData = await getAirPollution(cityData.lat, cityData.lon);

    const { name, state, country } = cityData;

    elements.top.primaryInfo.name.innerHTML = name;

    elements.top.primaryInfo.position.innerHTML = `${state ? state : ""}${
      state && country ? ", " : ""
    }${country ? `(${country})` : ""}`;

    // Shows Primary Info Container
    elements.top.primaryInfo.container.classList.remove("hidden");
  }

  if (weatherData) {
    const { dt, timezone, main, sys, visibility, weather, wind } = weatherData;

    const localDate = tsToLocalDateFromOffset(dt, timezone);

    const { monthName: currentMonthName, date: currentDate } =
      getDateValues(localDate);

    renderCurrentDate(currentMonthName, currentDate);

    elements.top.primaryInfo.weather.main.innerHTML = weather[0].main;

    elements.bottom.temperature.current.innerHTML = kelvinToScale(
      main.temp,
      "celsius"
    );

    elements.bottom.temperature.perceived.innerHTML = `Feels like: ${kelvinToScale(
      main.feels_like,
      "celsius"
    )}`;

    elements.bottom.temperature.min.innerHTML = `Min: ${kelvinToScale(main.temp_min, "celsius")}`;

    elements.bottom.temperature.max.innerHTML = `Max: ${kelvinToScale(main.temp_max, "celsius")}`;

    conversionTemps = { main };

    elements.top.primaryInfo.weather.img.element.setAttribute(
      "src",
      resolveWeatherIcon(weather[0].main)
    );

    elements.bottom.sunWind.wind.bftIcon.setAttribute(
      "src",
      resolveBeaufortIcon(msToKmh(wind.speed))
    );
    elements.bottom.sunWind.wind.speed.innerHTML = `Wind: ${msToKmh(wind.speed)} km/h`;

    if (wind.gust) {
      setElementClass(
        elements.bottom.sunWind.gust.speedContainer,
        "flex align-center"
      );

      elements.bottom.sunWind.gust.bftIcon.setAttribute(
        "src",
        resolveBeaufortIcon(msToKmh(wind.gust))
      );
      elements.bottom.sunWind.gust.speed.innerHTML = `Gust: ${msToKmh(wind.gust)} km/h`;
    } else {
      hideElement(elements.bottom.sunWind.gust.speedContainer);
    }

    elements.bottom.sunWind.wind.degrees.innerHTML = `Direction: ${meteoDegToDirection(wind.deg)}`;

    const localSunriseDate = tsToLocalDateFromOffset(sys.sunrise, timezone);

    const localSunsetDate = tsToLocalDateFromOffset(sys.sunset, timezone);

    const { hours: sunriseHours, minutes: sunriseMinutes } =
      getDateValues(localSunriseDate);

    const { hours: sunsetHours, minutes: sunsetMinutes } =
      getDateValues(localSunsetDate);

    elements.bottom.sunWind.sun.sunrise.innerHTML = `Sunrise: ${addLeadingZero(sunriseHours)}:${addLeadingZero(
      sunriseMinutes
    )}`;
    elements.bottom.sunWind.sun.sunset.innerHTML = `Sunset: ${addLeadingZero(sunsetHours)}:${addLeadingZero(
      sunsetMinutes
    )}`;

    elements.bottom.otherInfo.humidity.value.innerHTML = `${main.humidity}%`;
    elements.bottom.otherInfo.pressure.value.innerHTML = `${main.pressure} hPa`;
    elements.bottom.otherInfo.visibility.value.innerHTML = `${(visibility / 1000).toFixed(0)} km`;

    setElementClass(elements.top.currentDatePar, "m-5 text-center");
    setElementClass(
      elements.top.primaryInfo.weather.img.container,
      "flex justify-center"
    );
    setElementClass(
      elements.top.primaryInfo.weather.main,
      "m-0 text-center text-medium"
    );

    setElementClass(
      elements.bottom.temperature.container,
      "b-1 br-10 bc-transparent bg-transparent"
    );

    setElementClass(elements.bottom.sunWind.container, "flex cg-15 b-25");

    setElementsClass(
      [
        elements.bottom.otherInfo.humidity.container,
        elements.bottom.otherInfo.pressure.container,
        elements.bottom.otherInfo.visibility.container,
      ],
      "flex col-direction b-1 br-10 bc-transparent box-small bg-transparent"
    );

    setElementClass(elements.bottom.otherInfo.container, "flex cg-15 b-25");

    elements.bottom.container.classList.remove("hidden");
  }

  if (fiveDayForecast) {
    const { list, city } = fiveDayForecast;

    const { date: currentDate } = getDateValues();

    const dayOneFc = list.filter(
      el =>
        tsToLocalDateFromOffset(el.dt, city.timezone).getDate() ===
        currentDate + 1
    );

    const dayTwoFc = list.filter(
      el =>
        tsToLocalDateFromOffset(el.dt, city.timezone).getDate() ===
        currentDate + 2
    );

    const dayThreeFc = list.filter(
      el =>
        tsToLocalDateFromOffset(el.dt, city.timezone).getDate() ===
        currentDate + 3
    );

    const dayFourFc = list.filter(
      el =>
        tsToLocalDateFromOffset(el.dt, city.timezone).getDate() ===
        currentDate + 4
    );

    const dayFiveFc = list.filter(
      el =>
        tsToLocalDateFromOffset(el.dt, city.timezone).getDate() ===
        currentDate + 5
    );

    conversionTemps = {
      ...conversionTemps,
      dayOneLh: getMinMaxTemperatures(dayOneFc),
      dayTwoLh: getMinMaxTemperatures(dayTwoFc),
      dayThreeLh: getMinMaxTemperatures(dayThreeFc),
      dayFourLh: getMinMaxTemperatures(dayFourFc),
      dayFiveLh: getMinMaxTemperatures(dayFiveFc),
    };

    renderForecastDays(
      dayOneFc,
      city.timezone,
      null,
      elements.bottom.forecast.dayOne.date,
      elements.bottom.forecast.dayOne.img,
      elements.bottom.forecast.dayOne.temps
    );

    renderForecastDays(
      dayTwoFc,
      city.timezone,
      elements.bottom.forecast.dayTwo.name,
      elements.bottom.forecast.dayTwo.date,
      elements.bottom.forecast.dayTwo.img,
      elements.bottom.forecast.dayTwo.temps
    );

    renderForecastDays(
      dayThreeFc,
      city.timezone,
      elements.bottom.forecast.dayThree.name,
      elements.bottom.forecast.dayThree.date,
      elements.bottom.forecast.dayThree.img,
      elements.bottom.forecast.dayThree.temps
    );

    renderForecastDays(
      dayFourFc,
      city.timezone,
      elements.bottom.forecast.dayFour.name,
      elements.bottom.forecast.dayFour.date,
      elements.bottom.forecast.dayFour.img,
      elements.bottom.forecast.dayFour.temps
    );

    renderForecastDays(
      dayFiveFc,
      city.timezone,
      elements.bottom.forecast.dayFive.name,
      elements.bottom.forecast.dayFive.date,
      elements.bottom.forecast.dayFive.img,
      elements.bottom.forecast.dayFive.temps
    );

    // Show Forecast Container
    setElementClass(
      elements.bottom.forecast.container,
      "b-1 br-10 bc-transparent bg-transparent"
    );

    elements.bottom.container.classList.remove("hidden");
  }

  elements.bottom.temperature.scaleSelect.addEventListener("change", e => {
    changeScale(conversionTemps, e.target.value);
  });

  if (pollutionData) {
    const { list } = pollutionData;

    elements.bottom.otherInfo.air.aqi.innerHTML = `AQI: ${list[0].main.aqi}`;

    // Show Air Pollution Container
    setElementClass(
      elements.bottom.otherInfo.air.container,
      "flex col-direction b-1 br-10 bc-transparent box-small bg-transparent"
    );

    setElementClass(elements.bottom.otherInfo.container, "flex cg-15 b-25");

    elements.bottom.container.classList.remove("hidden");
  }
};

displayWeatherData();

elements.top.form.element.addEventListener("submit", e => {
  displayWeatherData(elements.top.form.input.value, e);
  setCurrentLocationBtnStatus("inactive");
});

elements.top.form.currentLocationBtn.addEventListener("click", () => {
  getCurrentLocation();
  setCurrentLocationBtnStatus("active");
});

export { displayWeatherData };
