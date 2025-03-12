import React from "react";
import defaultImage from "../../assets/images/user.png"; // Default profile image

// added user profile image to the user profile page
const ProfileHeader = ({ user, setEditing }) => {
  if (!user) {
    return <p>Loading...</p>;
  }

  const profileImageUrl = user.profile_image 
    ? `http://127.0.0.1:8000${user.profile_image}` 
    : defaultImage;

  return (
    <div className="profile-header">
      <div className="cover-photo"></div>
      <img src={profileImageUrl} alt="Profile" className="profile-pic" />
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
