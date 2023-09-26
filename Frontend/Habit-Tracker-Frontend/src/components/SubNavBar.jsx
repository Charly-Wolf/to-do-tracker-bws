// Author: Mahir Dzafic & Carlos Paredes

import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import AdditHabitModal from "./AdditHabitModal";

function SubNavBar({ activePage }) {
  return (
    <div className="card-header">
      <ul className="nav nav-pills card-header-pills nav-light bg-white">
        <li className="nav-item ms-auto">
          <Link
            className={activePage === "habits" ? "nav-link active" : "nav-link"}
            to="/"
          >
            <i className="bi bi-card-list"></i>
          </Link>
        </li>
        <li className="nav-item">
          <Link
            className={activePage === "stats" ? "nav-link active" : "nav-link"}
            aria-current="true"
            to="/stats"
          >
            <i className="bi bi-bar-chart-line"></i>
          </Link>
        </li>
        <li className="nav-item">
          <AdditHabitModal id={null} title={null}/>
        </li>
      </ul>
    </div>
  );
}

export default SubNavBar;

SubNavBar.propTypes = {
  activePage: PropTypes.string.isRequired,
};
