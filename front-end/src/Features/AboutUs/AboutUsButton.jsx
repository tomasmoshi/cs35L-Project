// src/Features/AboutUs/AboutUsButton.jsx

import { useState } from "react";
import AboutExercise from "./AboutExercise";
import "./AboutUs.css";

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

export default AboutUsButton;
