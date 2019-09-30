import { api } from "../../config";
import { store } from "../../index";
//-------------
import { getTokenFromLocalStorage } from "../localStorage";
//-------------
import { ISSUES } from "../../reducers/const";
//-------------

export async function getAllIssues(limit, page, project) {
  const key = getTokenFromLocalStorage("api_key");

  let url = "/issues.json?";
  if (page) {
    url += `page=${page}`;
  }
  if (limit) {
    url += `&limit=${limit}`;
  }
  if (project) {
    url += `&project_id=${project}`;
  }

  let response = await api.get(url, {
    params: {
      key: key
    }
  });

  if (response.status !== 200) throw new Error("Some error");

  store.dispatch({
    type: ISSUES.SET_ISSUES_LIST,
    payload: response.data
  });

  return response;
}
