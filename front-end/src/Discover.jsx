import React, { useState, useEffect } from "react";
import "./Discover.css";
import basketballImage from "./images/basketball.png"; // Corrected import path
/*
* create an event picture icon that connects with the event
* take the time of the event
* get the location of the event from the 
*/
const eventsData = [
  {
    id: 1,
    title: "Basketball Tournament",
    date: "March 10, 2025",
    category: "Sports",
    image: basketballImage,
    // add image icon
  },
  {
    id: 2,
    title: "Tennis Championship",
    date: "March 15, 2025",
    category: "Sports",
  },
  {
    id: 3,
    title: "Yoga & Meditation",
    date: "April 5, 2025",
    category: "Health & Wellness",
  },
  {
    id: 4,
    title: "Marathon 2025",
    date: "April 20, 2025",
    category: "Running",
  },
];

const Discover = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredEvents, setFilteredEvents] = useState(eventsData);
  const [loading, setLoading] = useState(false);
  const [category, setCategory] = useState("All");

  // filter events based on the search
  useEffect(() => {
    setLoading(true);
    const timeoutId = setTimeout(() => {
      const filtered = eventsData.filter((event) =>
        event.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
        (category === "All" || event.category === category)
      );
      setFilteredEvents(filtered);
      setLoading(false);
    }, 500);
    return () => clearTimeout(timeoutId);
  }, [searchQuery, category]);
/* this discover page is used to show all the events that are posted on the site
*  I will need to pull the event page and have it used to showcase all the events on the website
*  then after taking it all, it will be used to display all the user set events
*/
  return (
    <div className="discover-container">
      <h1>Discover Events</h1>
      <h3>Explore popular events near you, browse by category, or check out some of the great community Events.</h3>
      <div className="search-container">
        <input
          type="text"
          placeholder="Search events..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="All">All Categories</option>
          <option value="Sports">Sports</option>
          <option value="Health & Wellness">Health & Wellness</option>
          <option value="Running">Running</option>
        </select>
      </div>

      {loading ? (
        <p>Loading events...</p>
      ) : (
        <div className="event-grid">
          {filteredEvents.length > 0 ? (
            filteredEvents.map((event) => (
              <div key={event.id} className="event-card">
            <img src={event.image} />
                <div className="event-info">
                  <h2>{event.title}</h2>
                  <p>{event.date}</p>
                  <span className="category">{event.category}</span>
                </div>
              </div>
            ))
          ) : (
            <p>No events found.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Discover;