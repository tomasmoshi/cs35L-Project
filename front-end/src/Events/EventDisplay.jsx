import React, { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import EventCard from "./EventCard";
import { sendRequest } from "../Utils/apiEvents.jsx";
import CommentList from "../Comments/CommentList.jsx";
import "./EventDisplay.css";

const EventDisplay = () => {
  const { id } = useParams();
  const location = useLocation();
  const [event, setEvent] = useState(location.state?.event || null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
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
      <EventCard event={event} preview={false} />
      {/* Pass the event id to CommentList */}
      <CommentList eventId={event.id} />
    </div>
  );
};

export default EventDisplay;
