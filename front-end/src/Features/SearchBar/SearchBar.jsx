import React, { useState, useEffect } from "react";
import { sendRequest } from "../../Utils/apiEvents";
import "./SearchBar.css";
import EventCard from "../../Events/EventCard";
import { Link, useLocation } from "react-router-dom";

const SearchBar = ({ onSearchResults }) => {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [showResultsModal, setShowResultsModal] = useState(false);
  const location = useLocation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    try {
      setLoading(true);
      const url = `http://127.0.0.1:8000/api/events/?tags=${encodeURIComponent(query.trim())}`;
      const data = await sendRequest(url, "GET", null);
      if (onSearchResults) {
        onSearchResults(data);
      } else {
        setFilteredEvents(data);
        setShowResultsModal(true);
      }
    } catch (error) {
      console.error("Error fetching search results:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const handleClose = (event) => {
      if (event.type === "keydown" && event.key !== "Escape") return;
      setShowResultsModal(false);
      setFilteredEvents([]);
    };

    document.addEventListener("keydown", handleClose);
    return () => document.removeEventListener("keydown", handleClose);
  }, []);

  const closeResultsModal = () => {
    setShowResultsModal(false);
    setFilteredEvents([]);
  };

  return (
    <div className="searchbar-wrapper">
      <form className="searchbar-container" onSubmit={handleSubmit}>
        <input
          type="text"
          className="searchbar-input"
          placeholder="Search by tag..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button type="submit" className="searchbar-button">
          Search
        </button>
      </form>
      {showResultsModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button className="close-modal" onClick={closeResultsModal}>
              ✖
            </button>
            <h2>Search Results</h2>
            {loading ? (
              <p>Loading...</p>
            ) : filteredEvents.length > 0 ? (
              <div className="event-grid">
                {filteredEvents.map((event) => (
                  <Link
                    className="event-card-link"
                    to={`/event/${event.id}`}
                    state={{ event }}
                    key={event.id}
                  >
                    <EventCard event={event} preview={true} />
                  </Link>
                ))}
              </div>
            ) : (
              <p>No events found.</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchBar;

