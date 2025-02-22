import { useState, useEffect } from "react";
import "App/App.css";

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
export default AboutExercise;