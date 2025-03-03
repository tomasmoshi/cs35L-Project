// src/Pages/Home.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import "../Help/HelpModal.css"; 
import "./Home.css"; 

function Home() {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    
    navigate("/login");
  };

  return (
    <div className="home-page">
      <section className="hero-section">
        <div className="hero-content">
          <h1>Welcome to AllExercises</h1>
          <p>Your hub for discovering and sharing exciting events.</p>
          <button className="nav-button" onClick={handleGetStarted}>
            Get Started
          </button>
        </div>
      </section>
      {}
    </div>
  );
}

export default Home;
