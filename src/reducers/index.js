import { combineReducers } from "redux";
//-------------
import user from "./user";
import projects from "./allProject";
import issues from "./issues";
import limit from "./limit";
import spentTime from "./spentTime";
import comments from "./comments";
//-------------
export default combineReducers({
  user,
  projects,
  issues,
  limit,
  spentTime,
  comments,
});
