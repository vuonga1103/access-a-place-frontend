import React from "react";

import { GoogleAPI, GoogleLogin } from "react-google-oauth";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import styles from "./UserForm.module.css";

export default function UserForm(props) {
  const { handleSubmit, handleChange, handleResponse } = props;

  const user = useSelector((state) => state.userInformation);
  const dispatch = useDispatch();
  const history = useHistory();

  // Parse token object that Google sends back upon "Google Sign In" click, send token to backend so backend can fetch user's info and return a user and their token
  const responseGoogle = (google_response) => {
    const token = google_response.xc;

    const requestOptions = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${google_response.xc.access_token}`,
        "Content-Type": "application/json",
        access_token: `${google_response.xc.access_token}`,
      },
      body: JSON.stringify(token),
    };

    return fetch("http://localhost:4000/auth/request", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        handleResponse(result);
      });
  };

  const handleDeleteClick = () => {
    fetch(`http://localhost:4000/users/${user.id}`, {
      method: "DELETE",
      headers: { Authorization: `bearer ${localStorage.token}` },
    })
      .then((response) => response.json())
      .then((result) => {
        dispatch({ type: "LOG_USER_OUT" });
        localStorage.removeItem("token");
        history.push("/");
        alert("Account deleted.");
      });
  };

  return (
    <div className={styles["form-container"]}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <h3 className="title">
          {props.register && "Register"}
          {props.login && "Log In"}
          {props.edit && "Edit Your Account"}
        </h3>
        {props.register && (
          <>
            <div className="field">
              <label className="label">First Name</label>
              <div className="control">
                <input
                  className="input"
                  type="text"
                  name="first_name"
                  placeholder="First Name"
                  required
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="field">
              <label className="label">Last Name</label>
              <div className="control">
                <input
                  className="input"
                  type="text"
                  name="last_name"
                  placeholder="Last Name"
                  required
                  onChange={handleChange}
                />
              </div>
            </div>
          </>
        )}
        <div className="field">
          <label className="label">Email</label>
          <div className="control">
            <input
              className="input"
              type="email"
              name="email"
              placeholder="Email"
              required
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="field">
          <label className="label">Password</label>
          <div className="control">
            <input
              className="input"
              type="password"
              name="password"
              placeholder="Password"
              required
              onChange={handleChange}
            />
          </div>
        </div>
        {(props.register || props.edit) && (
          <div className="field">
            <label className="label">Confirm Password</label>
            <div className="control">
              <input
                className="input"
                type="password"
                name="password_confirm"
                placeholder="Confirm Password"
                required
                onChange={handleChange}
              />
            </div>
          </div>
        )}
        <div className="control">
          <button
            className={`button is-link ${styles["submit-button"]}`}
            onClick={handleSubmit}
          >
            Submit
          </button>
        </div>
        {props.edit && (
          <div className={styles.delete} onClick={handleDeleteClick}>
            Delete Your Account
          </div>
        )}
      </form>

      {!props.edit && (
        <div className={styles["oauth-login-container"]}>
          {" "}
          <GoogleAPI
            className="GoogleLogin"
            clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
          >
            <div>
              <GoogleLogin
                height="10"
                width="250px"
                text="Continue With Google"
                backgroundColor="#4285f4"
                access="offline"
                scope="email profile"
                onLoginSuccess={responseGoogle}
                onFailure={responseGoogle}
              />
            </div>
          </GoogleAPI>
        </div>
      )}
    </div>
  );
}
