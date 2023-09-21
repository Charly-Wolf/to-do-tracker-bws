// Author: Carlos Paredes

import Register from "../components/Register";
import PropTypes from "prop-types";

export default function RegisterPage({setCurrentPage}) {
  setCurrentPage("register");
  return <Register />;
}

RegisterPage.propTypes = {
  setCurrentPage: PropTypes.func.isRequired
};