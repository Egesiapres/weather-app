import { loadWeatherData } from "../main.js";

let coordParams;

const successCallback = position => {
  coordParams = {
    lat: position.coords.latitude,
    lon: position.coords.longitude,
  };

  loadWeatherData(coordParams);
};

const errorCallback = error => console.log(error);

const options = {
  enableHighAccuracy: true,
  timeout: 10000,
};

const getCurrentLocation = () =>
  navigator.geolocation?.getCurrentPosition(
    successCallback,
    errorCallback,
    options
  );

export { getCurrentLocation };
