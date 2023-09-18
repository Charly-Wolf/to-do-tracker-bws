import { Link, useMatch, useResolvedPath } from "react-router-dom";
import { Navbar, Nav, Container } from "react-bootstrap";

export default function NavBar() {
  return (
    <div className="card-header p-0">
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
                <CustomLink className="nav-link" aria-current="page" to="/info">
                  Info
                </CustomLink>
              </li>
              <li className="nav-item">
                <CustomLink className="nav-link" to="/logout">
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

//COULD BE HELPFUL, hier bitte stehen lassen. Mahir
// <nav className="NavbarItems">
//     <Link to="/" className="navbar-logo">
//         Habit.Tracker
//     </Link>
//     <ul className="nav-menu">
//         <CustomLink className="nav-links" to="/logout">Log Out</CustomLink>
//         <CustomLink className="nav-links" to="/info">Info</CustomLink>
//     </ul>
//     </nav>
