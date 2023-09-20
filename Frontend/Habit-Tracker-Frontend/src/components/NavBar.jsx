import { Link, useMatch, useResolvedPath } from "react-router-dom";
// import { Navbar, Nav, Container } from "react-bootstrap";
import "../components/ScreenStyles.css";

export default function NavBar() {
  return (
    <div className="card-header p-0 border-0">
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark  ">
        <div className="container">
          <Link to="/" className="navbar-brand">
            Habit-Tracker
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
              <li className="nav-item">
                <CustomLink
                  className="nav-link"
                  aria-current="page"
                  to="/userlist"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-people-fill"
                    viewBox="0 0 16 16"
                  >
                    <path d="M7 14s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1H7Zm4-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm-5.784 6A2.238 2.238 0 0 1 5 13c0-1.355.68-2.75 1.936-3.72A6.325 6.325 0 0 0 5 9c-4 0-5 3-5 4s1 1 1 1h4.216ZM4.5 8a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z" />
                  </svg>
                </CustomLink>
              </li>
              <li className="nav-item">
                <CustomLink className="nav-link" aria-current="page" to="/info">
                  Info&FAQ
                </CustomLink>
              </li>
              <li className="nav-item">
                <CustomLink className="nav-link" to="/login">
                  Log Out
                </CustomLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}

function CustomLink({ to, children, ...props }) {
  const resolvedPath = useResolvedPath(to);
  const isActive = useMatch({ path: resolvedPath.pathname, end: true });

  return (
    <li className={isActive ? "active" : ""}>
      <Link to={to} {...props}>
        {children}
      </Link>
    </li>
  );
}
