import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App.js";

import { createStore, applyMiddleware, compose  } from 'redux'
import { Provider } from 'react-redux'
import thunk from "redux-thunk"
import { AppReducer } from "../src/components/redux/AppReducer"

const store = createStore(
    AppReducer , compose(
        applyMiddleware(thunk)
         ,window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    )
)

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
     
    document.getElementById("root")
);