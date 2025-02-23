// EventsList.js
import React, { useState, useEffect } from "react";
import "./EventList.css";
import { sendRequest } from "../Utils/EventsUtils"; // Adjust the path as needed
import EventCard from "./EventCard";
import EventForm from "./EventForm";

const EventsList = () => {
  const [events, setEvents] = useState([]);

  // Fetch events from the backend
  const fetchEvents = async () => {
    const data = await sendRequest("http://127.0.0.1:8000/api/events/", "GET", null);
    if (data) {
      setEvents(data);
    }
  };
  useEffect(() => {
    fetchEvents();
  }, []);

  // Callback to update the events list when a new event is submitted
  const handleEventSubmitted = (newEvent) => {
    // Option 1: Prepend the new event to the current list
    // setEvents((prevEvents) => [newEvent, ...prevEvents]);
    // Option 2: Re-fetch the entire list if needed
    fetchEvents();
  };

  return (
    <div className="events-container">
      <h2>Events</h2>
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
