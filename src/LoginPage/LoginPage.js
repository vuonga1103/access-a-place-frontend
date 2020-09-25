import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import UserForm from "../UserForm/UserForm";

const LoginPage = (props) => {
  const history = useHistory();
  const dispatch = useDispatch();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = (e) => {
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
      history.go(-1); // Take user back to page they were on before they clicked Log In
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
