import { Navigate } from "react-router-dom";
import PropTypes from "prop-types";
import UserList from "./UserList";
import LoginPage from "./LoginPage";
import RegisterPage from "./RegisterPage"

function ProtectedPage({ children }) {
  const token = localStorage.getItem("token");
  if (children.type != LoginPage && children.type != RegisterPage ) {
    if (token && token != undefined) {
      console.log("THERE IS A TOKEN");
      if (children.type === UserList) {
        const isAdmin = localStorage.getItem("userType") == "admin";
        if (!isAdmin) {
          return <Navigate to="/" />;
        }
      }
      return children;
    } else {
      console.log("NO TOKEN");
      return <Navigate to="/login" />;
    }
  }
  if (token && token != undefined) {
    return <Navigate to="/" />;
  }
  return children;
}

ProtectedPage.propTypes = {
  children: PropTypes.element,
};

export default ProtectedPage;
