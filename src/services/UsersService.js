import { httpUtils } from '../utils/HttpUtils';

class UsersService {

  signup(params, cbSuccess, cbError) {
    let url = httpUtils.signup();
    url = url + 
      "&user=" + params.Email +
      "&pass=" + params.Password;
    fetch(url, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    }, 300000)
      .then(response => response.json())
      .then(resJson => {
        cbSuccess(resJson);
      })
      .catch((error) => {
        cbError(error);
      });
  }

  signin(params, cbSuccess, cbError) {
    let url = httpUtils.signin();
    url = url + 
      "&user=" + params.email +
      "&pass=" + params.password;
    fetch(url, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(resJson => {
        cbSuccess(resJson);
      })
      .catch((error) => {
        cbError(error);
      });
  }

  forgotpass(params, cbSuccess, cbError) {
    let url = httpUtils.forgotpass();
    url = url + 
      "&user=" + params.email 
    fetch(url, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
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

export const usersService = new UsersService();