const elements = {
  // Form and input
  input: document.querySelector("input"),
  form: document.querySelector("form"),
  currentDatePar: document.querySelector("#current-date-par"),
  currentLocationBtn: document.querySelector("#current-location-btn"),

  // Primary div
  primary: {
    div: document.querySelector("#primary-div"),
    name: document.querySelector("#name-par"),
    position: document.querySelector("#position-details-par"),
    weather: {
      main: document.querySelector("#weather-main-par"),
      imgDiv: document.querySelector("#weather-main-img-div"),
      img: document.querySelector("#weather-main-img"),
    },
  },

  // Secondary div
  secondary: {
    div: document.querySelector("#secondary-div"),
    temperature: {
      div: document.querySelector("#temp-div"),
      current: document.querySelector("#temp-par"),
      perceived: document.querySelector("#perceived-temp-par"),
      min: document.querySelector("#min-temp-par"),
      max: document.querySelector("#max-temp-par"),
    },
  },

  // Forecast days
  forecast: {
    div: document.querySelector("#five-day-forecast-div"),
    dayOne: {
      date: document.querySelector("#day-one-date-par"),
      img: document.querySelector("#day-one-weather-img"),
      temps: document.querySelector("#day-one-lh-temps-par"),
    },
    dayTwo: {
      name: document.querySelector("#day-two-name-par"),
      date: document.querySelector("#day-two-date-par"),
      img: document.querySelector("#day-two-weather-img"),
      temps: document.querySelector("#day-two-lh-temps-par"),
    },
    dayThree: {
      name: document.querySelector("#day-three-name-par"),
      date: document.querySelector("#day-three-date-par"),
      img: document.querySelector("#day-three-weather-img"),
      temps: document.querySelector("#day-three-lh-temps-par"),
    },
    dayFour: {
      name: document.querySelector("#day-four-name-par"),
      date: document.querySelector("#day-four-date-par"),
      img: document.querySelector("#day-four-weather-img"),
      temps: document.querySelector("#day-four-lh-temps-par"),
    },
    dayFive: {
      name: document.querySelector("#day-five-name-par"),
      date: document.querySelector("#day-five-date-par"),
      img: document.querySelector("#day-five-weather-img"),
      temps: document.querySelector("#day-five-lh-temps-par"),
    },
  },

  // Scale selector
  scaleSelect: document.querySelector("select"),

  // Wind and sun
  sunWind: {
    div: document.querySelector("#sun-wind-div"),
    wind: {
      contentDiv: document.querySelector("#wind-content-div"),
      bftIcon: document.querySelector("#wind-bft-icon"),
      speed: document.querySelector("#wind-speed-par"),
      degrees: document.querySelector("#wind-deg-par"),
    },
    gust: {
      speedDiv: document.querySelector("#gust-speed-div"),
      bftIcon: document.querySelector("#gust-bft-icon"),
      speed: document.querySelector("#gust-speed-par"),
    },
    sun: {
      sunrise: document.querySelector("#sunrise-par"),
      sunset: document.querySelector("#sunset-par"),
    },
  },

  // Other info
  otherInfo: {
    div: document.querySelector("#other-info-div"),
    humidity: {
      div: document.querySelector("#humidity-div"),
      value: document.querySelector("#humidity-par"),
    },
    pressure: {
      div: document.querySelector("#pressure-div"),
      value: document.querySelector("#pressure-par"),
    },
    visibility: {
      div: document.querySelector("#visibility-div"),
      value: document.querySelector("#visibility-par"),
    },
    air: {
      div: document.querySelector("#air-div"),
      aqi: document.querySelector("#air-aqi-par"),
    },
  },

  // Error
  error: {
    div: document.querySelector("#error-div"),
    value: document.querySelector("#error-value-par"),
  },
};

export { elements };
