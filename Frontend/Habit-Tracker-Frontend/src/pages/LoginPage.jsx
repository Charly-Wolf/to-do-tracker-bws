// Author: Carlos Paredes

import PropTypes from "prop-types";
import Login from "../components/Login";
import { useEffect } from "react";

export default function LoginPage({ setIsLoggedIn, setIsAdmin, setCurrentPage }) {
  useEffect(() => {
    setCurrentPage("login");
  }, [setCurrentPage]); // Empty dependency array to run the effect once
  return <Login setIsAdmin={setIsAdmin} setIsLoggedIn={setIsLoggedIn} />;
}

LoginPage.propTypes = {
  setIsLoggedIn: PropTypes.func.isRequired,
  setIsAdmin: PropTypes.func.isRequired,
  setCurrentPage: PropTypes.func.isRequired
};
