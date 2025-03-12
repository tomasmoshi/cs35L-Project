// src/Features/Home/Home.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";
import bruinStrong from "../../assets/images/BruinStrong.png";

function Home() {
  const navigate = useNavigate();

  const handleGetStartedClick = () => {
    const token = localStorage.getItem("token");

    if (token) {
      navigate("/eventform");
    } else {
      navigate("/login");
    }
  };

  return (
    <div className="hero-section">
      <div className="hero-content">
        <h1>Delightful Workouts<br />Start Here.</h1>
        <p>
          Set up an event page and invite friends.
          Host a memorable event today.
        </p>
        {}
        <button className="cta-button" onClick={handleGetStartedClick}>
          Get Started!
        </button>
      </div>
      
      <div className="hero-image">
        <img
          src={bruinStrong}
          alt="Bruin Strong"
          className="bruinstrong-3d"
        />
      </div>
    </div>
  );
}

export default Home;
