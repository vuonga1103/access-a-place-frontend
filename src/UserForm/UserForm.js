import React from "react";
import styles from "./UserForm.module.css";

export default function UserForm(props) {
  const { handleSubmit, handleChange } = props;

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

      {/* <button className="button" onClick={handleGoogleLogin}>
        Log In With Google
      </button> */}
      <a href="http://localhost:4000/auth/google_oauth2">Log in with google</a>
    </div>
  );
}
