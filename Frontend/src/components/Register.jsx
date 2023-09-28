// Author: Carlos Paredes

import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "../assets/css/loginStyles.css";
import LoadingSpinner from "./spinner";

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
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Send data to the backend via POST
      await client.post("", {
        email: email,
        name: name,
        lastname: lastname,
        password: password,
        password2: password2,
      });

      setregisteredSuccessful(true);
    } catch (err) {
      if (err.message != "Network Error") {
        setError(err.response.data.message);
      } else {
        setError("Verbindung zum Server fehlgeschlagen.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="main-body">
      <div className="card main-card" id="register-card">
        {!registeredSuccessful ? (
          <>
            <h2 className="text-center card-title">Registrieren</h2>
            <br />
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <input
                  type="text"
                  className="form-control"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email"
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
                  placeholder="Vorname"
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
                  placeholder="Nachname"
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
              <div className="form-group">
                <input
                  type="password"
                  className="form-control"
                  id="password2"
                  value={password2}
                  onChange={(e) => setPassword2(e.target.value)}
                  placeholder="Passwort wiederholen"
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
                  Registrieren
                </button>
              )}
              {/* Display the error message with Bootstrap danger style */}
              {error && <div className="alert alert-danger mt-3">{error}</div>}
            </form>
          </>
        ) : (
          <div className="container">
            <div className="alert alert-warning" role="alert">
              <h4 className="alert-heading">Kontoaktivierung ausstehend</h4>
              <hr />
              <p className="mb-0">
                Wir bitten um Geduld 🙏🏻, bis ein Admin dein Konto aktiviert 😁
              </p>
            </div>
          </div>
        )}
        <p className="mt-3 text-center">
          Hast du schon ein AKTIVIERTES Konto? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
