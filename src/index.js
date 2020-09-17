import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { BrowserRouter } from "react-router-dom";
import "bulma/css/bulma.css";
import { createStore, combineReducers } from "redux";
import { Provider } from "react-redux";

/**  REDUX STORE
 *
 **/

const establishmentInitialState = { establishments: [] };
const userInitialState = {
  id: 0,
  token: "",
  first_name: "",
  last_name: "",
  reviews: [],
};

const establishmentReducer = (state = establishmentInitialState, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

const userReducer = (state = userInitialState, action) => {
  switch (action.type) {
    case "SET_USER_INFORMATION":
      const { id, first_name, last_name, email } = action.payload.user;
      return {
        ...state,
        id,
        first_name,
        last_name,
        email,
        token: action.payload.token,
      };
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  establishmentInformation: establishmentReducer,
  userInformation: userReducer,
});

const storeObject = createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

ReactDOM.render(
  <Provider store={storeObject}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
