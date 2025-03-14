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

  const [mapKey, setMapKey] = useState(0);
  const [showMap, setShowMap] = useState(false);
  const [location, setLocation] = useState(null);

  // When the modal is rendered, wait briefly then mount the map.
  useEffect(() => {
    const timer = setTimeout(() => setShowMap(true), 500); // Adjust delay as needed
    return () => clearTimeout(timer);
  }, []);

  // Callback from the GoogleMapComponent to capture the selected location.
  const handleLocationSelect = (coords) => {
    setLocation(coords);
  
  };

  // Merge the location into the event data when the event form is submitted.
  const handleEventSubmitted = (eventData) => {
    if (onEventSubmitted) {
      onEventSubmitted(eventData);
    }
    // Optionally, force the map to remount if needed.
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
            <EventForm
              onEventSubmitted={handleEventSubmitted}
              onClose={handleClose}
              location={location} 
            />
          </div>
          <div className="google-map-container">
            {showMap && (
              <GoogleMapComponent
                key={mapKey}
                onLocationSelect={handleLocationSelect}
                readOnly={false}
              />
            )}
          </div>
        </div>
      ) : (
        <Login onClose={handleClose} />
      )}
    </div>
  );
};

export default PostEvent;
