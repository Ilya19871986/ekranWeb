import {
    LK_AUTH,
    LK_NO_AUTH,
    SHOW_LOADER,
    HIDE_LOADER
} from "./const"
import { getToken } from "../api/api"


export function showLoader() {
    return {
        type: SHOW_LOADER
    }
}

export function hideLoader() {
    return {
        type: HIDE_LOADER
    }
}

// аутентификация 
export function Auth(username, password) {
    return async dispatch => {
        dispatch(showLoader())
        const response = await getToken(username, password)
        if (response) {
            dispatch({type: LK_AUTH, payload: response})  
        } else {
            dispatch({type: LK_NO_AUTH, payload: response}) 
        }
        dispatch(hideLoader())    
    }
}