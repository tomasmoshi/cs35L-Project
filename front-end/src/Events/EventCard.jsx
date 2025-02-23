// EventCard.js
import React from "react";
import "./EventCard.css";
import { formatDate } from "../Utils/DateHelper";

const EventCard = ({ event }) => {

  // console.log("Event object:", event); // Check if title exists
  const imageUrl = event.image && event.image.startsWith("http")
    ? event.image
    : `http://localhost:8000${event.image}`;
  
  return (
    <div className="event-card">
      <h3 className="event-title">Title:{event.title}</h3>
      <span className="event-user">By: {event.author}</span>
      {event.image && (
        <img
          src={imageUrl}
          alt={event.title || "Event Image"}
          className="event-image"
        />
      )}
      <p className="event-text">{event.content}</p>
      <div className="event-header">
        {/* Only display date if it exists */}
        {event.date_posted && (
          <span className="event-date">
            <div >Date posted: </div> 
            {formatDate(event.date_posted)}
          </span>
        )}
      </div>
    </div>
  );
};

export default EventCard;
