import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory, useLocation } from "react-router-dom";
import SearchBar from "../HomePage/SearchBar/SearchBar";
import styles from "./NavBar.module.css";
import access_text from "../assets/access_text.png";

export default function NavBar(props) {
  const [isActive, setIsActive] = useState(false);

  const loggedIn = useSelector((state) => state.userInformation.token);
  const loggedInUser = useSelector((state) => state.userInformation);
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();

  const handleLogOut = () => {
    dispatch({ type: "LOG_USER_OUT" });
    localStorage.removeItem("token");
    history.push("/");
    alert("You have been logged out.");
  };

  return (
    <nav className="navbar" role="navigation" aria-label="main navigation">
      <div className="navbar-brand">
        <div className="navbar-item">
          <Link to="/">
            <img
              src={access_text}
              alt="access logo text"
              style={{ width: "190px" }}
            />
          </Link>
        </div>

        <div
          onClick={() => {
            setIsActive(!isActive);
          }}
          role="button"
          className={`navbar-burger burger ${isActive ? "is-active" : ""}`}
          aria-label="menu"
          aria-expanded="false"
          data-target="navbarBasicExample"
        >
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </div>
      </div>

      <div
        id="navbarBasicExample"
        className={`navbar-menu ${isActive ? "is-active" : ""}`}
      >
        <div className="navbar-start">
          {loggedIn && (
            <Link to={`/users/${loggedInUser.id}`} className="navbar-item">
              Home
            </Link>
          )}

          <Link to="/about" className="navbar-item">
            About
          </Link>

          <div className="navbar-item">
            {location.pathname !== "/" && <SearchBar small />}
          </div>
        </div>

        {!loggedIn ? (
          <div className="navbar-end">
            <div className="navbar-item">
              <div className="buttons">
                <Link to="/register">
                  <div
                    className={`button is-primary ${styles["signup-button"]}`}
                  >
                    <strong>Sign Up</strong>
                  </div>
                </Link>
                <Link to="/login">
                  <div className="button is-light">Log In</div>
                </Link>
              </div>
            </div>
          </div>
        ) : (
          <div className="navbar-end">
            <Link to="/setting" className="navbar-item">
              Settings
            </Link>
            <div className="navbar-item" onClick={handleLogOut}>
              <div className="buttons">
                <div className="button is-light">Log Out</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
