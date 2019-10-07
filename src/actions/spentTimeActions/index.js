import { api } from "../../config";
import { store } from "../../index";
//-------------
import { getTokenFromLocalStorage } from "../localStorage";
//-------------
import { SPENT_TIME } from "../../reducers/const";
//-------------

export async function getAllSpentTime(
  limit,
  page,
  project,
  issueId,
  timeReturn
) {
  let url = "/time_entries.json?";
  const key = getTokenFromLocalStorage("api_key");

  let params = {};
  params.key = key;
  if (page) {
    params.page = page;
  }
  if (limit) {
    params.limit = limit;
  }
  if (project) {
    params.project_id = project;
  }
  if (issueId) {
    params.issue_id = issueId;
  }

  let response = await api.get(url, { params });

  if (response.status !== 200) throw new Error("Some error");

  if (timeReturn) {
    return response.data;
  } else {
    store.dispatch({
      type: SPENT_TIME.SET_SPENT_TIME,
      payload: response.data
    });
  }
}

export async function createSpentTime(timeObject) {
  const key = getTokenFromLocalStorage("api_key");
 
  let url = "/time_entries.json?";
  if (timeObject.issue_id) {
    url += `time_entry[issue_id]=${timeObject.issue_id}`;
  }
  if (timeObject.project_id) {
    url += `time_entry[project_id]=${timeObject.project_id}`;
  }
    if (timeObject.spent_on) {
    url += `&time_entry[spent_on]=${timeObject.spent_on}`;
  }
  if (timeObject.hours) {
    url += `&time_entry[hours]=${timeObject.hours}`;
  }
  if (timeObject.activity_id) {
    url += `&time_entry[activity_id]=${timeObject.activity_id}`;
  }

  if (timeObject.comments) {
    url += `&time_entry[comments]=${timeObject.comments}`;
  }

  let response = await api.post(url, {
    params: {
      key: key
    }
  });

  if (response.status !== 200) throw new Error("Some error");

  return response.data;
}

/*export async function createSpentTime(timeObject) {
  const key = getTokenFromLocalStorage("api_key");
  let params = {};
  params.key = key;

  if (timeObject.issue_id) {
    params.time_entry.issue_id = timeObject.issue_id;
  }
  if (timeObject.project_id) {
    params.time_entry.roject_id = timeObject.project_id;
  }
  /!*  if (timeObject.spent_on) {
    url += `&time_entry[spent_on]=${timeObject.spent_on}`;
  }*!/

  if (timeObject.hours) {
    params.time_entry.hours = timeObject.hours;
  }
  if (timeObject.activity_id) {
    params.time_entry.activity_id = timeObject.activity_id;
  }

  if (timeObject.comments) {
    params.time_entry.comments = timeObject.comments;
  }

  let response = await api.post("/time_entries.json?", {
    params
  });

  if (response.status !== 200) throw new Error("Some error");

  return response.data;
}*/
