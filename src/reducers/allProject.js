import {PROJECTS} from './const'

export const defaultState = {
    limit: '',
    offset: '',
    total_count: '',
    projects: [],
}

export default function (state = defaultState, action) {
    switch (action.type) {
        case PROJECTS.SET_PROJECT_LIST:
            return {...action.payload};
        default:
            return state
    }
}