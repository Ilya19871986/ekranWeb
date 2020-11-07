import { LOAD_PANELS, LOAD_CONTENT, SHOW_LOADER, HIDE_LOADER, DELETE_PANEL, SHOW_LOADER_CONTENT, HIDE_LOADER_CONTENT,
    GET_LIST_GROUP_PANELS, SHOW_LOADER_GROUPS, HIDE_LOADER_GROUPS, GET_LIST_PANELS_IN_GROUP, SHOW_LOADER_PANELS_IN_GROUP,
    HIDE_LOADER_PANELS_IN_GROUP, GET_LIST_PANELS_NO_GROUP, GET_CONTENT_IN_GROUP, SHOW_LOADER_CONTENT_IN_GROUP,
    HIDE_LOADER_CONTENT_IN_GROUP, GET_STATUS_FILE_IN_GROUP, SHOW_LOADE_STATUS_FILE_IN_GROUP, HIDE_LOADE_STATUS_FILE_IN_GROUP } from "./const" 

const initState = {
    panels: [],
    content: [],
    contentCurrentGroup: [], // контент загруженный в текущую группу
    showLoaderContentGroup: false, // лоадер загрузки контента текущей группы
    statusFileInGroup: [],
    panelsGroup: [],
    panelsInGroup: [],
    panelsNoGroup: [],
    showLoaderInGroup: false,
    showLoaderGroup: false,
    showLoader: false,
    resultDeletePanel: null,
    showLoaderContent: false,
    showLoaderStatusFileInGroup: false, // лоадер загрузки статуса файла на панелях
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

        // контент в группах
        case GET_CONTENT_IN_GROUP: 
            return {...state, contentCurrentGroup: action.payload}
        case SHOW_LOADER_CONTENT_IN_GROUP: 
            return {...state, showLoaderContentGroup: true}
        case HIDE_LOADER_CONTENT_IN_GROUP: 
            return {...state, showLoaderContentGroup: false}

        // статус файла в группах
        case GET_STATUS_FILE_IN_GROUP: 
            return {...state, statusFileInGroup: action.payload}
        case SHOW_LOADE_STATUS_FILE_IN_GROUP: 
            return {...state, showLoaderStatusFileInGroup: true}
        case HIDE_LOADE_STATUS_FILE_IN_GROUP: 
            return {...state, showLoaderStatusFileInGroup: false}

        default: return state
    }
}