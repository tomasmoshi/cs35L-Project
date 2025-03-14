import React, { useState, useContext, useEffect } from "react";
import { UserContext } from "../../Context/UserContext";
import apiUsers from "../../../Utils/apiUsers";
import "./Settings.css";

const ProfileForm = ({ setEditing, setUser }) => {
  const { user, refreshUser } = useContext(UserContext);
  const [image, setImage] = useState(null); 

  const [updatedUser, setUpdatedUser] = useState({
    username: "",
    first_name: "",
    last_name: "",
    email: "",
    biography: "",
  });
  const [previewImage, setPreview] = useState(null);

  useEffect(() => {
    if (user) {
      setUpdatedUser({
        username: user?.username || "",
        first_name: user?.first_name || "",
        last_name: user?.last_name || "",
        email: user?.email || "",
        biography: user?.biography || "",
      });
    }
  }, [user]);

  const handleInputChange = (e) => {
    setUpdatedUser({ ...updatedUser, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSave = async () => {
    try {
      let formData = new FormData();
      Object.keys(updatedUser).forEach((key) => {
        if (updatedUser[key]) formData.append(key, updatedUser[key]);
      });
      if (image){
        formData.append("profile_image", image);
      }
    // Ensure `profile_image` is explicitly set to null if no new file is chosen


      const response = await apiUsers("http://127.0.0.1:8000/api/users/me/edit/", "PUT", formData, true);

      if (response) {
        await refreshUser();
        // setUser((user) => ({ ...user, biography: updatedUser.biography })); // Update user state with new bio
        setEditing(false);
      }
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  return (
    <div className="settings-container">
      <h1 className="settings-title">Profile Settings</h1>
      <p className="settings-subtitle">Update your profile information and preferences.</p>

      {/* Profile Image Section */}
      <div className="profile-image-container">
        <div className="profile-image" style={{ backgroundImage: `url(${previewImage || "default.png"})` }} />
        <label htmlFor="upload-input" className="change-image-btn">Change Your Profile Picture</label>
        <input id="upload-input" type="file" accept="image/*" onChange={handleImageChange} style={{ display: "none" }} />
      </div>

      {/* Profile Details */}
      <div className="settings-form">
        <label>Username</label>
        <input type="text" name="username" value={updatedUser.username} onChange={handleInputChange} />

        <label>First Name</label>
        <input type="text" name="first_name" value={updatedUser.first_name} onChange={handleInputChange} />

        <label>Last Name</label>
        <input type="text" name="last_name" value={updatedUser.last_name} onChange={handleInputChange} />

        <label>Email</label>
        <input type="email" name="email" value={updatedUser.email} onChange={handleInputChange} />

        <label>Bio</label>
        <textarea name="biography" value={updatedUser.biography} onChange={handleInputChange} placeholder="Add a short bio..." />

        <div className="settings-btn-container">
          <button className="settings-btn save-btn" onClick={handleSave}>Save</button>
          <button className="settings-btn cancel-btn" onClick={() => setEditing(false)}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default ProfileForm;
