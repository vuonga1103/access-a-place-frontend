import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import styles from "./SearchBar.module.css";

export default function SearchBar(props) {
  const [search, setSearch] = useState(
    useSelector((state) => state.establishmentInformation.search)
  );
  const history = useHistory();
  const dispatch = useDispatch();

  const handleChange = (e) =>
    setSearch({ ...search, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch({ type: "SET_SEARCH", payload: search });
    history.push("/search");
  };

  return (
    <form>
      <div className={"field has-addons"}>
        <div className="control">
          <div
            className={`button is-static ${props.small ? "is-small" : null}`}
          >
            FIND
          </div>
        </div>
        <div className="control">
          <input
            className={`input ${props.small ? "is-small" : null}`}
            type="text"
            placeholder="restaurants, gyms, etc."
            name="term"
            onChange={handleChange}
            value={search.term}
            onKeyDown={(e) => e.key === "Enter" && handleSubmit(e)}
          />
        </div>
        <div className="control">
          <div
            className={`button is-static ${props.small ? "is-small" : null}`}
          >
            NEAR
          </div>
        </div>
        <div className="control">
          <input
            className={`input ${props.small ? "is-small" : null}`}
            type="text"
            placeholder="city, state, or zip"
            name="location"
            onChange={handleChange}
            value={search.location}
            onKeyDown={(e) => e.key === "Enter" && handleSubmit(e)}
          />
        </div>
        <div className="control">
          <div
            className={`button is-primary ${props.small ? "is-small" : null} ${
              styles["search-button"]
            }`}
            onClick={handleSubmit}
          >
            <i className="fas fa-search"></i>
          </div>
        </div>
      </div>
    </form>
  );
}
