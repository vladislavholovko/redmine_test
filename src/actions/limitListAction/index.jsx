import { store } from "../../index";
//-------------
import { LIMIT } from "../../reducers/const";
//-------------

export async function setLimit(limit) {
  store.dispatch({
    type: LIMIT.SET_LIMIT,
    payload: limit
  });
}
