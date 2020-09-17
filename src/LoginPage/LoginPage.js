import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import styles from "./LoginPage.module.css";

const LoginPage = (props) => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const history = useHistory();
  const dispatch = useDispatch();

  const handleLoginSubmit = (e) => {
    e.preventDefault();

    fetch("http://localhost:4000/login", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    })
      .then((response) => response.json())
      .then((result) => handleResponse(result));
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleResponse = (resp) => {
    if (resp.error) {
      alert(resp.error);
    } else {
      localStorage.token = resp.token;
      dispatch({
        type: "SET_USER_INFORMATION",
        payload: resp,
      });
      history.push("/");
    }
  };

  return (
    <div className={styles["form-container"]}>
      <form className={styles.form} onSubmit={handleLoginSubmit}>
        <h3 className="title">Log In</h3>
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

        <div className="control">
          <button className="button is-link" onClick={handleLoginSubmit}>
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
