// TODO: check error container position

const elements = {
  // Top Container
  top: {
    container: document.querySelector("#top-container"),

    // Form
    form: {
      element: document.querySelector("form"),
      input: document.querySelector("input"),
      currentLocationBtn: document.querySelector("#current-location-btn"),
    },

    // Primary Info Container
    primary: {
      container: document.querySelector("#primary-container"),
      city: {
        container: document.querySelector("#city-container"),
        currentDate: document.querySelector("#current-date-par"),
        name: document.querySelector("#city-name-par"),
        details: document.querySelector("#city-details-par"),
      },
      weather: {
        container: document.querySelector("#weather-container"),
        img: document.querySelector("#weather-img"),
        description: document.querySelector("#weather-par"),
      },
    },
  },

  // Bottom Container
  bottom: {
    container: document.querySelector("#bottom-container"),

    // Temperature Container
    temperature: {
      container: document.querySelector("#temperature-container"),
      current: document.querySelector("#temp-par"),
      perceived: document.querySelector("#perceived-temp-par"),
      min: document.querySelector("#min-temp-par"),
      max: document.querySelector("#max-temp-par"),

      // Scale selector
      scaleSelect: document.querySelector("select"),
    },

    // Forecast Container
    forecast: {
      container: document.querySelector("#forecast-container"),
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

    wind: {
      container: document.querySelector("#wind-container"),
      bftIcon: document.querySelector("#wind-bft-icon"),
      speed: document.querySelector("#wind-speed-par"),
      degrees: document.querySelector("#wind-deg-par"),
    },
    gust: {
      speedContainer: document.querySelector("#gust-speed-container"),
      bftIcon: document.querySelector("#gust-bft-icon"),
      speed: document.querySelector("#gust-speed-par"),
    },

    sun: {
      container: document.querySelector("#sun-container"),
      sunrise: document.querySelector("#sunrise-par"),
      sunset: document.querySelector("#sunset-par"),
    },

    // Other Info
    humidity: {
      container: document.querySelector("#humidity-container"),
      value: document.querySelector("#humidity-par"),
    },
    pressure: {
      container: document.querySelector("#pressure-container"),
      value: document.querySelector("#pressure-par"),
    },
    visibility: {
      container: document.querySelector("#visibility-container"),
      value: document.querySelector("#visibility-par"),
    },
    air: {
      container: document.querySelector("#air-container"),
      aqi: document.querySelector("#air-aqi-par"),
    },
  },

  // Error Container
  error: {
    container: document.querySelector("#error-container"),
    value: document.querySelector("#error-value-par"),
  },
};

export { elements };
