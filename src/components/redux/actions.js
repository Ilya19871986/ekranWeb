import {
    LK_AUTH,
    LK_NO_AUTH,
    SHOW_LOADER,
    HIDE_LOADER,
    LOAD_PANELS,
    LOAD_USERS,
    SAVE_USER,
    CREATE_USER,
    DELETE_USER,
    DELETE_PANEL,
    HIDE_LOADER_CONTENT,
    SHOW_LOADER_CONTENT,
    LOAD_CONTENT
} from "./const"
import { getToken, getRole, getListPanels, getListUsers, updateUser, CreateUser, DeleteUser, deletePanel,
        getContent, getContentType
 } from "../api/api"


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

export function showLoaderContent() {
    return {
        type: SHOW_LOADER_CONTENT
    }
}

export function hideLoaderContent() {
    return {
        type: HIDE_LOADER_CONTENT
    }
}

// аутентификация 
export function Auth(username, password) {
    return async dispatch => {
        dispatch(showLoader())
        const response = await getToken(username, password)
        if (response) {
            dispatch({type: LK_AUTH, payload: response})  
            await getRole(localStorage.getItem("username"), localStorage.getItem("password"))
        } else {
            dispatch({type: LK_NO_AUTH, payload: response}) 
        }
        dispatch(hideLoader())    
    }
}

export function loadPanels() {
    return async dispatch => {
        dispatch(showLoader())
        const response = await getListPanels();
        const data = await response.json()
        dispatch({type: LOAD_PANELS, payload: data})    
        dispatch(hideLoader())    
    }
}

export function loadUsers() {
    return async dispatch => {
        dispatch(showLoader())
        const response = await getListUsers();
        const data = await response.json()
        dispatch({type: LOAD_USERS, payload: data})    
        dispatch(hideLoader())    
    }
}

export function updateUserAsync(tmp) {
    return async dispatch => {
        dispatch(showLoader())
        const response = await updateUser(tmp);
        const data = await response.json()
        dispatch({type: SAVE_USER, payload: data})    
        dispatch(hideLoader()) 
    }
}

export function createUserAsync(username, password, surname, name, description, adminId, organization,  phone, email, town, role) {
    return async dispatch => {
        dispatch(showLoader())
        const response = await CreateUser(username, password, surname, name, description, adminId, organization,  phone, email, town, role);
        console.log(username, password, surname, name, description, adminId, organization,  phone, email, town, role)
        const data = await response.json()
        dispatch({type: CREATE_USER, payload: data})  
        dispatch(hideLoader())
    }
}

export function deleteUserAsync(username) {
    return async dispatch => {
        dispatch(showLoader())
        const response = await DeleteUser(username);
        const data = await response.json()
        dispatch({type: DELETE_USER, payload: data})    
        dispatch(hideLoader()) 
    }
}

export function deletePanelAsync(panelId) {
    return async dispatch => {
        dispatch(showLoader())
        const response = await deletePanel(panelId);
        const data = await response.json()
        dispatch({type: DELETE_PANEL, payload: data})    
        dispatch(hideLoader()) 
    }
}

export function loadContentType(id, type) {
    return async dispatch => {
        dispatch(showLoaderContent())
        const response = await getContentType(id, type)
        const data = await response.json()
        dispatch({type: LOAD_CONTENT, payload: data}) 
        dispatch(hideLoaderContent() )
    }
}