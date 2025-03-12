import React, { use, useEffect, useState, useContext } from "react";
import apiUsers from "../../Utils/apiUsers";
import "../../App/App.css";
import ProfileHeader from "./Profile_Header";
import EventTabs from "./User_Events";
import { UserContext } from "../Context/UserContext";
const Account = () => {
  const {user, setUser} = useContext(UserContext);
  const [events, setEvents] = useState([]);
  const [error, setError] = useState(null);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchUserData = async () => {
      if(!user) return;
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
  }, [user]);

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
