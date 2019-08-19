import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import history from "./shared/history";
import { Router } from "react-router-dom";
import { Provider } from "react-redux";
import { applyMiddleware, createStore, compose } from "redux";
import thunkMiddleware from "redux-thunk";
import rootReducer from "./reducers";
import loggerMiddleware from "./middlewares/logger";
import * as serviceWorker from "./serviceWorker";

const middlewareEnhancer = applyMiddleware(loggerMiddleware, thunkMiddleware);

const store = createStore(rootReducer, undefined, middlewareEnhancer);

const rootElement = document.getElementById("root");
ReactDOM.render(
  <Router history={history}>
    <Provider store={store}>
      <App />
    </Provider>
  </Router>,
  rootElement
);

serviceWorker.unregister();
