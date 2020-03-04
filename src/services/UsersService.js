import { httpUtils } from '../utils/HttpUtils';

class UsersService {

  signup(params, cbSuccess, cbError) {
    let url = httpUtils.signup();
    url = url + 
      "&user=" + params.email +
      "&pass=" + params.password +
      "&telno=" + params.telno +
      "&device_id=" + params.device_id +
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
      "&device_id=" + params.device_id +
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
  activate(params, cbSuccess, cbError) {
    let url = httpUtils.activate();
    url = url + 
      "&user=" + params.email +
      "&pass=" + params.password +
      "&token=" + params.token +
      "&device_id=" + params.device_id
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
    "&device_id=" + params.device_id
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