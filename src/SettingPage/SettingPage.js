import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import UserForm from "../UserForm/UserForm";
import { BACKEND_BASE_URL } from "../utils/constants";

export default function SettingPage() {
  const user = useSelector((state) => state.userInformation);
  const dispatch = useDispatch();
  const history = useHistory();

  const [form, setForm] = useState({
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

    fetch(`${BACKEND_BASE_URL}/users/${user.id}`, {
      method: "PATCH",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `bearer ${localStorage.token}`,
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
      dispatch({ type: "SET_USER_INFORMATION", payload: resp });
      history.push(`/users/${resp.user.id}`);
      alert("Account Updated");
    }
  };

  return (
    <div>
      <UserForm
        edit
        handleSubmit={handleSubmit}
        handleChange={handleChange}
        handleResponse={handleResponse}
      />
    </div>
  );
}
