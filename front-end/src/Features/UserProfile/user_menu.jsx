import React, { useState, useRef, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../Context/UserContext";
import images from "../../assets/images/user.png";
import apiUsers from "../../Utils/apiUsers";

const UserMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, setUser } = useContext(UserContext);
  const menuRef = useRef(null);
  const navigate = useNavigate();
  const profileImageUrl = user?.profile_image ? `http://127.0.0.1:8000${user.profile_image}` : images;

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;
      try {
        const data = await apiUsers("http://127.0.0.1:8000/api/users/me/", "GET");
        setUser(data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    fetchUserData();
  }, [setUser]);

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
        src={profileImageUrl}
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
