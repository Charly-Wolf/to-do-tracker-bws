// Author: Carlos Paredes

import Register from "../components/Register";
import PropTypes from "prop-types";
import { useEffect } from "react";

export default function RegisterPage({setCurrentPage}) {
  useEffect(() => setCurrentPage("register"), [setCurrentPage])
  
  return <Register />;
}

RegisterPage.propTypes = {
  setCurrentPage: PropTypes.func.isRequired
};