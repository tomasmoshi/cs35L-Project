// src/App/App.jsx
import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import ModalButton from "../Features/ModalButton/ModalButton.jsx";
import Discover from "../Features/Discover/Discover.jsx";
import "./App.css";


function App() {
  return (
    <Router>
    <div>
      <div className="container">
        <nav className="navbar">
          <h1 className="logo">AllExercises</h1>
          <div className="nav-buttons">
            <ModalButton label="Login" modalType="login" />
            <ModalButton label="Help" modalType="help" />
            <ModalButton label="About Us" modalType="about" />
            <ModalButton label ="Discover" modalType="discover"/>
          </div>
        </nav>
        <Routes>
          <Route path="/discover" element = {<Discover />}/>
        </Routes>
      </div>
    </div>
    </Router>
  );
}

export default App;
