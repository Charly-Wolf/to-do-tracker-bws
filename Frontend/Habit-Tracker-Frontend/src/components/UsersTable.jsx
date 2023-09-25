// Author: Carlos Paredes

import { useState, useEffect } from "react";
import axios from "axios";
import "../assets/css/usersTableStyles.css"

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
    const confirmed = confirm("Change user status?");
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
      console.error("Error toggling user status:", err);
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
      <div className="row justify-content-center main-container">
        <div className="col-10">
          <h1>Manage Users</h1>
          <br />
          {usersError ? (
            <div className="alert alert-danger mt-3">{usersError}</div>
          ) : (
            // <div className="row justify-content-center align-items-center">
            //   <div className="col-md-5">
            //     <div className="card">
            <table className="table table-striped table-hover table-bordered table-sm">
              <thead className="table-dark">
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {sortedUsers.map((user) => (
                  <tr key={user.id}>
                    <td>{user.name} {user.lastname}</td>
                    <td>{user.email}</td>
                    <td>
                      {user.userType === "admin" ? (
                        <span className="badge text-bg-primary">ADMIN</span> 
                      ) : ( 
                        "Normal User"
                      )}
                    </td>
                    <td>
                      {user.userType === "normal_user" && (
                        user.account_activated ? (
                          <span className="badge text-bg-success">Active</span>
                        ) : (
                          <span className="badge text-bg-danger">Blocked</span>
                        )
                      )}
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
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                fill="currentColor"
                                className="bi bi-ban d-flex"
                                viewBox="0 0 16 16"
                              >
                                <path d="M15 8a6.973 6.973 0 0 0-1.71-4.584l-9.874 9.875A7 7 0 0 0 15 8ZM2.71 12.584l9.874-9.875a7 7 0 0 0-9.874 9.874ZM16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0Z" />
                              </svg>
                            ) : (
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                fill="currentColor"
                                className="bi bi-check-circle d-flex"
                                viewBox="0 0 16 16"
                              >
                                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                                <path d="M10.97 4.97a.235.235 0 0 0-.02.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05z" />
                              </svg>
                            )}
                          </button>
                        </>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            //     </div>
            //   </div>
            // </div>
          )}
        </div>
      </div>
    </>
  );
}

export default UsersTable;
