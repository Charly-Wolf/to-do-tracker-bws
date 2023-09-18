import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import NavBar from './components/NavBar';
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home';
import 'bootstrap/dist/css/bootstrap.css'
import Info from './pages/Info';
import LogOut from './pages/LogOut'
import Stats from './pages/Stats';
import HabitNeu from './pages/HabitNeu';

function App() {

    return (
        <>
            <div className="card text-center">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/info" element={<Info />} />
                    <Route path="/logout" element={<LogOut />} />
                    <Route path="/stats" element={<Stats/>} />
                    <Route path="/habitNeu" element={<HabitNeu/>} />
                </Routes>
            </div>
        </>
    )
}

export default App