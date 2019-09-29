import {api} from "../../config";
import {store} from "../../index";
//-------------
import {getTokenFromLocalStorage} from "../localStorage";
//-------------
import {PROJECTS} from "../../reducers/const";
//-------------

export async function getAllProjects() {
    const key =  getTokenFromLocalStorage("api_key")

    let response = await api.get(`/projects.json`, {
        params: {
            key: key
        },
    });

    if (response.status !== 200) throw new Error('Some error');

    store.dispatch({
        type: PROJECTS.SET_PROJECT_LIST,
        payload: response.data
    })
}

export async function getProject(projecId) {
    const key =  getTokenFromLocalStorage("api_key")

    let response = await api.get(`/projects/${projecId}.json?include=trackers,issue_categories,enabled_modules,time_entry_activities`, {
        params: {
            key: key
        },
    });

    if (response.status !== 200) throw new Error('Some error');

    return  response.data.project
}