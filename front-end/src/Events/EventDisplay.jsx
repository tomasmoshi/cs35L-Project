import React, { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import EventCard from "./EventCard";
import { sendRequest } from "../Utils/EventsUtils";
import "./EventDisplay.css";

const EventDisplay = () => {
  const { id } = useParams();
  const location = useLocation();
  // Use the event data from state if available
  const [event, setEvent] = useState(location.state?.event || null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // If event data is already provided, do not fetch again
    if (event) return;
    const fetchEvent = async () => {
      try {
        setLoading(true);
        const data = await sendRequest(
          `http://127.0.0.1:8000/api/events/${id}/`,
          "GET"
        );
        setEvent(data);
      } catch (error) {
        console.error("Error fetching event:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
  }, [id, event]);

  if (loading) return <p>Loading event...</p>;
  if (!event) return <p>Event not found.</p>;

  return (
    <div className="display-event-container">
      {/* Render the full event details (description is shown because preview is false) */}
      <EventCard event={event} preview={false} />
    </div>
  );
};

export default EventDisplay;
