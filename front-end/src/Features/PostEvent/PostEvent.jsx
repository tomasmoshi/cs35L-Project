import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import EventForm from "../../Events/EventForm";
import Login from "../Login/Login";
import GoogleMapComponent from "../GoogleMap/GoogleMap";
import "../Help/HelpModal.css";
import "../../Events/EventForm.css";
import "./PostEvent.css";

const PostEvent = ({ onEventSubmitted, onClose }) => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  // If your parent doesn't pass an "open" prop, assume the modal is open when this component mounts.
  const [mapKey, setMapKey] = useState(0);
  const [showMap, setShowMap] = useState(false);

  // When the modal is rendered, wait briefly then mount the map.
  useEffect(() => {
    const timer = setTimeout(() => setShowMap(true), 500); // Adjust delay to your modal's open duration
    return () => clearTimeout(timer);
  }, []);

  const handleEventSubmitted = (eventData) => {
    if (onEventSubmitted) {
      onEventSubmitted(eventData);
    }
    // Remount the map if needed by forcing a new key.
    setMapKey((prevKey) => prevKey + 1);
  };

  const handleClose = () => {
    setShowMap(false); // Unmount the map before closing.
    if (onClose) {
      onClose();
    } else {
      navigate("/account");
    }
  };

  return (
    <div className="post-event-modal">
      {token ? (
        <div className="event-form-wrapper">
          <div className="event-form-container">
            <EventForm onEventSubmitted={handleEventSubmitted} onClose={handleClose} />
          </div>
          <div className="google-map-container">
            {showMap && <GoogleMapComponent key={mapKey} />}
          </div>
        </div>
      ) : (
        <Login onClose={handleClose} />
      )}
    </div>
  );
};

export default PostEvent;
