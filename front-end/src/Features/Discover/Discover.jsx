// Discover.jsx
import React, { useState, useEffect } from "react";
import EventCard from "../../Events/EventCard";
import { sendRequest } from "../../Utils/apiEvents";
import "./Discover.css";
import { Link } from "react-router-dom";

const Discover = () => {
  console.log("Discover component rendered");
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchEvents = async () => {
    try {
      setLoading(true);
      const data = await sendRequest("http://127.0.0.1:8000/api/events/", "GET");
      if (data) {
        setFilteredEvents(data);
      } else {
        setFilteredEvents([]);
      }
    } catch (error) {
      console.error("Error fetching events:", error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch events based on category
  const handleCategoryClick = async (category) => {
    try {
      setLoading(true);
      const data = await sendRequest(
        `http://127.0.0.1:8000/api/events/?tags=${category}`,
        "GET"
      );
      if (data) {
        setFilteredEvents(data);
      } else {
        setFilteredEvents([]);
      }
    } catch (error) {
      console.error("Error fetching events for category:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const categories = ["Soccer", "Football", "Basketball", "Volleyball", "Dance", "Yoga"];

  return (
    <div className="discover-container">
      <h1>Discover Events</h1>
      <h3>
        Explore popular events near you, browse by category, or check out community events.
      </h3>

      <div className="category-container">
        <h2>Browse by Category</h2>
        <div className="categories">
          {categories.map((cat) => (
            <button key={cat} onClick={() => handleCategoryClick(cat)}>
              {cat}
            </button>
          ))}
        </div>
      </div>

      {loading && <p>Loading Events</p>}
      
      {!loading && filteredEvents.length > 0 && (
        <div className="event-grid">
         {filteredEvents.map((event) => (
          // Pass event data via state and set preview to true (so description is hidden)
          <Link to={`/event/${event.id}`} state={{ event }} key={event.id}>
            <EventCard event={event} preview={true} />
          </Link>
        ))}
      </div>
      )}
    </div>
  );
};

export default Discover;
