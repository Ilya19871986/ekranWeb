import { LOAD_PANELS, LOAD_CONTENT, SHOW_LOADER, HIDE_LOADER } from "./const" 

const initState = {
    panels: [],
    content: [],
    showLoader: false
}

export const PanelsReducer = (state = initState, action) => {
    switch (action.type) {
        case LOAD_PANELS: return {...state, panels: action.payload}
        case LOAD_CONTENT: return {...state, content: action.payload}
        case SHOW_LOADER: return {...state, showLoader: true}
        case HIDE_LOADER: return {...state, showLoader: false}
        default: return state
    }
}