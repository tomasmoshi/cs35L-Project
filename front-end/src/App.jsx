import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Login from "./login";
import Discover from "./Discover";
import "./App.css";


function AboutExercise({ onClose }) {
  return (
    <div className="about">
      <div className="about-content">
        <h2>About Us!</h2>
        <p>
          <strong>Creators of the website:</strong>
        </p>
        <ul>
          <li>Tomas Moshi: 3rd year Computer Science and Engineering major</li>
          <li>Adhia Amini: 3rd year Computer Science and Engineering major</li>
          <li>Sina Ghadimi: 4th year Electrical Engineering major</li>
          <li>Amaras Issagholian: 3rd year Computer Science major</li>
          <li>Shervin Shahidi Asl: 3rd year Computer Science major</li>
        </ul>
        <p>
          As students we understand that it is difficult to maintain a healthy 
          balance between academics and having a healthy life style. We built this platform 
          in order to help students find easy and fun exercises like tennis, basketball, and yoga. 
          We aim to connect students with similar interests in order to build long lasting relationships.
          
        </p>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
}


function AboutUsButton() {
  const [showAbout, setShowAbout] = useState(false);

  const handleButtonClick = () => {
    setShowAbout(true);
  };

  const handleCloseAbout = () => {
    setShowAbout(false);
  };

  return (
    <div>
      <button onClick={handleButtonClick} className="about-us-button">
        About Us
      </button>
      {showAbout && <AboutExercise onClose={handleCloseAbout} />}
    </div>
  );
}


function HelpModal({ onClose }) {
  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Welcome to AllExercises!</h2>
        <p>Here are some instructions to help you get started with AllExercises:</p>
        <ul>
          <li>
            <strong>Sign Up:</strong> Click the "Sign up" button at the top right and create an account. Verify via email and you're set!
          </li>
          <li>
            <strong>After logging in</strong> you can search for different sports/workouts and even post events for others to join.
          </li>
          <li>
            <strong>Post an Event:</strong>
            <ul>
              <li>Navigate to the "Post Event" section.</li>
              <li>Select an exercise type (e.g., Basketball, Tennis, etc.).</li>
              <li>Fill in the details (location, date, time, etc.).</li>
              <li>Submit your event for others to join.</li>
            </ul>
          </li>
          <li>
            <strong>Join an Event:</strong>
            <ul>
              <li>Browse the list of upcoming events on our homepage.</li>
              <li>Click on an event to view details.</li>
              <li>If interested, click the "Join" button to participate.</li>
            </ul>
          </li>
        </ul>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
}


function NeedHelpButton() {
  const [showModal, setShowModal] = useState(false);

  const handleButtonClick = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div>
      <button onClick={handleButtonClick} className="need-help-button">
        Need Help?
      </button>
      {showModal && <HelpModal onClose={handleCloseModal} />}
    </div>
  );
}


function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isSignUpMode, setIsSignUpMode] = useState(false);

  const openLogin = () => {
    setIsLoginOpen(true);
    setIsSignUpMode(false);
  };

  const openSignUp = () => {
    setIsLoginOpen(true);
    setIsSignUpMode(true);
  };

  const closeLogin = () => {
    setIsLoginOpen(false);
    setIsSignUpMode(false);
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        closeLogin();
      }
    };
    if (isLoginOpen) {
      document.addEventListener("keydown", handleKeyDown);
    } else {
      document.removeEventListener("keydown", handleKeyDown);
    }
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isLoginOpen]);

  return (
    <div className="container">
      <nav className="navbar">
        <h1 className="logo">AllExercises</h1>
        <button className="login-btn" onClick={openLogin}>Login</button>
      </nav>
      
      <section className={`search-section ${isLoginOpen ? "blur-background" : ""}`}>
        <h2>Find Exercise Events</h2>
        <div className="search-container">
          <input
            type="text"
            placeholder="Search for events..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button className="search-btn">Search</button>
        </div>
      </section>

      <section className={`event-list ${isLoginOpen ? "blur-background" : ""}`}>
        <h3>Popular Events</h3>
        <ul>
          <li><strong>Basketball</strong></li>
          <li><strong>Tennis</strong></li>
          <li><strong>Swimming</strong></li>
          <li><strong>Golf</strong></li>
          <li><strong>Dodgeball</strong></li>
          <li><strong>Weight Training</strong></li>
          <li><strong>Pilates</strong></li>
        </ul>
      </section>

      {}
      <NeedHelpButton />
      <AboutUsButton />
    </div>
  );
}

export default App;
