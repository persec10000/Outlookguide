import { httpUtils } from '../utils/HttpUtils';

class CountriesService {

  loadCountries(cbSuccess, cbError) {
    fetch(httpUtils.loadCountries(), {
      method: 'GET',
      headers: httpUtils.getHeaders()
    })
      .then(response => response.json())
      .then(resJson => {
        cbSuccess(resJson);
      })
      .catch((error) => {
        cbError(error);
      });
  }

}

export const countriesService = new CountriesService();