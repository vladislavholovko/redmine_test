import { combineReducers } from "redux";
//-------------
import user from "./user";
import projects from "./allProject";
import issues from "./issues";
import limit from "./limit";
import spentTime from "./spentTime";
//-------------
export default combineReducers({
  user,
  projects,
  issues,
  limit,
  spentTime,
});
