import { api } from "../../config";
import { store } from "../../index";
//-------------
import { getTokenFromLocalStorage } from "../localStorage";
//-------------
import { ISSUES } from "../../reducers/const";
//-------------

export async function getAllIssues(
  limit,
  page,
  project,
  issueId,
  issuesReturn
) {
  let url = "/issues.json?";
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

  if (issuesReturn) {
    return response.data;
  } else {
    store.dispatch({
      type: ISSUES.SET_ISSUES_LIST,
      payload: response.data
    });
  }
}

export async function getIssue(issueId) {
  const key = getTokenFromLocalStorage("api_key");
  let url = `/issues/${issueId}.json?include=children,attachments,relations,changesets,journals,watchers`;

  let params = {};
  params.key = key;

  let response = await api.get(url, { params });

  if (response.status !== 200) throw new Error("Some error");

  return response.data.issue;
}
