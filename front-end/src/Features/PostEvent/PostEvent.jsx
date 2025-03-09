// PostEvent.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import EventForm from "../../Events/EventForm"; // Adjust the path as needed
import Login from "../Login/Login"; // Adjust the path as needed
import "../Help/HelpModal.css";

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
    <div className="modal">
      {token ? (
        <EventForm onEventSubmitted={onEventSubmitted} onClose={handleClose} />
      ) : (
        <Login onClose={handleClose} />
      )}
    </div>
  );
};

export default PostEvent;

