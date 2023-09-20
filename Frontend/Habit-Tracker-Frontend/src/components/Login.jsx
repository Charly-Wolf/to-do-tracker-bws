// Author: Carlos Paredes

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const client = axios.create({
  baseURL: "http://127.0.0.1:5000/api/login", // Connection with the Backend
});

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const requestData = {
        email: email,
        password: password,
      };

      // Send data to the backend via POST
      const response = await client.post("", requestData);

      // Save the user_id in the local storage of the Browser
      localStorage.setItem("userId", response.data.user_id);
      localStorage.setItem("userType", response.data.user_type);

      navigate("/");
    } catch (err) {
      setError(err.response.data.message);
    }
  };

  return (
    <div className="container h-100">
      <br />
      <br />
      <div className="row h-100 justify-content-center align-items-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h2 className="text-center">Login</h2>
              <br />
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                    required
                  />
                </div>
                <br />
                <div className="form-group">
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    required
                  />
                </div>
                <br />
                <button type="submit" className="btn btn-primary btn-block">
                  Login
                </button>
              </form>
              {/* Display the error message with Bootstrap danger style */}
              {error && <div className="alert alert-danger mt-3">{error}</div>}

              {/* TODO */}
              {/* <p className="mt-3 text-center">
                Forgot your <Link to="#">Password</Link>?
              </p> */}

              <p className="mt-3 text-center">
                You don&#39;t have an account yet?{" "}
                <Link to="/register">Register</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
