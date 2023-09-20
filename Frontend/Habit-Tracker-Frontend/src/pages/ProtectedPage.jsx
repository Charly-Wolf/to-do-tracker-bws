import { Navigate } from "react-router-dom";
import PropTypes from "prop-types";
import UserList from "./UserList";
import LoginPage from "./LoginPage";
import RegisterPage from "./RegisterPage"

function ProtectedPage({ children }) {
  const userId = localStorage.getItem("userId");
  if (children.type != LoginPage && children.type != RegisterPage ) {
    if (userId && userId != undefined) {
      if (children.type === UserList) {
        const isAdmin = localStorage.getItem("userType") == "admin";
        if (!isAdmin) {
          return <Navigate to="/" />;
        }
      }
      return children;
    } else {
      return <Navigate to="/login" />;
    }
  }
  if (userId && userId != undefined) {
    return <Navigate to="/" />;
  }
  return children;
}

ProtectedPage.propTypes = {
  children: PropTypes.element,
};

export default ProtectedPage;
