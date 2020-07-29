import { combineReducers } from "redux";
import { AuthReducer } from "./AuthReducer"
import { PanelsReducer } from "./PanelReducer"

export const AppReducer = combineReducers({
    Auth: AuthReducer,
    Panels: PanelsReducer
});