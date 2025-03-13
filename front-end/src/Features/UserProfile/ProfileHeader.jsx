import React from "react";
import defaultImage from "../../assets/images/user.png"; // Default profile image
import "./ProfileHeader.css"
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
      <div className="account-details">
        <h2>Profile Details</h2>
        <table>
          <tbody>
            <tr>
              <th>Username</th>
              <td>{user.username}</td>
            </tr>
            <tr>
              <th>Email</th>
              <td>{user.email}</td>
            </tr>
            <tr>
              <th>First Name</th>
              <td>{user.first_name}</td>
            </tr>
            <tr>
              <th>Last Name</th>
              <td>{user.last_name}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProfileHeader;
