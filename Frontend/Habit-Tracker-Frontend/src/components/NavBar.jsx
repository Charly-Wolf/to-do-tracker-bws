// Authors: Mahir Dzafic, Carlos Paredes and Marius Schröder

import { Link } from "react-router-dom";
import "../components/ScreenStyles.css";
import PropTypes from "prop-types";
import trackYouLogo from "../assets/favicon2.png"

export default function NavBar({ isLoggedIn, isAdmin, currentPage }) {

  

  return (
    <div className="card-header p-0 border-0 sticky-top">
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark  ">
        <div className="container">
          <Link to="/" className="navbar-brand">
            <span className="brand-name">TrackYou</span> <img className="brand-logo" src={trackYouLogo} alt="TrackYou logo" />
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse ml-auto" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              {isLoggedIn && currentPage !== "home" && (
                <Link className="nav-link" aria-current="page" to="/">
                  <li
                    className="nav-item navbar-item"
                    style={{ "--i": "#65CCF2", "--j": "#2F80ED" }}
                  >
                    <i className="bi bi-card-checklist"></i>
                    <span className="title">Habit List</span>
                  </li>
                </Link>
              )}
              {isAdmin && currentPage !== "userList" && (
                <Link className="nav-link" aria-current="page" to="/userlist">
                  <li
                    className="nav-item navbar-item"
                    style={{ "--i": "#65CCF2", "--j": "#2F80ED" }}
                  >
                    <i className="bi bi-people"></i>
                    <span className="title">User List</span>
                  </li>
                </Link>
              )}
              {currentPage === "info" && !isLoggedIn && <Link className="nav-link" aria-current="page" to="/login">
                <li
                  className="nav-item navbar-item"
                  style={{ "--i": "rgb(106, 253, 8)", "--j": "rgb(5, 165, 130)" }}
                >
                  <i className="bi bi-box-arrow-in-right"></i>
                  <span className="title">Login</span>
                </li>
              </Link>}
              {currentPage !== "info" && <Link className="nav-link" aria-current="page" to="/info">
                <li
                  className="nav-item navbar-item"
                  style={{ "--i": "#65CCF2", "--j": "#2F80ED" }}
                >
                  <i className="bi bi-question-circle-fill"></i>
                  <span className="title">Info</span>
                </li>
              </Link>}
              {isLoggedIn && (
                <Link className="nav-link" to="/logout">
                  <li
                    className="nav-item navbar-item"
                    style={{ "--i": "#d44fae", "--j": "#ef1e22" }}
                  >
                    <i
                      className="bi-box-arrow-left"
                      style={{ marginRight: "9px" }}
                    ></i>
                    <span className="title">Log Out</span>
                  </li>
                </Link>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}

NavBar.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  isAdmin: PropTypes.bool.isRequired,
  currentPage : PropTypes.string.isRequired
};
