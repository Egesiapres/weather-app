import { displayWeatherData } from "../js/script.js";
import { tsToLocalDateFromOffset } from "./dates.js";
import { elements } from "./data/elements.js";
import { renderLowHighTemperatures } from "./render.js";

// others
export const msToKmh = (speed, decimals = 0) => {
  return (speed * 3.6).toFixed(decimals);
};

export const formatInputValue = location => {
  let formattedLocation;

  formattedLocation = location.toLowerCase().trim();
  formattedLocation = formattedLocation.split("," || ", ");
  formattedLocation = formattedLocation.map(el => el.trim());

  return formattedLocation;
};

// elements
const setElementClass = (element, elementClass) =>
  element.setAttribute("class", elementClass);

export const hideElement = element => {
  setElementClass(element, "hidden");
};

export const showElement = (elements, elementsClass) => {
  if (Array.isArray(elements)) {
    elements.forEach(el => setElementClass(el, elementsClass));
  } else {
    setElementClass(elements, elementsClass);
  }
};

export const setCurrentLocationBtn = status => {
  setElementClass(elements.currentLocationBtn, `b-0 br-10 ${status}`);
};

export const displayCurrentDate = (
  monthName,
  date,
  hours,
  minutes,
  seconds
) => {
  elements.currentDatePar.innerHTML = `${monthName} ${date}${
    hours && minutes
      ? `, ${addZero(hours)}:${addZero(minutes)}${
          seconds ? `: ${addZero(seconds)}` : ""
        }`
      : ""
  }`;
};

// TODO: icons instead of arrows
export const meteoDegToDirection = meteoDeg => {
  const directions = [
    { direction: "N", arrow: "↓", interval: [0, 11.25] },
    { direction: "N", arrow: "↓", interval: [348.75, 360] },
    { direction: "NNE", arrow: "↙", interval: [11.25, 33.75] },
    { direction: "NE", arrow: "↙", interval: [33.75, 56.25] },
    { direction: "ENE", arrow: "↙", interval: [56.25, 78.75] },
    { direction: "E", arrow: "←", interval: [78.75, 101.25] },
    { direction: "ESE", arrow: "↖", interval: [101.25, 123.75] },
    { direction: "SE", arrow: "↖", interval: [123.75, 146.25] },
    { direction: "SSE", arrow: "↖", interval: [146.25, 168.75] },
    { direction: "S", arrow: "↑", interval: [168.75, 191.25] },
    { direction: "SSW", arrow: "↗", interval: [191.25, 213.75] },
    { direction: "SW", arrow: "↗", interval: [213.75, 236.25] },
    { direction: "WSW", arrow: "↗", interval: [236.25, 258.75] },
    { direction: "W", arrow: "→", interval: [258.75, 281.25] },
    { direction: "WNW", arrow: "↘", interval: [281.25, 303.75] },
    { direction: "NW", arrow: "↘", interval: [303.75, 326.25] },
    { direction: "NNW", arrow: "↘", interval: [326.25, 348.75] },
  ];

  let direction;

  directions.forEach(el => {
    if (meteoDeg >= el.interval[0] && meteoDeg < el.interval[1]) {
      direction = `${el.arrow} ${el.direction}`;
    }
  });

  return direction;
};

let coordParams;

const successCallback = position => {
  coordParams = {
    lat: position.coords.latitude,
    lon: position.coords.longitude,
  };

  displayWeatherData(coordParams);
};

const errorCallback = error => {
  console.log(error);
};

const options = {
  enableHighAccuracy: true,
  timeout: 10000,
};

export const getCurrentLocation = () =>
  navigator.geolocation.getCurrentPosition(
    successCallback,
    errorCallback,
    options
  );

export const displayFcDayElements = (
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

  imgId.setAttribute("src", getCustomWeatherIcon(dayFc[2].weather[0].main));

  renderLowHighTemperatures(dayFc, lhTempsId, "celsius");
};

// icons
export const getCustomWeatherIcon = weather => {
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

export const getBftIcon = speed => {
  const bftScale = [
    {
      bft: 0,
      icon: "assets/icons/wind-beaufort-0.svg",
      description: "Calm",
      interval: "",
    },
    {
      bft: 1,
      icon: "assets/icons/wind-beaufort-1.svg",
      description: "Light air",
      interval: [1, 5],
    },
    {
      bft: 2,
      icon: "assets/icons/wind-beaufort-2.svg",
      description: "Light breeze",
      interval: [5, 11],
    },
    {
      bft: 3,
      icon: "assets/icons/wind-beaufort-3.svg",
      description: "Gentle breeze",
      interval: [11, 19],
    },
    {
      bft: 4,
      icon: "assets/icons/wind-beaufort-4.svg",
      description: "Moderate breeze",
      interval: [19, 28],
    },
    {
      bft: 5,
      icon: "assets/icons/wind-beaufort-5.svg",
      description: "Fresh breeze",
      interval: [28, 38],
    },
    {
      bft: 6,
      icon: "assets/icons/wind-beaufort-6.svg",
      description: "Strong breeze",
      interval: [38, 49],
    },
    {
      bft: 7,
      icon: "assets/icons/wind-beaufort-7.svg",
      description: "High wind",
      interval: [49, 61],
    },
    {
      bft: 8,
      icon: "assets/icons/wind-beaufort-8.svg",
      description: "Gale",
      interval: [61, 74],
    },
    {
      bft: 9,
      icon: "assets/icons/wind-beaufort-9.svg",
      description: "Strong gale",
      interval: [74, 88],
    },
    {
      bft: 10,
      icon: "assets/icons/wind-beaufort-10.svg",
      description: "Storm",
      interval: [88, 102],
    },
    {
      bft: 11,
      icon: "assets/icons/wind-beaufort-11.svg",
      description: "Violent storm",
      interval: [102, 118],
    },
    {
      bft: 12,
      icon: "assets/icons/wind-beaufort-12.svg",
      description: "Hurricane-force",
      interval: "",
    },
  ];

  let bftIcon;

  bftScale.forEach(el => {
    if (speed >= el?.interval[0] && speed < el?.interval[1]) {
      bftIcon = el.icon;
    }

    if (speed < 1) {
      bftIcon = bftScale[0].icon;
    }

    if (speed >= 118) {
      bftIcon = bftScale[12].icon;
    }
  });

  return bftIcon;
};

// TODO: check code
