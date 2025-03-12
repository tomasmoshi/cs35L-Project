import React from "react";
import "./EventCard.css";
import { formatDate } from "../Utils/DateHelper";

const EventCard = ({ event, preview = false }) => {

  const imageUrl = event.image && event.image.startsWith("http")
    ? event.image
    : `http://localhost:8000${event.image}`;
  
  return (
    <div className="event-card">
      <div className="event-user">{event.author}</div>
      <h3 className="event-title">{event.title}</h3>
      {event.image && (
        <img
          src={imageUrl}
          alt={event.title || "Event Image"}
          className="event-image"
        />
      )}
      <div>{!preview && <p className="event-text">{event.content}</p>}</div>
      <div className="event-header-date">
        <div >{event.date_posted && (
          <span className="event-date">
            {formatDate(event.date_posted)}
          </span>
        )}</div> 
      </div>
    </div>
  );
};

export default EventCard;
