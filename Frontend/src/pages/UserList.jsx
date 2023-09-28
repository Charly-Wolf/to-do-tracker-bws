// Author: Carlos Paredes

import UsersTable from "../components/UsersTable";
import PropTypes from "prop-types";
import { useEffect } from "react";

export default function UserList({ setCurrentPage }) {
  useEffect(() => {
    setCurrentPage("userList")
  }, [setCurrentPage])
  return <UsersTable />;
}

UserList.propTypes = {
  setCurrentPage: PropTypes.func.isRequired
};