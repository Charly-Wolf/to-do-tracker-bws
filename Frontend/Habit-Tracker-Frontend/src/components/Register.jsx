// Author: Carlos Paredes

import { useState } from "react";
// import { useNavigate } from "react-router-dom";
import axios from "axios";

const client = axios.create({
  baseURL: "http://127.0.0.1:5000/api/register",
});

function Register() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [lastname, setLastname] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [error, setError] = useState("");
  const [registeredSuccessful, setregisteredSuccessful] = useState(false);
  // const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send data to the backend via POST
      await client.post("", {
        email: email,
        name: name,
        lastname: lastname,
        password: password,
        password2: password2,
      });

      // navigate("/login");
      setregisteredSuccessful(true);
    } catch (err) {
      setError(err.response.data.message);
    }
  };

  return (
    <div className="container h-100">
      <br />
      <br />
      <br />
      <br />
      <div className="row h-100 justify-content-center align-items-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              {!registeredSuccessful ? (
                <>
                  <h2 className="text-center">Register</h2>
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
                        type="text"
                        className="form-control"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="First name"
                        required
                      />
                    </div>
                    <br />
                    <div className="form-group">
                      <input
                        type="text"
                        className="form-control"
                        id="lastname"
                        value={lastname}
                        onChange={(e) => setLastname(e.target.value)}
                        placeholder="Lastname"
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
                    <div className="form-group">
                      <input
                        type="password"
                        className="form-control"
                        id="password2"
                        value={password2}
                        onChange={(e) => setPassword2(e.target.value)}
                        placeholder="Repeat Password"
                        required
                      />
                    </div>
                    <br />
                    <button type="submit" className="btn btn-primary btn-block">
                      Register
                    </button>
                    {/* Display the error message with Bootstrap danger style */}
                    {error && (
                      <div className="alert alert-danger mt-3">{error}</div>
                    )}
                  </form>
                </>
              ) : (
                <div className="container">
                  <div className="alert alert-warning" role="alert">
                    <h4 className="alert-heading">
                      Account Activation Pending
                    </h4>
                    <hr />
                    <p className="mb-0">
                      Please have some patience until an Admin activates your
                      account 😁
                    </p>
                  </div>
                </div>
              )}
              <p className="mt-3 text-center">
                Do you already have an ACTIVATED account?{" "}
                <a href="/login">Login</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
