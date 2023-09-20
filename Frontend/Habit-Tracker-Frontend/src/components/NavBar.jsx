import { Link, useMatch, useResolvedPath } from "react-router-dom";
// import { Navbar, Nav, Container } from "react-bootstrap";
import "../components/ScreenStyles.css";

export default function NavBar() {
  const token = localStorage.getItem("token");
  const isLoggedIn = token && token != undefined;
  const isAdmin = localStorage.getItem("userType") == "admin";

  return (
    <div className="card-header p-0 border-0 sticky-top">
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
              {isAdmin && (
                <li className="nav-item">
                  <CustomLink
                    className="nav-link"
                    aria-current="page"
                    to="/userlist"
                  >
                    <i className="bi bi-people-fill"></i>
                  </CustomLink>
                </li>
              )}
              <li className="nav-item">
                <CustomLink className="nav-link" aria-current="page" to="/info">
                  <i className="bi bi-question-circle-fill"></i>
                </CustomLink>
              </li>
              {isLoggedIn && (
                <li
                  className="nav-item"
                  style={{
                    border: "1px solid white",
                    borderRadius: "5px",
                    marginLeft: "10px",
                  }}
                >
                  <button
                    onClick={() => {
                      localStorage.removeItem("token");
                      localStorage.removeItem("userType");
                    }}
                    style={{
                      cursor: "pointer",
                      border: "none",
                      background: "none",
                    }}
                  >
                    <CustomLink className="nav-link" to="/login">
                      <i
                        className="bi-box-arrow-left"
                        style={{ marginRight: "9px" }}
                      ></i>
                      Log Out
                    </CustomLink>
                  </button>
                </li>
              )}
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
