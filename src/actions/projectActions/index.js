import { api } from "../../config";
import { store } from "../../index";
//-------------
import { getTokenFromLocalStorage } from "../localStorage";
//-------------
import { PROJECTS } from "../../reducers/const";
//-------------

export async function getAllProjects() {
  let url = "/projects.json";
  const key = getTokenFromLocalStorage("api_key");

  let params = {};
  params.key = key;

  let response = await api.get(url, { params });

  if (response.status !== 200) throw new Error("Some error");

  store.dispatch({
    type: PROJECTS.SET_PROJECT_LIST,
    payload: response.data
  });
}

export async function getProject(projecId) {
  let url = `/projects/${projecId}.json?include=trackers,issue_categories,enabled_modules,time_entry_activities`;
  const key = getTokenFromLocalStorage("api_key");

  let params = {};
  params.key = key;

  let response = await api.get(url, { params });

  if (response.status !== 200) throw new Error("Some error");

  return response.data.project;
}
