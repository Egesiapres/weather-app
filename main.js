import { loadWeatherData } from "./controllers/weather.js";
import { elements } from "./utils/data/elements.js";
import { setCurrentLocationBtnStatus } from "./utils/dom.js";
import { getCurrentLocation } from "./utils/utils.js";
// TODO: hourly forecast
// TODO: modals containing scales info (beaufort, air pollution params...)

loadWeatherData();

elements.top.form.element.addEventListener("submit", e => {
  loadWeatherData(elements.top.form.input.value, e);
  setCurrentLocationBtnStatus("inactive");
});

elements.top.form.currentLocationBtn.addEventListener("click", () => {
  getCurrentLocation();
  setCurrentLocationBtnStatus("active");
});
