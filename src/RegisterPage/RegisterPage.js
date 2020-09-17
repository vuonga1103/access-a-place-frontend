import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import styles from "./RegisterPage.module.css";

const RegisterPage = (props) => {
  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    password_confirm: "",
  });

  const history = useHistory();
  const dispatch = useDispatch();

  const handleRegisterSubmit = (e) => {
    e.preventDefault();

    fetch("http://localhost:4000/users", {
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

  const handleResponse = (resp) => {
    if (resp.error) {
      alert(resp.error);
    } else {
      localStorage.token = resp.token;
      dispatch({ type: "SET_USER_INFORMATION", payload: resp });
      history.push("/");
    }
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className={styles["form-container"]}>
      <form className={styles.form} onSubmit={handleRegisterSubmit}>
        <h3 className="title">Register</h3>
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
        <div className="control">
          <button className="button is-link" onClick={handleRegisterSubmit}>
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default RegisterPage;
