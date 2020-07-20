import {
    LK_AUTH,
    LK_NO_AUTH,
    SHOW_LOADER,
    HIDE_LOADER
} from "./const"

const initialState = {
    auth: false,
    showLoader: false
}

export const AuthReducer = (state = initialState, action) => {
    switch (action.type) {
        case SHOW_LOADER:
            return {...state, showLoader: true}            
        case HIDE_LOADER:
            return {...state, showLoader: false}
        case LK_AUTH: 
            return {...state, auth: true}
        case LK_NO_AUTH: 
            return {...state, auth: false}
        default: return state
    }
}  