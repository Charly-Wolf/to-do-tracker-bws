// Author: Carlos Paredes

import UsersTable from "../components/UsersTable";
import PropTypes from "prop-types";

export default function UserList({ setCurrentPage }) {
  setCurrentPage("userList")
  return <UsersTable />;
}

UserList.propTypes = {
  setCurrentPage: PropTypes.func.isRequired
};