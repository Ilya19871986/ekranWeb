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
    LOAD_CONTENT,
    GET_LIST_GROUP_PANELS,
    SHOW_LOADER_GROUPS,
    HIDE_LOADER_GROUPS,
    GET_LIST_PANELS_IN_GROUP,
    SHOW_LOADER_PANELS_IN_GROUP,
    HIDE_LOADER_PANELS_IN_GROUP,
    GET_LIST_PANELS_NO_GROUP,
    GET_CONTENT_IN_GROUP,
    SHOW_LOADER_CONTENT_IN_GROUP,
    HIDE_LOADER_CONTENT_IN_GROUP
} from "./const"
import { getToken, getRole, getListPanels, getListUsers, updateUser, CreateUser, DeleteUser, deletePanel,
        getContent, getContentType, getListGroupAsync, getListPanelInGroupAsync, getListPanelNoGroupAsync,
        getListContentInGroupAsync
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

export function showLoaderGroup() {
    return {
        type: SHOW_LOADER_GROUPS
    }
}

export function hideLoaderGroup() {
    return {
        type: HIDE_LOADER_GROUPS
    }
}

export function showLoaderPanelsInGroup() {
    return {
        type: SHOW_LOADER_PANELS_IN_GROUP
    }
}

export function hideLoaderPanelsInGroup() {
    return {
        type: HIDE_LOADER_PANELS_IN_GROUP
    }
}

export function showLoaderContentInGroup() {
    return {
        type: SHOW_LOADER_CONTENT_IN_GROUP
    }
}

export function hideLoaderContentInGroup() {
    return {
        type: HIDE_LOADER_CONTENT_IN_GROUP
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

// загрузить список групп
export function loadPanelsGroup(user_id) {
    return async dispatch => {
        dispatch(showLoaderGroup())
        const response = await getListGroupAsync(user_id)
        const data = await response.json()
        dispatch({type: GET_LIST_GROUP_PANELS, payload: data}) 
        dispatch(hideLoaderGroup())
    }
}

// загрузить список панелей состоящих и не состоящих в группе
export function loadPanelsInGroup(user_id, group_id) {
    return async dispatch => {
        dispatch(showLoaderPanelsInGroup())
        const responseInGroup = await getListPanelInGroupAsync(user_id, group_id)
        const data1 = await responseInGroup.json()
        const responseNoGroup = await getListPanelNoGroupAsync(user_id)
        const data2 = await responseNoGroup.json()
        dispatch({type: GET_LIST_PANELS_IN_GROUP, payload: data1}) 
        dispatch({type: GET_LIST_PANELS_NO_GROUP, payload: data2}) 
        dispatch(hideLoaderPanelsInGroup())
    }
}

// получить контент текущей группы
export function loadContentCurrentGroup(group_id) {
    return async dispatch => {
        dispatch(showLoaderContentInGroup())
        const response = await getListContentInGroupAsync(group_id)
        const data = await response.json()
        dispatch({type: GET_CONTENT_IN_GROUP, payload: data}) 
        dispatch(hideLoaderContentInGroup())
    }
}