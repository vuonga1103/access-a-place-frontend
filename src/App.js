import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, Route, Switch } from "react-router-dom";
import "./App.css";
import EstablishmentsPage from "./EstablishmentsPage/EstablishmentsPage";
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

  return (
    <div className="App">
      <NavBar />

      <Switch>
        <Route path="/establishment-page/:id">
          <EstablishmentsPage />
        </Route>

        <Route path="/search" exact>
          <EstablishmentsPage />
        </Route>

        <Route path="/register" exact>
          {loggedIn ? <Redirect to="/" /> : <RegisterPage />}
        </Route>

        <Route path="/login" exact>
          {loggedIn ? <Redirect to="/" /> : <LoginPage />}
        </Route>

        <Route path="/" exact>
          <HomePage />
        </Route>

        <Route path="*" component={NotFoundPage} />
      </Switch>

      <Footer />
    </div>
  );
}

export default App;
