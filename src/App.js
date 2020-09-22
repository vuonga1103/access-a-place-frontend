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

function App() {
  const dispatch = useDispatch();
  const loggedIn = useSelector((state) => state.userInformation.token);

  useEffect(() => {
    if (localStorage.token) {
      persistLoggedInUser();
    }

    getUsersLocation();
  });

  const persistLoggedInUser = () => {
    fetch("http://localhost:4000/persist", {
      headers: {
        Authorization: `bearer ${localStorage.token}`,
      },
    })
      .then((response) => response.json())
      .then((result) => {
        dispatch({ type: "SET_USER_INFORMATION", payload: result });
        localStorage.token = result.token;
      });
  };

  const getUsersLocation = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      const longitude = position.coords.longitude;
      const latitude = position.coords.latitude;

      localStorage.longitude = longitude;
      localStorage.latitude = latitude;
    });
  };

  return (
    <div className="App">
      <NavBar />

      <Switch>
        <Route path="/establishment/:slug" component={EstablishmentPage} />

        <Route path="/search" exact component={EstablishmentsPage} />

        <Route path="/register" exact>
          {loggedIn ? <Redirect to="/" /> : <RegisterPage />}
        </Route>

        <Route path="/login" exact>
          {loggedIn ? <Redirect to="/" /> : <LoginPage />}
        </Route>

        <Route path="/" exact component={HomePage} />

        <Route path="*" component={NotFoundPage} />
      </Switch>

      <Footer />
    </div>
  );
}

export default App;
