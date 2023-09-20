import { Navigate } from "react-router-dom";
import axios from "axios";

const client = axios.create({
  baseURL: "http://127.0.0.1:5000/", // Connection with the Backend
});

function Logout() {
  client.get("api/logout");

  localStorage.removeItem("userId");
  localStorage.removeItem("userType");

  return <Navigate to="/login" />;
}

export default Logout;
