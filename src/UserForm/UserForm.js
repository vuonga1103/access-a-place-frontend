import React from "react";
import GoogleLogin from "react-google-login";
import styles from "./UserForm.module.css";

export default function UserForm(props) {
  const { handleSubmit, handleChange, handleResponse } = props;

  const handleGoogleLoginSuccess = (response) => {
    const { givenName, familyName, email, imageUrl } = response.profileObj;
    const userObj = {
      first_name: givenName || "",
      last_name: familyName || "",
      email: email,
      image_url: imageUrl || "",
    };

    fetch("http://localhost:4000/google-login", {
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

  const handleGoogleLoginFailure = (response) => {
    console.log("Log in unsuccessful. Please try again.");
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
      <div className={styles["google-login"]}>
        <h5 className="subtitle is-5">
          {props.register ? "Register" : "Log in "} with your Google account
        </h5>
        <GoogleLogin
          clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
          buttonText="Log In"
          onSuccess={handleGoogleLoginSuccess}
          onFailure={handleGoogleLoginFailure}
          cookiePolicy={"single_host_origin"}
          responseType="code,token"
        />
      </div>
    </div>
  );
}
