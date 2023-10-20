const options = {
  method: 'GET',
};

export default async function fetchData(api, params) {
  try {
    let url;
    let response;
    let data;

    // TODO: study
    url = api.apply(null, params);

    response = await fetch(url, options);
    data = await response.json();

    console.log(data[0] || data);

    return data[0] || data;
  } catch (error) {
    console.error(error);
  }
}
