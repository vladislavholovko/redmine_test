import { api } from "../../config";
import { store } from "../../index";
//-------------
import { USER } from "../../reducers/const";
//-------------
import {
  deleteTokenFromLocalStorage,
  setTokenToLocalStorage
} from "../localStorage";
//-------------

export async function signIn(username, password) {
  let credentials = btoa(username + ":" + password);
  let basicAuth = "Basic " + credentials;

  let response = await api.get(`/users/current.json`, {
    headers: {
      Authorization: basicAuth
    }
  });
  if (response.status !== 200) throw new Error("Some error");

  await setTokenToLocalStorage("api_key", response.data.user.api_key);
  store.dispatch({
    type: USER.SET_USER_INFO,
    payload: response.data.user
  });

  return response.data;
}

export async function signOut() {
  await deleteTokenFromLocalStorage("api_key");
  store.dispatch({
    type: USER.UNSET_USER_INFO
  });
}

export async function getUserInfo(key) {
  let response = await api.get(`/users/current.json`, {
    params: {
      key: key
    }
  });
  if (response.status !== 200) throw new Error("Some error");

  let data = response.data.user;
  store.dispatch({
    type: USER.SET_USER_INFO,
    payload: data
  });

  return response.data;
}
