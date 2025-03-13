import React, { useState } from "react";

const EventTabs = ({ events }) => {
  const [activeTab, setActiveTab] = useState("myEvents");

  return (
    <div className="tabs-container">
      <div className="tabs">
        <button 
          className={activeTab === "myEvents" ? "active" : ""} 
          onClick={() => setActiveTab("myEvents")}
        >
          My Events
        </button>
      </div>

      <div className="tab-content">
        {activeTab === "myEvents" && events.length > 0 ? (
          <ul className="event-list">
            {events.map((event) => (
              <li key={event.id} className="event-item">
                <h3>{event.title}</h3>
                <p>{event.description}</p>
                <p><strong>Date:</strong> {new Date(event.date).toLocaleDateString()}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p>No events found.</p>
        )}
      </div>
    </div>
  );
};

export default EventTabs;
