import {ISSUES} from "./const";

export const
    defaultState = {
        issues: [],
        limit: "",
        offset: "",
        total_count: "",
    }

export default function (state = defaultState, action) {
    switch (action.type) {
        case ISSUES.SET_ISSUES_LIST:
            return {...action.payload};
        default:
            return state
    }
}