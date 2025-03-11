import React from "react";
import "../../../App/App.css";

const LogoutButton = () => {
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    window.location.reload();
  };

  return (
    <button className="logout-btn" onClick={handleLogout}>Logout</button>
  );
};

export default LogoutButton;
