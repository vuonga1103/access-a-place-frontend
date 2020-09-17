import React from "react";
import { Route, Switch } from "react-router-dom";
import "./App.css";
import EstablishmentsPage from "./EstablishmentsPage/EstablishmentsPage";
import HomePage from "./HomePage/HomePage";
import LoginPage from "./LoginPage/LoginPage";
import NavBar from "./NavBar/NavBar";
import NotFoundPage from "./NotFoundPage/NotFoundPage";
import RegisterPage from "./RegisterPage/RegisterPage";

function App() {
  return (
    <div className="App">
      <NavBar />

      <Switch>
        <Route path="/establishment-page/:id">
          <EstablishmentsPage />
        </Route>

        <Route path="/results" exact>
          <EstablishmentsPage />
        </Route>

        <Route path="/register" exact>
          <RegisterPage />
        </Route>

        <Route path="/login" exact>
          <LoginPage />
        </Route>

        <Route path="/" exact>
          <HomePage />
        </Route>

        <Route path="*" component={NotFoundPage} />
      </Switch>
    </div>
  );
}

export default App;
