import React from "react";
import "./EventCard.css";
import { formatDate } from "../Utils/DateHelper";

const EventCard = ({ event }) => {

  const imageUrl = event.image && event.image.startsWith("http")
    ? event.image
    : `http://localhost:8000${event.image}`;
  
  return (
    <div className="event-card">
      <h3 className="event-title">{event.title}</h3>
      <br/>
      <span className="event-user">Posted by: {event.author}</span>
      {event.image && (
        <img
          src={imageUrl}
          alt={event.title || "Event Image"}
          className="event-image"
        />
      )}
      <p className="event-text">{event.content}</p>
      <div className="event-header">
        <span className="event-user">By: {event.author}</span>
        {event.date_posted && (
          <span className="event-date">
            <div >Date posted: </div> 
            {formatDate(event.date_posted)}
          </span>
        )}
      </div>
      {event.tags && event.tags.length > 0 && (
        <div className="event-tags">
          {event.tags.map((tag, index) => (
            <span key={index} className="event-tag">
              {tag}
            </span>
          ))}
        </div>
      )}
    </div>
  );
};

export default EventCard;
