// PostEvent.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import EventForm from "../../Events/EventForm"; // Adjust the path as needed
import Login from "../Login/Login"; // Adjust the path as needed
import "../Help/HelpModal.css"
import "../../Events/EventForm.css"
import "./PostEvent.css"
const PostEvent = ({ onEventSubmitted, onClose }) => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const handleClose = () => {
    if (onClose) {
      onClose();
    } else {
      navigate("/account");
    }
  };

  return (
    <div className="post-event-modal">
      <div className="event-form-wrapper">
        {token ? (
          <EventForm onEventSubmitted={onEventSubmitted} onClose={handleClose} />
        ) : (
          <Login onClose={handleClose} />
        )}
      </div>
    </div>
  );
};

export default PostEvent;

