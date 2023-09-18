import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import "bootstrap/dist/css/bootstrap.css";
import Info from "./pages/Info";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import Stats from "./pages/Stats";
import HabitNeu from "./pages/HabitNeu";
import UserList from "./pages/UserList";

function App() {
  return (
    <>
      <div className="card text-center border-0">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/info" element={<Info />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/stats" element={<Stats />} />
          <Route path="/habitNeu" element={<HabitNeu />} />
          <Route path="/userList" element={<UserList />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
