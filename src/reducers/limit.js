import { LIMIT } from "./const";

export const defaultState = {
  limit: 10
};

export default function(state = defaultState, action) {
  switch (action.type) {
    case LIMIT.SET_LIMIT:
      return { limit: action.payload };
    default:
      return state;
  }
}
