import {USER} from './const'

export const defaultState = {
    api_key: "",
    created_on: "",
    firstname: "",
    id: "",
    last_login_on: "",
    lastname: "",
    login: "",
    mail: "",
};

export default function (state = defaultState, action) {
    switch (action.type) {
        case USER.SET_USER_INFO:
            return {...action.payload};
        case USER.UNSET_USER_INFO:
            return {...defaultState};
        default:
            return state
    }
}