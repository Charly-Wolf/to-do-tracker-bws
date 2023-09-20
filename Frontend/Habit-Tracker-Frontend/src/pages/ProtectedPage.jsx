import { Navigate } from "react-router-dom";
import PropTypes from "prop-types";

function ProtectedPage({ children }) {
  const token = sessionStorage.getItem("token");
  if (token && token != undefined) {
    return children;
  } else {
    return <Navigate to="/login" />;
  }
}

ProtectedPage.propTypes = {
  children: PropTypes.element,
};

export default ProtectedPage;
