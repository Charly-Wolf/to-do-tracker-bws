// Author: Carlos Paredes

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import PropTypes from "prop-types";
import "../assets/css/loginStyles.css";
import LoadingSpinner from "./spinner";

const client = axios.create({
  baseURL: "http://127.0.0.1:5000/", // Connection with the Backend
});

function Login({ setIsLoggedIn, setIsAdmin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const requestData = {
        email: email,
        password: password,
      };

      // Send data to the backend via POST
      const response = await client.post("api/login", requestData);

      // Save the user_id in the local storage of the Browser
      localStorage.setItem("userId", response.data.user_id);
      localStorage.setItem("userType", response.data.user_type);

      navigate("/");
      setIsLoggedIn(true);
      setIsAdmin(response.data.user_type === "admin");
    } catch (err) {
      if (err.message != "Network Error") {
        setError(err.response.data.message);
      } else {
        setError("Connection with the Server failed");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="main-body">
      <div className="card main-card" id="login-card">
        <h2 className="text-center card-title">Login</h2>
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
              placeholder="Passwort"
              required
            />
          </div>
          <br />
          {isLoading ? (
            <div className="spinner-container">
              <LoadingSpinner />
            </div>
          ) : (
            <button type="submit" className="btn btn-primary btn-block">
              Login
            </button>
          )}
        </form>
        {/* Display the error message with Bootstrap danger style */}
        {error && <div className="alert alert-danger mt-3">{error}</div>}
        {/* TODO */}
        {/* <p className="mt-3 text-center">
          Forgot your <Link to="#">Password</Link>?
        </p> */}

        <p className="mt-3 text-center">
          Noch kein Konto?{" "}
          <Link to="/register">Registrieren</Link>
        </p>
      </div>
    </div>
  );
}

Login.propTypes = {
  setIsLoggedIn: PropTypes.func.isRequired,
  setIsAdmin: PropTypes.func.isRequired,
};

export default Login;
