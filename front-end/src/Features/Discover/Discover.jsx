import React, { useState, useEffect } from "react";
import EventCard from "../../Events/EventCard";
import { sendRequest } from "../../Utils/apiEvents";
import "./Discover.css";
import { Link } from "react-router-dom";
import soccerIcon from "../../assets/images/Soccer.png";
import footballIcon from "../../assets/images/Football.png";
import basketballIcon from "../../assets/images/Basketball.png";
import volleyballIcon from "../../assets/images/Volleyball.png";
import danceIcon from "../../assets/images/Dance.png";
import yogaIcon from "../../assets/images/Yoga.png";

const Discover = () => {
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

  const categoryImages = {
    Soccer: soccerIcon,
    Football: footballIcon,
    Basketball: basketballIcon,
    Volleyball: volleyballIcon,
    Dance: danceIcon,
    Yoga: yogaIcon,
  };

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
            <button key={cat} onClick={() => handleCategoryClick(cat)} className="category-button">
              <img src={categoryImages[cat]} alt={cat} className="category-icon" />
            </button>
          ))}
        </div>
      </div>

      {loading && <p>Loading Events</p>}
      
      {!loading && filteredEvents.length > 0 && (
        <div className="event-grid">

          {filteredEvents.map((event) => (
            <Link
              to={`/event/${event.id}`}
              state={{ event }}
              key={event.id}
              className="event-card-link"
            >
              <EventCard event={event} preview={true} />
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default Discover;
