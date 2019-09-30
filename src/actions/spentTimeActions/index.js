import { api } from "../../config";
import { store } from "../../index";
//-------------
import { getTokenFromLocalStorage } from "../localStorage";
//-------------
import { SPENT_TIME } from "../../reducers/const";
//-------------

export async function getAllSpentTime(limit, page, project, issueId) {
  const key = getTokenFromLocalStorage("api_key");

  let url = "/time_entries.json?";
  if (page) {
    url += `page=${page}`;
  }
  if (limit) {
    url += `&limit=${limit}`;
  }
  if (project) {
    url += `&project_id=${project}`;
  }

  if (issueId){
    url += `&issue_id=${issueId}`;
  }

  let response = await api.get(url, {
    params: {
      key: key
    }
  });

  if (response.status !== 200) throw new Error("Some error");

  store.dispatch({
    type: SPENT_TIME.SET_SPENT_TIME,
    payload: response.data
  });
}
