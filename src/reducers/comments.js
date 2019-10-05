import { COMMENTS } from "./const";

import { getTokenFromLocalStorage } from "../actions/localStorage";

export const defaultState = {
  projects_comments: getTokenFromLocalStorage("projects_comments")
    ? JSON.parse(getTokenFromLocalStorage("projects_comments"))
    : [],
  issues_comments: getTokenFromLocalStorage("issues_comments")
    ? JSON.parse(getTokenFromLocalStorage("issues_comments"))
    : []
};

export default function(state = defaultState, action) {
  switch (action.type) {
    case COMMENTS.SET_PROJECTS_COMMENTS:
      return { ...state, projects_comments: action.payload };
    case COMMENTS.SET_ISSUES_COMMENTS:
      return { ...state, issues_comments: action.payload };
    default:
      return state;
  }
}
