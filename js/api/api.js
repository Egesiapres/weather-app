export const API_KEY = 'd84df6a5359d1ca50cf0749743171b50';
export const baseUrl = 'https://api.openweathermap.org';
export const dataUrl = '/data/2.5';
export const geolocationUrl = '/geo/1.0';

const request = async (url, options) => {
  let response = await fetch(url, options);

  return response;
};

export const get = (dataTypeUrl, url) =>
  request(`${baseUrl}${dataTypeUrl}${url}`, { method: 'GET' });

export const fetchData = async (api, params) => {
  try {
    // TODO: study
    const response = await api.apply(null, params);
    
    const data = await response.json();
    console.log(data[0] || data);

    return data[0] || data;
  } catch (error) {
    console.error(error);
  }
};
