import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory, useLocation } from "react-router-dom";
import Logo from "../HomePage/Logo/Logo";
import SearchBar from "../HomePage/SearchBar/SearchBar";
import styles from "./NavBar.module.css";

export default function NavBar(props) {
  // TODO
  const handleBurgerClick = () => {};

  const loggedIn = useSelector((state) => state.userInformation.token);
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
    <nav
      className="navbar is-active"
      role="navigation"
      aria-label="main navigation"
    >
      <div className="navbar-brand">
        <Link to="/">
          <div className="navbar-item">
            <Logo />
          </div>
        </Link>

        <div
          role="button"
          className="navbar-burger burger"
          aria-label="menu"
          aria-expanded="false"
          data-target="navbarBasicExample"
          onClick={handleBurgerClick}
        >
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </div>
      </div>

      <div id="navbarBasicExample" className="navbar-menu">
        <div className="navbar-start">
          <div className="navbar-item">
            <Link to="/">Home</Link>
          </div>

          <div className="navbar-item">
            <Link to="/about">About</Link>
          </div>

          <div className="navbar-item">
            {location.pathname !== "/" && <SearchBar small />}
          </div>
          {/* <div className="navbar-item has-dropdown is-hoverable">
            <div className="navbar-link">More</div>

            <div className="navbar-dropdown">
              <div className="navbar-item">About</div>
              <div className="navbar-item">Jobs</div>
              <div className="navbar-item">Contact</div>
              <hr className="navbar-divider" />
              <div className="navbar-item">Report an issue</div>
            </div>
          </div> */}
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
