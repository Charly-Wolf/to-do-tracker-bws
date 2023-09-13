import './components/NavBarStyles.css'
import { Link, useMatch, useResolvedPath } from "react-router-dom"

export default function Navbar() {
    return (

        <nav className="NavbarItems">
            <Link to="/" className="navbar-logo">
                Habit.Tracker
            </Link>
            <ul className="nav-menu">
                <CustomLink className="nav-links" to="/logout">Log Out</CustomLink>
                <CustomLink className="nav-links" to="/info">Info</CustomLink>
            </ul>
        </nav>
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