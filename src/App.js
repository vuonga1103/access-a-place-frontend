import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, Route, Switch } from "react-router-dom";
import "./App.css";
import EstablishmentsPage from "./EstablishmentsPage/EstablishmentsPage";
import EstablishmentPage from "./EstablishmentPage/EstablishmentPage";
import Footer from "./HomePage/Footer/Footer";
import HomePage from "./HomePage/HomePage";
import LoginPage from "./LoginPage/LoginPage";
import NavBar from "./NavBar/NavBar";
import NotFoundPage from "./NotFoundPage/NotFoundPage";
import RegisterPage from "./RegisterPage/RegisterPage";
import AboutPage from "./AboutPage/AboutPage";
import UserPage from "./UserPage/UserPage";
import SettingPage from "./SettingPage/SettingPage";

function App() {
  const dispatch = useDispatch();
  const loggedIn = useSelector((state) => state.userInformation.token);

  useEffect(() => {
    localStorage.token && persistLoggedInUser();
    getUsersLocation();
    loggedIn && fetchUserBookmarks(); // If there is a logged in user then get their bookmarks
  }, [loggedIn]);

  const persistLoggedInUser = () => {
    fetch("http://localhost:4000/persist", {
      headers: { Authorization: `bearer ${localStorage.token}` },
    })
      .then((response) => response.json())
      .then((user) => {
        dispatch({ type: "SET_USER_INFORMATION", payload: user });
        localStorage.token = user.token;
      });
  };

  const getUsersLocation = () => {
    navigator.geolocation.watchPosition((position) => {
      dispatch({
        type: "SET_CURRENT_LOCATION",
        payload: {
          longitude: position.coords.longitude,
          latitude: position.coords.latitude,
        },
      });
    });
  };

  const fetchUserBookmarks = () => {
    fetch(`http://localhost:4000/user-bookmarks`, {
      headers: { Authorization: `bearer ${localStorage.token}` },
    })
      .then((response) => response.json())
      .then((bookmarks) => {
        dispatch({ type: "SET_USER_BOOKMARKS", payload: bookmarks });
      });
  };

  return (
    <div className="App">
      <NavBar />

      <Switch>
        <Route path="/establishment/:slug" component={EstablishmentPage} />

        <Route path="/search" exact component={EstablishmentsPage} />

        <Route path="/about" exact component={AboutPage} />

        <Route path="/register" exact>
          {loggedIn ? <Redirect to="/" /> : <RegisterPage />}
        </Route>

        <Route path="/login" exact>
          {loggedIn ? <Redirect to="/" /> : <LoginPage />}
        </Route>

        <Route path="/setting" exact>
          {loggedIn ? <SettingPage /> : <NotFoundPage />}
        </Route>

        <Route path="/users/:id" exact component={UserPage} />

        <Route path="/" exact component={HomePage} />

        <Route path="/not-found" exact component={NotFoundPage} />

        <Route path="*" component={NotFoundPage} />
      </Switch>

      <Footer />
    </div>
  );
}

export default App;
