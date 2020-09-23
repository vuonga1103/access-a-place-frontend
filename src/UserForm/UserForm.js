import React from "react";
import ReactFacebookLogin from "react-facebook-login";
import GoogleLogin from "react-google-login";

import styles from "./UserForm.module.css";

export default function UserForm(props) {
  const { handleSubmit, handleChange, handleResponse } = props;

  const responseGoogle = (response) => {
    const { givenName, familyName, email, imageUrl } = response.profileObj;
    const userObj = {
      first_name: givenName || "",
      last_name: familyName || "",
      email: email,
      image_url: imageUrl || "",
    };
    postOauthUser(userObj);
  };

  const responseGoogleFailure = (response) => {
    console.log("Log in unsuccessful. Please try again.");
  };

  const responseFacebook = (response) => {
    debugger;
    const { name, email, picture } = response;
    const userObj = {
      first_name: name.substring(0, name.lastIndexOf(" ")) || "",
      last_name: name.substring(name.lastIndexOf(" ") + 1, name.length) || "",
      email: email,
      image_url: picture.data.url || "",
    };
    postOauthUser(userObj);
  };

  const postOauthUser = (userObj) => {
    fetch("http://localhost:4000/oauth-login", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userObj),
    })
      .then((response) => response.json())
      .then((result) => {
        handleResponse(result);
      });
  };

  return (
    <div className={styles["form-container"]}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <h3 className="title">
          {props.register && "Register"}
          {props.login && "Log In"}
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

        {props.register && (
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
      </form>
      <div className={styles["oauth-login-container"]}>
        <h5 className="subtitle is-5">
          {props.register ? "Register" : "Log in "} with your Google or Facebook
          account
        </h5>

        <div className={styles.buttons}>
          <div className={styles["google-btn"]}>
            <GoogleLogin
              clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
              buttonText="Log In With Google"
              onSuccess={responseGoogle}
              onFailure={responseGoogleFailure}
              cookiePolicy={"single_host_origin"}
              responseType="code,token"
            />
          </div>

          <div className={styles["fb-btn"]}>
            <ReactFacebookLogin
              appId={process.env.REACT_APP_FACEBOOK_APP_ID}
              fields="name,email,picture"
              callback={responseFacebook}
            />{" "}
          </div>
        </div>
      </div>
    </div>
  );
}
