import { LOAD_PANELS, LOAD_CONTENT, SHOW_LOADER, HIDE_LOADER, DELETE_PANEL, SHOW_LOADER_CONTENT, HIDE_LOADER_CONTENT } from "./const" 

const initState = {
    panels: [],
    content: [],
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
        default: return state
    }
}