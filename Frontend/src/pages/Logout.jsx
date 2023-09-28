import { Navigate } from "react-router-dom";
import axios from "axios";
import PropTypes from "prop-types";
import { useEffect } from "react";

const client = axios.create({
  baseURL: "http://127.0.0.1:5000/", // Connection with the Backend
});

function Logout({ setIsLoggedIn, setIsAdmin }) {
  

  useEffect(() => {
    client.get("api/logout");
    
    setIsLoggedIn(false);
    setIsAdmin(false);
  }, [setIsLoggedIn, setIsAdmin])
  

  localStorage.removeItem("userId");
  localStorage.removeItem("userType");

  return <Navigate to="/login" />;
}

Logout.propTypes = {
  setIsLoggedIn: PropTypes.func.isRequired,
  setIsAdmin: PropTypes.func.isRequired,
};

export default Logout;
