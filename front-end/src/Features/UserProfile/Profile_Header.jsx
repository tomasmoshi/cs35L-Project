import React from "react";
import images from "../../assets/images/user.png";
import "../../App/App.css";

const ProfileHeader = ({ user, setEditing }) => {
    return (
      <div className="profile-header">
        <div className="cover-photo"></div>
        <img src={user.profile_image && images} alt="Profile" className="profile-pic" />
        <h2>{user.username}</h2>
        <p className="bio">{user.bio || "Add a bio..."}</p>
        <button onClick={() => setEditing(true)}>Edit Profile</button>
        {/* User Details */}
        <div className="account-details">
        <h2>Profile Details</h2>
        <p><strong>Username:</strong> {user.username}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>First Name:</strong> {user.first_name}</p>
        <p><strong>Last Name:</strong> {user.last_name}</p>
      </div>
      </div>
    );
  };
  
  export default ProfileHeader;