import { httpUtils } from '../utils/HttpUtils';

class UsersService {

  signup(params, cbSuccess, cbError) {
    let url = httpUtils.signup();
    url = url + 
      "&user=" + params.email +
      "&pass=" + params.password +
      "&imei=" + params.imei +
      "&lang=" + params.lang
    fetch(url, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    }, 300000)
      .then(response => {return response.text()})
      .then((text) => {
        cbSuccess(text);
      })
      .catch((error) => {
        cbError(error);
      });
  }

  signin(params, cbSuccess, cbError) {
    let url = httpUtils.signin();
    url = url + 
      "&user=" + params.email +
      "&pass=" + params.password +
      "&imei=" + params.imei +
      "&lang=" + params.lang
    fetch(url, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then(response => {return response.text()})
      .then((text) => {
        cbSuccess(text);
      })
      .catch((error) => {
        cbError(error);
      });
  }

  forgot(params, cbSuccess, cbError) {
    let url = httpUtils.forgot();
    url = url + 
    "&user=" + params.email +
    "&imei=" + params.imei
    fetch(url, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then(response =>{return response.text()})
      .then((text) => {
        cbSuccess(text);
      })
      .catch((error) => {
        cbError(error);
      });
  }

}

export const usersService = new UsersService();