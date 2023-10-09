const personalAPIkey = 'd84df6a5359d1ca50cf0749743171b50';
const defaultCityName = 'Brescia';

export const setLocationUrl = (
  cityName = defaultCityName,
  stateCode = '',
  countryCode = '',
  limit = '',
  APIkey = personalAPIkey
) =>
  `http://api.openweathermap.org/geo/1.0/direct?q=${cityName},${stateCode},${countryCode}&limit=${limit}&appid=${APIkey}`;

export const setCurrentWeatherUrl = (lat, lon, APIkey = personalAPIkey) =>
  `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${APIkey}`;
