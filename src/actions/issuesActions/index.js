import {api} from "../../config";
import {store} from "../../index";
//-------------
import {getTokenFromLocalStorage} from "../localStorage";
//-------------
import {ISSUES} from "../../reducers/const";
//-------------
const key = getTokenFromLocalStorage("api_key")
//-------------

export async function getAllIssues(limit, page) {
    let response = await api.get(`/issues.json?page=${page},limit=${limit}`, {
        params: {
            key: key
        },
    });

    if (response.status !== 200) throw new Error('Some error');

    store.dispatch({
        type: ISSUES.SET_ISSUES_LIST,
        payload: response.data
    })
}