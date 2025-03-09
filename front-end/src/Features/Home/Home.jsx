import React from "react";
import { Link } from "react-router-dom";
import "./Home.css";
import bruinStrong from "../../assets/images/BruinStrong.png";

function Home() {
  return (
    <div className="hero-section">
      <div className="hero-content">
        <h1>Delightful Workouts<br />Start Here.</h1>
        <p>
          Set up an event page and invite friends.
          Host a memorable event today.
        </p>
        <Link to="/login">
          <button className="cta-button">Get Started!</button>
        </Link>
      </div>
      
      <div className="hero-image">
        {}
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
