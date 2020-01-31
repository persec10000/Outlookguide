//import AuthService from '../../services/AuthService';
import { GET_ERRORS, REGISTER_SUCCESS, LOGIN_SUCCESS, SET_CURRENT_USER, LOGOUT, INIT_SUCCESS, BUYER_SUCCESS, SUPPLIER_SUCCESS } from "../types";
import api from "../../api"
/**
 * Login user action
 */
export const loginUser = (data) => async dispatch => {
  let login_data = {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email: data.user.email,
      password: data.user.password
    }),
  }
  await fetch(api.login, login_data)
    .then(res => res.json())
    .then(res => {
      if (res.email != null){
        dispatch({type: LOGIN_SUCCESS,
                  payload: res.user_id})
      }
    })
    .catch(error => {
        dispatch({
          type: GET_ERRORS,
          payload: error
        });
    })
}


export const getbuyerid = (data) => async dispatch => {
  let url = api.getbuyer_id + '/' + data
  await fetch(url, {
    method: 'GET',
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
    }
  })
  .then(res => res.json())
  .then(res => {
    console.log(res)
    dispatch({type: BUYER_SUCCESS,
              payload: res.buyer_id})
  })
  .catch(error => {
      dispatch({
        type: GET_ERRORS,
        payload: error
      }
      );
  })
}

export const getsupplierid = (data) => async dispatch => {
  let url = api.getsupplier_id + '/' + data
  await fetch(url, {
    method: 'GET',
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
    }
  })
  .then(res => res.json())
  .then(res => {
      dispatch({type: SUPPLIER_SUCCESS,
                payload: res.supplier_id})  
  })
  .catch(error => {
      dispatch({
        type: GET_ERRORS,
        payload: error
      }
      );
  })
}
/**
 * Logout action
 */
export const logout = () => dispatch => {
  AuthService.logout();
  dispatch({ type: LOGOUT });
}

/**
 * Register user action
 */

export const registerUser = (data) => async dispatch => {
  let pass_data = {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name: data.user.name,
      surname: data.user.name.split(" ")[0],
      middlename: data.user.name.split(" ")[1],
      fullname: data.user.name,
      birthday: data.user.date,
      home_address: data.user.address,
      phone: data.user.phone,
      email: data.user.email,
      password: data.user.password
    }),
  }
  await fetch(api.user, pass_data)
    .then(res => res.json())
    .then(res => {
      console.log("res",res)
      if (res.status == true) {
        dispatch({ type: REGISTER_SUCCESS,
                   payload: res.data.user_id});
      }
    })
    .catch(error => {
        dispatch({
          type: GET_ERRORS,
          payload: error
        }
      );
    });
}

export const createItems = (data) => async dispatch => {
  console.log("data=======>",data)
  let pass_data = {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      user_id : data.user_id
    }),
  }
  await fetch(api.buyer, pass_data)
    .then(res => res.json())
    .then(res => {
      console.log("res",res)
    })
    .catch(error => {
      console.log("error",error)
      }
    );
  await fetch(api.supplier, pass_data)
  .then(res => res.json())
  .then(res => {
    console.log("res",res)
  })
  .catch(error => {
    console.log("error",error)
  });
}


export const initUser = () => async dispatch => {
  dispatch({ type: INIT_SUCCESS });
}
