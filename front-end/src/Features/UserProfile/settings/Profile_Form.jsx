import React, { useState, useContext, useEffect } from "react";
import { UserContext } from "../../Context/UserContext";
import apiUsers from "../../../Utils/apiUsers";
import "./Settings.css";

const ProfileForm = ({ setEditing }) => {
  const { user, refreshUser } = useContext(UserContext);
  const [updatedUser, setUpdatedUser] = useState({});
  const [previewImage, setPreviewImage] = useState(null);
  const [editing, setLocalEditing] = useState(setEditing !== undefined);

  useEffect(() => {
    if (user) {
      setUpdatedUser({
        username: user?.username || "",
        first_name: user?.first_name || "",
        last_name: user?.last_name || "",
        email: user?.email || "",
      });
    }
  }, [user]);

  const handleInputChange = (e) => {
    setUpdatedUser({ ...updatedUser, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPreviewImage(URL.createObjectURL(file));
      setUpdatedUser({ ...updatedUser, profile_image: file });
    }
  };

  const handleSave = async () => {
    try {
      let formData = new FormData();
      Object.keys(updatedUser).forEach((key) => {
        if (updatedUser[key]) formData.append(key, updatedUser[key]);
      });

      if (updatedUser.profile_image instanceof File) {
        formData.append("profile_image", updatedUser.profile_image);
      }

      const response = await apiUsers("http://127.0.0.1:8000/api/users/me/edit/", "PUT", formData, true);

      if (response) {
        await refreshUser();
        if (setEditing) setEditing(false);
        setLocalEditing(false);
      }
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  if (!user) return (
    <div className="loading">
      <p>Loading...</p>
    </div>
    );

  return (
    <div className="settings-container">
      <h1 className="settings-title">Profile Settings</h1>
      <p className="settings-subtitle">Update your profile information and preferences.</p>

      {/* Profile Image Section */}
      <div className="profile-image-container">
        <div className="profile-image" style={{ backgroundImage: `url(${previewImage || user.profile_image || "default.png"})` }} />
        {editing && (
          <>
            <label htmlFor="upload-input" className="change-image-btn">Change Your Profile Picture</label>
            <input id="upload-input" type="file" accept="image/*" onChange={handleImageChange} style={{ display: "none" }} />
          </>
        )}
      </div>

      {/* Profile Details */}
      <div className="settings-form">
        {!editing ? (
          <>
            <p><strong>Username:</strong> {user.username}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>First Name:</strong> {user.first_name}</p>
            <p><strong>Last Name:</strong> {user.last_name}</p>
            <div className="settings-btn-container">
              <button className="settings-btn save-btn" onClick={() => setLocalEditing(true)}>Edit Profile</button>
            </div>
          </>
        ) : (
          <>
            <label>Username</label>
            <input type="text" name="username" value={updatedUser.username} onChange={handleInputChange} />

            <label>First Name</label>
            <input type="text" name="first_name" value={updatedUser.first_name} onChange={handleInputChange} />

            <label>Last Name</label>
            <input type="text" name="last_name" value={updatedUser.last_name} onChange={handleInputChange} />

            <label>Email</label>
            <input type="email" name="email" value={updatedUser.email} onChange={handleInputChange} />

            <div className="settings-btn-container">
              <button className="settings-btn save-btn" onClick={handleSave}>Save</button>
              <button className="settings-btn cancel-btn" onClick={() => setLocalEditing(false)}>Cancel</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ProfileForm;
