import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import "bootstrap/dist/css/bootstrap.css";
import Info from "./pages/Info";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import Stats from "./pages/Stats";
import UserList from "./pages/UserList";
import ProtectedPage from "./pages/ProtectedPage";
import Logout from "./pages/Logout";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import { useState } from "react";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("userId")); // !! converts the expression into a boolean value.
  const [isAdmin, setIsAdmin] = useState(localStorage.getItem("userType") === "admin");
  const [currentPage, setCurrentPage] = useState("login");

  return (
    <>
      <div className="card text-center border-0">
        <NavBar isLoggedIn={isLoggedIn} isAdmin={isAdmin} currentPage={currentPage}/>
        <Routes>
          <Route path="/"
            element={
              <ProtectedPage>
                <Home setCurrentPage={setCurrentPage} />
              </ProtectedPage>
            }
          />
          <Route path="/info" element={<Info setCurrentPage={setCurrentPage} />} />
          <Route path="/login"
            element={
              <ProtectedPage>
                <LoginPage
                  setIsAdmin={setIsAdmin}
                  setIsLoggedIn={setIsLoggedIn}
                  setCurrentPage={setCurrentPage}
                />
              </ProtectedPage>
            }
          />
          <Route path="/register"
            element={
              <ProtectedPage>
                <RegisterPage setCurrentPage={setCurrentPage} />
              </ProtectedPage>
            }
          />
          <Route path="/stats"
            element={
              <ProtectedPage>
                <Stats />
              </ProtectedPage>
            }
          />
          <Route path="/userList"
            element={
              <ProtectedPage>
                <UserList setCurrentPage={setCurrentPage} />
              </ProtectedPage>
            }
          />
          <Route path="/logout"
            element={
              <Logout setIsAdmin={setIsAdmin} setIsLoggedIn={setIsLoggedIn} />
            }
          />
        </Routes>
        <Footer />
      </div>
    </>
  );
}

export default App;
