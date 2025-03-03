// PostEvent.jsx
import React from "react";
import EventForm from "../../Events/EventForm"; // Adjust the path as needed
import Login from "../Login/Login"; // Adjust the path as needed
import "../Help/HelpModal.css";
const PostEvent = ({ onClose, onEventSubmitted }) => {
  // Check if a token exists in localStorage
  const token = localStorage.getItem("token");
  return (
    <div className="modal">
        {/* <button className="close-btn" onClick={onClose}>&times;</button> */}
            {token ? (
                // Render the EventForm if the user is authenticated.
                <EventForm onEventSubmitted={onEventSubmitted} />
            ) : (
                // Otherwise, prompt the user to log in.
                <Login onClose={onClose} />
            )}
    </div>
  );
};

export default PostEvent;
