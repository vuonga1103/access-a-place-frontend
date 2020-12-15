import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { useLastLocation } from "react-router-last-location";
import UserForm from "../UserForm/UserForm";
import { BACKEND_BASE_URL } from "../utils/constants";

const LoginPage = (props) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const lastLocation = useLastLocation();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch(`${BACKEND_BASE_URL}/login`, {
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

      if (lastLocation.pathname.startsWith("/establishment/")) {
        history.go(-1);
      } else {
        history.push(`/users/${resp.user.id}`);
      }
    }
  };

  return (
    <UserForm
      handleSubmit={handleSubmit}
      handleChange={handleChange}
      handleResponse={handleResponse}
      login
    />
  );
};

export default LoginPage;
