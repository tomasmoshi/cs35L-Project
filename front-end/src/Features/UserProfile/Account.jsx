import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import apiUsers from "../../Utils/apiUsers";
import "../../App/App.css";
import"./Account.css";
import ProfileHeader from "./ProfileHeader";
import EventCard from "../../Events/EventCard";
import { UserContext } from "../Context/UserContext";

const Account = () => {
  const { user, setUser } = useContext(UserContext);
  const [events, setEvents] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  
  const [editing, setEditing] = useState(false);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchUserData = async () => {
      if (!token) return;
      try {
        const data = await apiUsers("http://127.0.0.1:8000/api/users/me/", "GET");
        setUser(data);
        fetchUserEvents(data.id);
      } catch (error) {
        console.error("Error fetching user data:", error);
        setError("Failed to fetch user data.");
      }
    };

    const fetchUserEvents = async (userId) => {
      setLoading(true);
      try {
        const eventData = await apiUsers(`http://127.0.0.1:8000/api/events/?author=${userId}`, "GET");
        console.log(eventData);
        setEvents(eventData);
      } catch (error) {
        console.error("Error fetching user events:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [token, setUser]);

  if (!user) return (
  <div className="loading">
    <p>Loading...</p>
  </div>
  );
  if (error) return <p>{error}</p>;

  return (
    <div className="account-container">
      <ProfileHeader user={user} setEditing={setEditing} />
      {loading && <p>Loading Events</p>}
      
      {!loading && events.length > 0 && (
        <div className="event-grid">
         {events.map((event) => (
            <Link to={`/event/${event.id}`} state={{ event }} key={event.id}>
              <EventCard event={event} preview={true} />
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default Account;
