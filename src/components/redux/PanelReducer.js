import { LOAD_PANELS, LOAD_CONTENT, SHOW_LOADER, HIDE_LOADER, DELETE_PANEL, SHOW_LOADER_CONTENT, HIDE_LOADER_CONTENT,
    GET_LIST_GROUP_PANELS, SHOW_LOADER_GROUPS, HIDE_LOADER_GROUPS, GET_LIST_PANELS_IN_GROUP, SHOW_LOADER_PANELS_IN_GROUP,
    HIDE_LOADER_PANELS_IN_GROUP, GET_LIST_PANELS_NO_GROUP } from "./const" 

const initState = {
    panels: [],
    content: [],
    panelsGroup: [],
    panelsInGroup: [],
    panelsNoGroup: [],
    showLoaderInGroup: false,
    showLoaderGroup: false,
    showLoader: false,
    resultDeletePanel: null,
    showLoaderContent: false,
}

export const PanelsReducer = (state = initState, action) => {
    switch (action.type) {
        case LOAD_PANELS: return {...state, panels: action.payload}
        case LOAD_CONTENT: return {...state, content: action.payload}
        case SHOW_LOADER: return {...state, showLoader: true}
        case HIDE_LOADER: return {...state, showLoader: false}
        case SHOW_LOADER_CONTENT: return {...state, showLoaderContent: true}
        case HIDE_LOADER_CONTENT: return {...state, showLoaderContent: false}
        case DELETE_PANEL: return {...state, resultDeletePanel: action.payload}
        
        // группы
        case GET_LIST_GROUP_PANELS: 
            return {...state, panelsGroup: action.payload}
        case SHOW_LOADER_GROUPS: 
            return {...state, showLoaderGroup: true}
        case HIDE_LOADER_GROUPS: 
            return {...state, showLoaderGroup: false}

        case GET_LIST_PANELS_IN_GROUP: 
            return {...state, panelsInGroup: action.payload}
        case GET_LIST_PANELS_NO_GROUP: 
            return {...state, panelsNoGroup: action.payload}
        case SHOW_LOADER_PANELS_IN_GROUP: 
            return {...state, showLoaderInGroup: true}
        case HIDE_LOADER_PANELS_IN_GROUP: 
            return {...state, showLoaderInGroup: false}

        default: return state
    }
}