export const personalAPIkey = 'd84df6a5359d1ca50cf0749743171b50';

// f that generates a new custom element
export const setNewElement = (element, classes, innerHTML, id) => {
  const newElement = document.createElement(element);
  newElement.setAttribute('class', classes);
  
  if (innerHTML) {
    newElement.innerHTML = innerHTML;
  }

  if (id) {
    newElement.setAttribute('id', id);
  }

  return newElement;
};

// f that capitalizes the first letter
export const capitalizeFirstLetter = word => {
  return `${word.charAt(0).toUpperCase()}${word.slice(1)}`;
};

// f that converts from K to °C
export const kelvinToCelsius = temperature => {
  return `${(temperature - 273.15).toFixed(1)}°`;
};

// f that converts into a time
export const unixTStoHour = timestamp => {
  const msTimestamp = timestamp * 1000;

  // Date object accepts ms as input
  const date = new Date(msTimestamp);
  
  const hour = date.getHours();
  const minutes = date.getMinutes();

  return `${hour}:${minutes}`;
}

