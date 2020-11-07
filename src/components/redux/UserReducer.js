import { LOAD_USERS, SHOW_LOADER, HIDE_LOADER, SAVE_USER, CREATE_USER, DELETE_USER, GET_MY_DATA, SHOW_LOADER_MY_DATA, HIDE_LOADER_MY_DATA } from "./const" 

const initState = {
    users: [],
    showLoader: false,
    user: null,
    result_create_user: null,
    result_delete_user: null,
    mydata: "",
    loaderMyData: false
}

export const UserReducer = (state = initState, action) => {
    switch (action.type) {
        case LOAD_USERS: return {...state, users: action.payload}
        case SAVE_USER: return {...state, user: action.payload}
        case SHOW_LOADER: return {...state, showLoader: true}
        case HIDE_LOADER: return {...state, showLoader: false}
        case CREATE_USER: return {...state, result_create_user: action.payload}
        case DELETE_USER: return {...state, result_delete_user: action.payload}
        // получить личные данные
        case GET_MY_DATA: return {...state, mydata: action.payload}
        case SHOW_LOADER_MY_DATA: return {...state, loaderMyData: true}
        case HIDE_LOADER_MY_DATA: return {...state, loaderMyData: false}

        default: return state
    }
}