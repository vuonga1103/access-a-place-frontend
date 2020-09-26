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

const establishmentInitialState = {
  establishments: [],
  selectedEstablishment: null,
  loaded: false,
  currentEstablishment: null,
};

const userInitialState = {
  id: 0,
  token: "",
  first_name: "",
  last_name: "",
  email: "",
  image_url: "",
  date_joined: "",
  reviews: [],
  bookmarks: [],
};

const currentLocationInitialState = {
  longitude: null,
  latitude: null,
};

const establishmentReducer = (state = establishmentInitialState, action) => {
  switch (action.type) {
    case "SET_ESTABLISHMENTS":
      return { ...state, establishments: action.payload };

    case "CLEAR_ESTABLISHMENTS":
      return { ...state, establishments: [] };

    case "SET_SELECTED_ESTABLISHMENT":
      return { ...state, selectedEstablishment: action.payload };

    case "SET_CURRENT_ESTABLISHMENT":
      return { ...state, currentEstablishment: action.payload };

    case "SET_LOADED":
      return { ...state, loaded: true };

    case "SET_NOT_LOADED":
      return { ...state, loaded: false };

    default:
      return state;
  }
};

const userReducer = (state = userInitialState, action) => {
  switch (action.type) {
    case "SET_USER_INFORMATION":
      const {
        id,
        first_name,
        last_name,
        email,
        image_url,
        reviews,
        date_joined,
      } = action.payload.user;

      return {
        ...state,
        id,
        first_name,
        last_name,
        email,
        date_joined,
        image_url,
        reviews,
        token: action.payload.token,
      };

    case "LOG_USER_OUT":
      return userInitialState;

    case "SET_USER_BOOKMARKS":
      return { ...state, bookmarks: action.payload };

    case "REMOVE_BOOKMARK":
      const bookmarkToRemove = action.payload;
      const updatedBookmarks = [...state.bookmarks].filter(
        (b) => !b.id === bookmarkToRemove.id
      );
      return { ...state, bookmarks: updatedBookmarks };

    case "ADD_BOOKMARK":
      const bookmarkToAdd = action.payload;
      return { ...state, bookmarks: [...state.bookmarks, bookmarkToAdd] };
    default:
      return state;
  }
};

const currentLocationReducer = (
  state = currentLocationInitialState,
  action
) => {
  switch (action.type) {
    case "SET_CURRENT_LOCATION":
      const { longitude, latitude } = action.payload;
      return { longitude, latitude };
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  establishmentInformation: establishmentReducer,
  userInformation: userReducer,
  currentLocationInformation: currentLocationReducer,
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
