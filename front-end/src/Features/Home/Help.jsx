import React from "react";
import "./Style/HelpModal.css"

function Help({ onClose }) {
  return (
    <div className="modal">
      <div className="modal-content">
        <button className="close-btn" onClick={onClose}>&times;</button>
        <h2>Welcome to AllExercises!</h2>
        <p>Here are some instructions to help you get started:</p>
        <ul>
          <li>
            <strong>Sign Up:</strong> Click the "Sign up" button at the top right 
            and create an account. Verify via email and you're set!
          </li>
          <li>
            <strong>After logging in:</strong> Search for different sports/workouts 
            and even post events for others to join.
          </li>
          <li>
            <strong>Post an Event:</strong> Navigate to the "Post Event" section, 
            select an exercise type (e.g., Basketball, Tennis), and fill in the details.
          </li>
          <li>
            <strong>Join an Event:</strong> Browse the list of upcoming events on 
            the homepage and click "Join" to participate.
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Help;
