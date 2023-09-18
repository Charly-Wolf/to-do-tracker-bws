import { Link, useMatch, useResolvedPath } from "react-router-dom";
// import { Navbar, Nav, Container } from "react-bootstrap";
import "../components/ScreenStyles.css";

export default function NavBar() {
  return (
    <div className="card-header">
      <nav className="navbar bg-body-tertiary fixed-top navbar navbar-expand-lg bg-dark">
        <div className="container-fluid">
          <Link to="/" className="navbar-brand">
            Habit-Tracker
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse ml-auto" id="navbarNav">
            <ul className="navbar-nav ms-auto">
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
