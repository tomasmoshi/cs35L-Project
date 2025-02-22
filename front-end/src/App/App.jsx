// src/App/App.jsx
import React, { useState } from "react";
import "./App.css";
import ModalButton from "../Features/Home/ModalButton.jsx";

function App() {
  return (
    <div>
      <div className="container">
        <nav className="navbar">
          <h1 className="logo">AllExercises</h1>
          <div className="nav-buttons">
            <ModalButton label="Login" modalType="login" />
            <ModalButton label="Help" modalType="help" />
            <ModalButton label="About Us" modalType="about" />
          </div>
        </nav>
      </div>
    </div>
  );
}

export default App;
