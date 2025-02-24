//EventList.jsx
import React, { useState, useEffect } from "react";
import "./EventList.css";
import { sendRequest } from "../Utils/EventsUtils";
import EventCard from "./EventCard";
import EventForm from "./EventForm";

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

  // If you want to fetch on every keystroke:
  const handleChange = (e) => {
    const newValue = e.target.value;
    setSearchQuery(newValue);
    // Trigger fetch on every change:
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
        // If you only want to search on button click, remove the fetch call from handleChange
      />
      <div className="events-list">
        {events.length === 0 ? (
          <p className="no-events">No events found.</p>
        ) : (
          events.map((event) => <EventCard key={event.id} event={event} />)
        )}
      </div>
    </div>
  );
};

export default EventsList;
