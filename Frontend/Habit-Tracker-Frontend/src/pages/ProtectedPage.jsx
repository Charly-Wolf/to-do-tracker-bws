import { Navigate } from "react-router-dom";
import PropTypes from "prop-types";
import UserList from "./UserList";

function ProtectedPage({ children }) {
  const token = sessionStorage.getItem("token");
  if (token && token != undefined) {
    if (children.type === UserList) {
      const isAdmin = sessionStorage.getItem("userType") == "admin";
      if (!isAdmin) {
        return <Navigate to="/" />;
      }
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
