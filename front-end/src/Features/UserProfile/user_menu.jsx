import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import images from "../../assets/images/user.png";
import "../../App/App.css";

const UserMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);
  const navigate = useNavigate();

  const toggleMenu = () => setIsOpen(!isOpen);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="user-dropdown-container" ref={menuRef}>
      {/* Profile Image - Click to Open Dropdown */}
      <img
        src={images}
        alt="Profile"
        className="profile-icon"
        onClick={toggleMenu}
      />

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="dropdown-menu">
          <button className="dropdown-item" onClick={() => navigate("/account")}>
            View Profile
          </button>
          <button className="dropdown-item" onClick={() => navigate("/settings")}>
            Settings
          </button>
          <button
            className="dropdown-item logout-btn"
            onClick={() => {
              localStorage.removeItem("token");
              window.location.reload();
            }}
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
