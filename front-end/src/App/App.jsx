// src/App/App.jsx
import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import ModalButton from "../Features/ModalButton/ModalButton.jsx";
import Discover from "../Features/Discover/Discover.jsx";
import "./App.css";
import EventDisplay from "../Events/EventDisplay.jsx";
import Signup from "../Features/Signup/Signup.jsx";
import EventForm from "../Events/EventForm.jsx";


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
        <EventForm onEventSubmitted={console.log}/>
        <Routes>
          <Route path="/discover" element = {<Discover />}/>
          <Route path="/event/:id" element={<EventDisplay />}/>
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </div>
    </div>
    </Router>
  );
}

export default App;
