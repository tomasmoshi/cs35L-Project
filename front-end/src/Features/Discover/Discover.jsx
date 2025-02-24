// src/Features/Home/Discover.jsx
import React, { useState, useEffect } from "react";
import EventCard from "../../Events/EventCard";
import { sendRequest } from "../../Utils/Events_utils";
import "./Discover.css";

const Discover = () => {
  const [filteredEvents, setFilteredEvents] = useState([]); // store and update filtered events
  const [loading, setLoading] = useState(false); // tracking api set to false to track by default
  
  //defining a function called fetchEvents that gets the events and pulls them from the database
  const fetchEvents = async () => {
    try {
    setLoading(true);
    //api call
    const data = await sendRequest("http://127.0.0.1:8000/api/events/", "GET");
    //if the date is available and has value, put it into events
    if(data) {
      setFilteredEvents(data);
    }
    //put it into an empty list
    else {
      setFilteredEvents([]);
    }
  }
    catch(error) {
      console.error("Error fetching events:",error);
    }
    finally {
      setLoading(false);
    }
  };
  useEffect ( () => {
    fetchEvents();
  },
[]
);

//making the discover page and loading the events for the users
  return (
    <div className="discover-container">
      <h1>Discover Events</h1>
      <h3>Explore popular events near you, browse by category, or check out community events.</h3>

      {loading && <p>Loading Events</p>}
      
      {!loading && filteredEvents.length > 0 && (
      <div className="event-grid">
        {filteredEvents.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>
    )}
  </div>
  );
};

export default Discover;
