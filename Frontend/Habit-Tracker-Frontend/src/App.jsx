import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import "bootstrap/dist/css/bootstrap.css";
import Info from "./pages/Info";
import LogOut from "./pages/LogOut";
import LoginPage from "./pages/LoginPage";
import Stats from "./pages/Stats";
import HabitNeu from "./pages/HabitNeu";

function App() {

  return (
    <>
      <div className="card text-center border-0">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/info" element={<Info />} />
          <Route path="/logout" element={<LogOut />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/stats" element={<Stats />} />
          <Route path="/habitNeu" element={<HabitNeu />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
