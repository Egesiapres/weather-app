export const API_KEY = 'd84df6a5359d1ca50cf0749743171b50';
export const baseUrl = 'https://api.openweathermap.org';
export const dataUrl = '/data/2.5';
export const geolocationUrl = '/geo/1.0';

const request = async (url, options) => {
  try {
    let response = await fetch(url, options);

    return response;
  } catch (error) {
    console.log(error);
  }
};

// HTTP methods
export const get = (dataTypeUrl, url) =>
  request(`${baseUrl}${dataTypeUrl}${url}`, { method: 'GET' });

// main fetch f
export const fetchData = async (api, params) => {
  try {
    // TODO: study
    const response = await api.apply(null, params);

    const data = await response.json();

    return data[0] || data;
  } catch (error) {
    console.error(error);
  }
};
