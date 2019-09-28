import { combineReducers } from 'redux'
//-------------
import user from './user'
import projects from "./allProject";
import issues from "./issues";
//-------------
export default combineReducers({
    user,
    projects,
    issues,
})