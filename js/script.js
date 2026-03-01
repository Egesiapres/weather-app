import { getGeocoding } from "../api/location.js";
import { getAirPollution } from "../api/pollution.js";
import { getCurrentWeather, getFiveDayForecast } from "../api/weather.js";
import { elements } from "../utils/elements.js";
import {
  addZero,
  changeScale,
  displayCurrentDate,
  displayFcDayElements,
  formatInputValue,
  getBftIcon,
  getCurrentLocation,
  getCustomWeatherIcon,
  getDateValues,
  getLhTemps,
  hideElement,
  kelvinToScale,
  meteoDegToDirection,
  msToKmh,
  setCurrentLocationBtn,
  showElement,
  tsToLocalDateFromOffset,
} from "../utils/utils.js";

const clearInput = () => {
  elements.input.value = "";
};

// f that displays the data retrieved
export const displayWeatherData = async (location, e) => {
  // no automatic form submit
  if (e) {
    e.preventDefault();
  }

  let cityData, fiveDayForecast, weatherData, pollutionData, convertionTemps;

  // no location inputted
  if (!location) {
    cityData = await getGeocoding(["barcelona"]);
    console.log({ cityData });
  }

  if (location) {
    let locationParams;

    // location inputted manually
    if (typeof location === "string") {
      locationParams = formatInputValue(location);

      const cityName = locationParams[0] || "";
      const countryCode = locationParams[1] || "";
      const limit = locationParams[2] || "";
      const stateCode = locationParams[3] || "";

      locationParams = [cityName, countryCode, limit, stateCode];
    } else {
      // location retrieved automatically
      const { name, sys } = await getCurrentWeather([
        location.lat,
        location.lon,
      ]);

      locationParams = [name, sys.country];
    }

    cityData = await getGeocoding(locationParams);

    coordParams = [cityData.lat, cityData.lon];

    if (!cityData.lat || !cityData.lon) {
      // error: no cityData
      // stop fetch
      cityData = null;

      hideElement(elements.primary.div);
      hideElement(elements.secondary.div);

      elements.error.value.innerHTML = `"${elements.input.value}"`;
      elements.error.div.removeAttribute("class");
    }

    clearInput();
  }

  // div unhided after its population
  if (cityData) {
    hideElement(elements.error.div);

    // api calls
    weatherData = await getCurrentWeather(cityData.lat, cityData.lon);
    fiveDayForecast = await getFiveDayForecast(cityData.lat, cityData.lon);
    pollutionData = await getAirPollution(cityData.lat, cityData.lon);

    const { name, state, country } = cityData;

    elements.primary.name.innerHTML = name;

    elements.primary.position.innerHTML = `${state ? state : ""}${
      state && country ? ", " : ""
    }${country ? `(${country})` : ""}`;

    // show data unhiding elements
    elements.primary.div.removeAttribute("class");
  }

  if (weatherData) {
    const { dt, timezone, main, sys, visibility, weather, wind } = weatherData;

    const localDate = tsToLocalDateFromOffset(dt, timezone);

    // display current time values
    const { monthName: currentMonthName, date: currentDate } =
      getDateValues(localDate);

    // console.log(
    //   'Month:',
    //   currentMonthName,
    //   'Date:',
    //   currentDate,
    //   // 'Hours:',
    //   // currentHours,
    //   // 'Minutes:',
    //   // currentMinutes
    // );

    displayCurrentDate(currentMonthName, currentDate);

    elements.primary.weather.main.innerHTML = weather[0].main;

    elements.secondary.temperature.current.innerHTML = kelvinToScale(
      main.temp,
      "celsius"
    );

    elements.secondary.temperature.perceived.innerHTML = `Feels like: ${kelvinToScale(
      main.feels_like,
      "celsius"
    )}`;

    elements.secondary.temperature.min.innerHTML = `Min: ${kelvinToScale(main.temp_min, "celsius")}`;

    elements.secondary.temperature.max.innerHTML = `Max: ${kelvinToScale(main.temp_max, "celsius")}`;

    convertionTemps = { main: main };

    elements.primary.weather.img.setAttribute(
      "src",
      getCustomWeatherIcon(weather[0].main)
    );

    elements.sunWind.wind.bftIcon.setAttribute(
      "src",
      getBftIcon(msToKmh(wind.speed))
    );
    elements.sunWind.wind.speed.innerHTML = `Wind: ${msToKmh(wind.speed)} km/h`;

    if (wind.gust) {
      showElement(elements.sunWind.gust.speedDiv, "container y-center");

      elements.sunWind.gust.bftIcon.setAttribute(
        "src",
        getBftIcon(msToKmh(wind.gust))
      );
      elements.sunWind.gust.speed.innerHTML = `Gust: ${msToKmh(wind.gust)} km/h`;
    } else {
      hideElement(elements.sunWind.gust.speedDiv);
    }

    elements.sunWind.wind.degrees.innerHTML = `Direction: ${meteoDegToDirection(wind.deg)}`;

    const localSunriseDate = tsToLocalDateFromOffset(sys.sunrise, timezone);

    const localSunsetDate = tsToLocalDateFromOffset(sys.sunset, timezone);

    const { hours: sunriseHours, minutes: sunriseMinutes } =
      getDateValues(localSunriseDate);

    const { hours: sunsetHours, minutes: sunsetMinutes } =
      getDateValues(localSunsetDate);

    elements.sunWind.sun.sunrise.innerHTML = `Sunrise: ${addZero(sunriseHours)}:${addZero(
      sunriseMinutes
    )}`;
    elements.sunWind.sun.sunset.innerHTML = `Sunset: ${addZero(sunsetHours)}:${addZero(
      sunsetMinutes
    )}`;

    elements.otherInfo.humidity.value.innerHTML = `${main.humidity}%`;
    elements.otherInfo.pressure.value.innerHTML = `${main.pressure} hPa`;
    elements.otherInfo.visibility.value.innerHTML = `${(visibility / 1000).toFixed(0)} km`;

    showElement(elements.currentDatePar, "m-5 text-center");
    showElement(elements.primary.weather.imgDiv, "container x-center");
    showElement(elements.primary.weather.main, "m-0 text-center text-medium");

    showElement(
      elements.secondary.temperature.div,
      "b-1 br-10 bc-transparent bg-transparent"
    );

    showElement(elements.sunWind.div, "container cg-15 b-25");

    showElement(
      [
        elements.otherInfo.humidity.div,
        elements.otherInfo.pressure.div,
        elements.otherInfo.visibility.div,
      ],
      "container col-direction b-1 br-10 bc-transparent box-small bg-transparent"
    );

    showElement(elements.otherInfo.div, "container cg-15 b-25");

    elements.secondary.div.removeAttribute("class");
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

    // console.log(
    //   'Day 1:',
    //   dayOneFc,
    //   'Day 2:',
    //   dayTwoFc,
    //   'Day 3:',
    //   dayThreeFc,
    //   'Day 4:',
    //   dayFourFc,
    //   'Day 5:',
    //   dayFiveFc
    // );

    convertionTemps = {
      ...convertionTemps,
      dayOneLh: getLhTemps(dayOneFc),
      dayTwoLh: getLhTemps(dayTwoFc),
      dayThreeLh: getLhTemps(dayThreeFc),
      dayFourLh: getLhTemps(dayFourFc),
      dayFiveLh: getLhTemps(dayFiveFc),
    };

    displayFcDayElements(
      dayOneFc,
      city.timezone,
      null,
      elements.forecast.dayOne.date,
      elements.forecast.dayOne.img,
      elements.forecast.dayOne.temps
    );

    displayFcDayElements(
      dayTwoFc,
      city.timezone,
      elements.forecast.dayTwo.name,
      elements.forecast.dayTwo.date,
      elements.forecast.dayTwo.img,
      elements.forecast.dayTwo.temps
    );

    displayFcDayElements(
      dayThreeFc,
      city.timezone,
      elements.forecast.dayThree.name,
      elements.forecast.dayThree.date,
      elements.forecast.dayThree.img,
      elements.forecast.dayThree.temps
    );

    displayFcDayElements(
      dayFourFc,
      city.timezone,
      elements.forecast.dayFour.name,
      elements.forecast.dayFour.date,
      elements.forecast.dayFour.img,
      elements.forecast.dayFour.temps
    );

    displayFcDayElements(
      dayFiveFc,
      city.timezone,
      elements.forecast.dayFive.name,
      elements.forecast.dayFive.date,
      elements.forecast.dayFive.img,
      elements.forecast.dayFive.temps
    );

    // show data unhiding elements
    showElement(
      elements.forecast.div,
      "b-1 br-10 bc-transparent bg-transparent"
    );

    elements.secondary.div.removeAttribute("class");
  }

  elements.scaleSelect.addEventListener("change", e => {
    changeScale(convertionTemps, e.target.value);
  });

  if (pollutionData) {
    const { list } = pollutionData;

    elements.otherInfo.air.aqi.innerHTML = `AQI: ${list[0].main.aqi}`;

    // show data unhiding elements
    showElement(
      elements.otherInfo.air.div,
      "container col-direction b-1 br-10 bc-transparent box-small bg-transparent"
    );

    showElement(elements.otherInfo.div, "container cg-15 b-25");

    elements.secondary.div.removeAttribute("class");
  }
};

displayWeatherData();

elements.form.addEventListener("submit", e => {
  displayWeatherData(elements.input.value, e);
  setCurrentLocationBtn("inactive");
});

elements.currentLocationBtn.addEventListener("click", () => {
  getCurrentLocation();
  setCurrentLocationBtn("active");
});

// in future
// TODO: hour forecast
// TODO: modals containing scales info (beaufort, air pollution params...)
