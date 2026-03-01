/**
 * Resolves the correct icon to be used for the current weather condition.
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
 * @param {number} windSpeed - The wind speed in km/h.
 *
 * @returns {string} The URL of the corresponding Beaufort scale icon.
 *
 * @example
 * const bftIconUrl = resolveBftIcon(15);
 * console.log(bftIconUrl); // "assets/icons/wind-beaufort-3.svg"
 */
const resolveBeaufortIcon = windSpeed => {
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
    if (windSpeed >= el?.interval[0] && windSpeed < el?.interval[1]) {
      bftIcon = el.icon;
    }

    if (windSpeed < 1) {
      bftIcon = bftScale[0].icon;
    }

    if (windSpeed >= 118) {
      bftIcon = bftScale[12].icon;
    }
  });

  return bftIcon;
};

export { resolveBeaufortIcon, resolveWeatherIcon };
