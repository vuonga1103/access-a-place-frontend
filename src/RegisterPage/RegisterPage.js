import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import UserForm from "../UserForm/UserForm";

const RegisterPage = (props) => {
  const history = useHistory();
  const dispatch = useDispatch();

  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    password_confirm: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (form.password !== form.password_confirm) {
      alert("Passwords do not match!");
      return;
    }

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
      history.push(`/users/${resp.user.id}`);
    }
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <UserForm
      handleChange={handleChange}
      handleSubmit={handleSubmit}
      handleResponse={handleResponse}
      register
    />
  );
};

export default RegisterPage;
