import {api} from '../../config'
import {setTokenToLocalStorage} from '../localStorage'
import { store } from '../../index'
import { USER } from '../../reducers/const'

export async function signIn(username, password) {
    let credentials = btoa(username + ':' + password);
    let basicAuth = 'Basic ' + credentials;

    let response = await api.get(`/users/current.json`, {
        headers: {
            'Authorization': basicAuth
        }
    });

    if (response.status !== 200) throw new Error('Some error');
    await setTokenToLocalStorage(response.data.user.api_key);

    return response.data
}

export async function getUserInfo(key) {
    let response = await api.get(`/users/current.json`, {
        params: {
            key: key
        }
    });

    if (response.status !== 200) throw new Error('Some error');
    let data = response.data.user;

    store.dispatch({
        type: USER.SET_USER_INFO,
        payload: data,
    });

    return response.data
}