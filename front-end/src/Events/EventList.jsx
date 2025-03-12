// EventList.jsx
import React, { useState, useEffect } from "react";
import "./EventList.css";
import { sendRequest } from "../Utils/apiEvents";
import EventCard from "./EventCard";
import EventForm from "./EventForm";
import { Link } from "react-router-dom";

const EventsList = () => {
  const [events, setEvents] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const fetchEvents = async (url) => {
    try {
      const data = await sendRequest(url, "GET", null);
      if (data) {
        setEvents(data);
      }
    } catch (err) {
      console.error("Fetch error:", err);
    }
  };

  const handleChange = (e) => {
    const newValue = e.target.value;
    setSearchQuery(newValue);
    fetchEvents(`http://127.0.0.1:8000/api/events/?tags=${newValue}`);
  };

  return (
    <div className="events-container">
      <h2>Events</h2>
      <input
        className="textarea"
        type="text"
        placeholder="Search by tag..."
        value={searchQuery}
        onChange={handleChange} 
      />
      <div className="events-list">
        {events.length === 0 ? (
          <p className="no-events">No events found.</p>
        ) : (
          events.map((event) => (
            <Link to={`/event/${event.id}`} state={{ event }} key={event.id}>
              <EventCard event={event} />
            </Link>
          ))
        )}
      </div>
    </div>
  );
};

export default EventsList;
