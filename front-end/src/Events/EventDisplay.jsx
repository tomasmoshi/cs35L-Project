import React, { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import EventCard from "./EventCard";
import { sendRequest } from "../Utils/apiEvents.jsx";
import CommentList from "../Comments/CommentList.jsx";
import "./EventDisplay.css";

const EventDisplay = () => {
  const { id } = useParams();
  const location = useLocation();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadEvent = async () => {
      setLoading(true);
      try {
        if (location.state?.event && location.state.event.id.toString() === id) {
          setEvent(location.state.event);
        } else {
          const data = await sendRequest(`http://127.0.0.1:8000/api/events/${id}`, "GET");
          setEvent(data);
        }
      } catch (error) {
        console.error("Error fetching event:", error);
      } finally {
        setLoading(false);
      }
    };

    loadEvent();
  }, [id, location.state]);

  if (loading) {
    return <p>Loading event...</p>;
  }

  return (
    <div className="display-event-container">
      <div className="display-event-card">
        {event ? (
          <>
            <EventCard event={event} preview={false} />
            <CommentList eventId={event.id} />
          </>
        ) : (
          <p>Event not found.</p>
        )}
      </div>
    </div>
  );
};

export default EventDisplay;

