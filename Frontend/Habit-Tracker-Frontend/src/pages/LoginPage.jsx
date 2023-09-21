// Author: Carlos Paredes

import PropTypes from "prop-types";
import Login from "../components/Login";

export default function LoginPage({ setIsLoggedIn, setIsAdmin }) {
  return <Login setIsAdmin={setIsAdmin} setIsLoggedIn={setIsLoggedIn} />;
}

LoginPage.propTypes = {
  setIsLoggedIn: PropTypes.func.isRequired,
  setIsAdmin: PropTypes.func.isRequired,
};
