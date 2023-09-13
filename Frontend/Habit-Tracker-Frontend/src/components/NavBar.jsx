//import "../components/NavBarStyles.css"
import { Link, useMatch, useResolvedPath } from "react-router-dom"
import {Navbar, Nav, Container} from "react-bootstrap"


export default function NavBar() {
    return (
<div class="container">
<nav class="navbar bg-body-tertiary fixed-top navbar navbar-expand-lg bg-dark">
  <div class="container-fluid">
    <Link to ="/" class="navbar-brand">Habit-Tracker</Link>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse ml-auto" id="navbarNav">
      <ul class="navbar-nav ms-auto">
        <li class="nav-item">
          <CustomLink class="nav-link" aria-current="page" to="/info">Info</CustomLink>
        </li>
        <li class="nav-item">
          <CustomLink class="nav-link" to="/logout">Log Out</CustomLink>
        </li>
      </ul>
    </div>
  </div>
</nav>
</div>
    )
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
    )
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