import { httpUtils } from '../utils/HttpUtils';

class UsersService {

  signup(params, cbSuccess, cbError) {
    let url = httpUtils.signup();
    url = url + 
      "?FullName=" + params.FullName +
      "&NickName=" + params.NickName +
      "&Email=" + params.Email +
      "&Gender=" + params.Gender +
      "&DOB=" + params.DOB +
      "&PhoneNo=" + params.PhoneNo +
      "&Password=" + params.Password;
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
      "?email=" + params.email +
      "&password=" + params.password;
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

  loadUser(userId, cbSuccess, cbError) {
    fetch(httpUtils.loadUser(userId), {
      method: 'GET',
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

  checkNickName(nickname, cbSuccess, cbError) {
    fetch(httpUtils.checkNickName(nickname), {
      method: 'GET',
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

  updateUser(params, cbSuccess, cbError) {
    let url = httpUtils.updateUser();
    url = url + 
      "?UserId=" + params.UserId +
      "&FullName=" + params.FullName +
      "&NickName=" + params.NickName +
      "&Email=" + params.Email +
      "&Gender=" + params.Gender +
      "&DOB=" + params.DOB +
      "&PhoneNo=" + params.PhoneNo +
      "&School=" + params.School +
      "&Address=" + params.Address +
      "&City=" + params.City +
      "&Pincode=" + params.Pincode +
      "&Password=" + params.Password +
      "&Country=" + params.Country +
      "&Active=" + params.Active +
      "&Verified=" + params.Verified +
      "&PublicProfile=" + params.PublicProfile +
      "&PublicWithSpecific=" + params.PublicWithSpecific +
      "&Above18=" + params.Above18 +
      "&Suspended=" + params.Suspended +
      "&MaxDistance=" + params.MaxDistance +
      "&GroupId=" + params.GroupId +
      "&VerifiedDoc=" + params.VerifiedDoc +
      "&ProfilePhoto=" + params.ProfilePhoto +
      "&VerifiedBy=" + params.VerifiedBy;
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

}

export const usersService = new UsersService();