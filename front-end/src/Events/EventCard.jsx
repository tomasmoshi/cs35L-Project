// EventCard.js
import React from "react";
import "./test_Events.css";

const EventCard = ({ event }) => {

  // console.log("Event object:", event); // Check if title exists
  const imageUrl = event.image && event.image.startsWith("http")
    ? event.image
    : `http://localhost:8000${event.image}`;
  
  return (
    <div className="event-card">
      <h3 className="event-title">Title:{event.title}</h3>
      {event.image && (
        <img
          src={imageUrl}
          alt={event.title || "Event Image"}
          className="event-image"
        />
      )}
      
      <div className="event-header">
        <span className="event-user">By: {event.author}</span>
        {/* Only display date if it exists */}
        {event.date_posted && (
          <span className="event-date">
            {new Date(event.date_posted).toLocaleString()}
          </span>
        )}
      </div>
      <p className="event-text">{event.content}</p>
    </div>
  );
};

export default EventCard;
