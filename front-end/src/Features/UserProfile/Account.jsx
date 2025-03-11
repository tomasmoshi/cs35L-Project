import React, { useEffect, useState } from "react";
import images from "../../assets/images/user.png";
import apiUsers from "../../Utils/apiUsers";
import "../../App/App.css";
import ProfileHeader from "./Profile_Header";
import EventTabs from "./User_Events";

const Account = () => {
  const [user, setUser] = useState(null);
  const [events, setEvents] = useState([]); // ✅ Store user's events
  const [error, setError] = useState(null);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchUserData = async () => {
      if (!token) return;
      try {
        const data = await apiUsers("http://127.0.0.1:8000/api/users/me/", "GET");
        if (data) {
          setUser(data);
          fetchUserEvents(data.id); // ✅ Fetch events created by the user
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        setError("Failed to fetch user data.");
      }
    };

    const fetchUserEvents = async (userId) => {
      try {
        const eventData = await apiUsers(`http://127.0.0.1:8000/api/events/?creator=${userId}`, "GET");
        setEvents(eventData);
      } catch (error) {
        console.error("Error fetching user events:", error);
      }
    };

    fetchUserData();
  }, [token]);

  if (!user) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="account-container">
      {/* Profile Header */}
      <ProfileHeader user={user} />

      {/* Show User's Events */}
      <h2 className="section-title">My Created Events</h2>
      <EventTabs events={events} />

    </div>
  );
};

export default Account;
