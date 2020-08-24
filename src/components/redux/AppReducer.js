import { combineReducers } from "redux";
import { AuthReducer } from "./AuthReducer"
import { PanelsReducer } from "./PanelReducer"
import { UserReducer } from "./UserReducer"

export const AppReducer = combineReducers({
    Auth: AuthReducer,
    Panels: PanelsReducer,
    User: UserReducer
});