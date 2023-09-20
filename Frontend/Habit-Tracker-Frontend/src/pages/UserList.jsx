// Author: Carlos Paredes

import Footer from "../components/Footer";
import UsersTable from "../components/UsersTable";
import NavBar from "../components/NavBar";

export default function UserList() {
  return (
    <>
      <NavBar />
        <UsersTable />
      <Footer />
    </>
  );
}
