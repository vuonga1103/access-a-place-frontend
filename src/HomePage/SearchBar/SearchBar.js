import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import styles from "./SearchBar.module.css";

export default function SearchBar(props) {
  const location = useLocation();
  const dispatch = useDispatch();

  let initialSearchState;

  if (location.pathname === "/") {
    initialSearchState = { term: "", location: "" };
  } else if (location.search) {
    const params = new URLSearchParams(location.search);
    const termParam = params.get("find_desc");
    const locationParam = params.get("find_loc");
    initialSearchState = {
      term: termParam || "",
      location: locationParam || "",
    };
  }

  const [search, setSearch] = useState(initialSearchState);

  const history = useHistory();

  const handleChange = (e) =>
    setSearch({ ...search, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!search.location || !search.term) {
      const missingField = !search.term ? "term" : "location";
      alert("Please enter search " + missingField);
    } else {
      const urlEncodedTerm = encodeURI(search.term);
      const urlEncodedLocation = encodeURI(search.location);

      dispatch({ type: "SET_NOT_LOADED" });
      history.push(
        `/search?find_desc=${urlEncodedTerm}&find_loc=${urlEncodedLocation}`
      );
    }
  };

  return (
    <form
      className={`${styles["search-container"]} field has-addons`}
      onKeyDown={(e) => e.key === "Enter" && handleSubmit(e)}
    >
      <div className="control">
        <div className={`button is-static ${props.small ? "is-small" : ""}`}>
          FIND
        </div>
      </div>

      <div className="control">
        <input
          className={`input ${props.small ? "is-small" : ""}`}
          type="text"
          placeholder="restaurants, gyms, etc."
          name="term"
          onChange={handleChange}
          value={search.term}
        />
      </div>
      <div className="control">
        <div className={`button is-static ${props.small ? "is-small" : ""}`}>
          NEAR
        </div>
      </div>
      <div className="control">
        <input
          className={`input ${props.small ? "is-small" : ""}`}
          type="text"
          placeholder="city, state, or zip"
          name="location"
          onChange={handleChange}
          value={search.location}
        />
      </div>
      <div className="control">
        <div
          className={`button is-primary ${props.small ? "is-small" : ""} ${
            styles["search-button"]
          }`}
          onClick={handleSubmit}
        >
          <i className="fas fa-search"></i>
        </div>
      </div>
    </form>
  );
}
