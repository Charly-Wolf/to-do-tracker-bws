// Author: Carlos Paredes

import { useState, useEffect } from "react";
import axios from "axios";
import "../assets/css/usersTableStyles.css";

const client = axios.create({
  baseURL: "http://127.0.0.1:5000/", // Connection with the Backend
});

function UsersTable() {
  const [users, setUsers] = useState([]);
  const [usersError, setUsersError] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        await client.get("api/users").then((response) => {
          setUsers(response.data);
        });
      } catch (err) {
        setUsersError(err.response.data.message);
      }
    };
    fetchUsers();
  }, []);

  const toggleUserStatus = async (userId) => {
    // TODO: Implement the logic to activate a user
    const confirmed = confirm("User-Status ändern?");
    try {
      if (confirmed) {
        await client.put(`/api/users/toggle_user_status/${userId}`);

        // Update the user's account status in the component's local state
        setUsers((prevUsers) =>
          prevUsers.map((user) =>
            user.id === userId
              ? { ...user, account_activated: !user.account_activated }
              : user
          )
        );
      }
    } catch (err) {
      // TODO: // Handle errors
      console.error("Fehler beim Ändern vom User-Status:", err);
    }
  };

  const sortUsersByName = (a, b) => {
    // Compare first names
    const lastNameComparison = a.name.localeCompare(b.name);

    // If first names are the same, compare by last names
    if (lastNameComparison === 0) {
      return a.name.localeCompare(b.lastname);
    }

    return lastNameComparison;
  };

  // Sort the users array using the custom comparison function
  const sortedUsers = users.slice().sort(sortUsersByName);

  return (
    <>
      <h1>Userverwaltung</h1>
      <div className="col-10 users-table">
        {usersError ? (
          <div className="alert alert-danger mt-3">{usersError}</div>
        ) : (
          <table className="table table-striped table-hover table-bordered table-sm">
            <thead className="table-dark">
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Rolle</th>
                <th>Status</th>
                <th>Aktionen</th>
              </tr>
            </thead>
            <tbody>
              {sortedUsers.map((user) => (
                <tr key={user.id}>
                  <td>
                    {user.name} {user.lastname}
                  </td>
                  <td>{user.email}</td>
                  <td>
                    {user.userType === "admin" ? (
                      <span className="badge text-bg-primary">ADMIN</span>
                    ) : (
                      "Normaler User"
                    )}
                  </td>
                  <td>
                    {user.userType === "normal_user" &&
                      (user.account_activated ? (
                        <span className="badge text-bg-success">Aktiviert</span>
                      ) : (
                        <span className="badge text-bg-danger">Gesperrt</span>
                      ))}
                  </td>
                  <td>
                    {user.userType === "normal_user" && (
                      <>
                        <button
                          className={`btn btn-${
                            user.account_activated ? "danger" : "success"
                          }`}
                          onClick={() => toggleUserStatus(user.id)}
                        >
                          {user.account_activated ? (
                            <i className="bi bi-ban"></i>
                          ) : (
                            <i className="bi bi-check-circle"></i>
                          )}
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
}

export default UsersTable;
