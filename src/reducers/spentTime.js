import { SPENT_TIME } from "./const";

export const defaultState = {
  time_entries: [],
  limit: "",
  offset: "",
  total_count: ""
};

export default function(state = defaultState, action) {
  switch (action.type) {
    case SPENT_TIME.SET_SPENT_TIME:
      return { ...action.payload };
    default:
      return state;
  }
}
