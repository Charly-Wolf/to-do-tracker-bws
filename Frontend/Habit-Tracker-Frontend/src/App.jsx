import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import NavBar from './components/NavBar'
import { Route, Routes } from "react-router-dom"

function App() {

  return (
      <>
          <Navbar />
          <div className="container">
              <Routes>
                  <Route path="/" element={<Home/>} />
              </Routes>
          </div>
    </>
  )
}

export default App
