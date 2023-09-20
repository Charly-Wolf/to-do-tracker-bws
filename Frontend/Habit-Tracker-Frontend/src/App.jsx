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

function App() {
  return (
    <>
      <div className="card text-center border-0">
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedPage>
                <Home />
              </ProtectedPage>
            }
          />
          <Route
            path="/info"
            element={
              <ProtectedPage>
                <Info />
              </ProtectedPage>
            }
          />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route
            path="/stats"
            element={
              <ProtectedPage>
                <Stats />
              </ProtectedPage>
            }
          />
          <Route
            path="/userList"
            element={
              <ProtectedPage>
                <UserList />
              </ProtectedPage>
            }
          />
        </Routes>
      </div>
    </>
  );
}

export default App;
