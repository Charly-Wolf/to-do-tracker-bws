import { Navigate } from "react-router-dom";
import PropTypes from "prop-types";
import UserList from "./UserList";
import LoginPage from "./LoginPage";

function ProtectedPage({ children }) {
  const token = localStorage.getItem("token");
  if (token && token != undefined) {
    if (children.type === UserList) {
      const isAdmin = localStorage.getItem("userType") == "admin";
      if (!isAdmin) {
        return <Navigate to="/" />;
      }
    } else if (children.type === LoginPage) {
      return <Navigate to="/" />;
    }
    return children;
  } else {
    return <Navigate to="/login" />;
  }
}

ProtectedPage.propTypes = {
  children: PropTypes.element,
};

export default ProtectedPage;
