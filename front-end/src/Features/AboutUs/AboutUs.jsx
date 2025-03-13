import React, { useEffect } from "react";
import "./AboutUs.css";
function AboutUs({ onClose }) {

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);
  
  return (
    <div className="about-modal">
      <div className="about-content">
        <button className="close-btn" onClick={onClose}>&times;</button>
        <h2>About Us</h2>
        <p><strong>Creators of the website:</strong></p>
        <ul className="creator-list">
          <li><strong>Tomas Moshi:</strong> 3rd year Computer Science and Engineering major</li>
          <li><strong>Adhia Amini</strong>: 3rd year Computer Science and Engineering major</li>
          <li><strong>Sina Ghadimi</strong>: 4th year Electrical Engineering major</li>
          <li><strong>Amaras Issagholian</strong>: 3rd year Computer Science major</li>
          <li><strong>Shervin Shahidi Asl</strong>: 3rd year Computer Science major</li>
        </ul>
          <p>
            As students, we understand the challenges of maintaining a healthy balance 
            between academics and lifestyle. We built this platform to help students 
            find fun exercises like tennis, basketball, and yoga, fostering connections 
            and building long-lasting relationships.
          </p>
      </div>
    </div>
  );
}

export default AboutUs;
