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
      {event.tags && event.tags.length > 0 && (
        <div className="event-tags">
          <p>Tags: {event.tags.map((tag, index) => (
            <span key={index} className="event-tag">
              {tag}
            </span>
          ))}
          </p>
        </div>
      )}
      <div className="event-header">
        <div >Date posted: {event.date_posted && (
          <span className="event-date">
            {formatDate(event.date_posted)}
          </span>
        )}</div> 
      </div>
    </div>
  );
};

export default EventCard;
