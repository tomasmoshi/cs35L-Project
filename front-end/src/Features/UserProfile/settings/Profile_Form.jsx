import React, { useState, useContext, useEffect } from "react";
import { UserContext } from "../../Context/UserContext";
import apiUsers from "../../../Utils/apiUsers";

const ProfileForm = ({ setEditing }) => {
  const { user, setUser, refreshUser } = useContext(UserContext);
  const [updatedUser, setUpdatedUser] = useState();
  const [previewImage, setPreviewImage] = useState(null);
  const [editing, setLocalEditing] = useState(setEditing !== undefined);

  useEffect(() => {
    if (user) {
      setUpdatedUser({
        username: user?.username || "",
        first_name: user?.first_name || "",
        last_name: user?.last_name || "",
        email: user?.email || "",
        bio: user?.bio || "",
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

      if (updatedUser.username) formData.append("username", updatedUser.username);
      if (updatedUser.first_name) formData.append("first_name", updatedUser.first_name);
      if (updatedUser.last_name) formData.append("last_name", updatedUser.last_name);
      if (updatedUser.email) formData.append("email", updatedUser.email);
      if (updatedUser.bio) formData.append("bio", updatedUser.bio);
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

  if (!user) return <p>Loading...</p>;

  return (
    <div>
      <h1>Profile Settings</h1>
      <p>Update your profile information and preferences.</p>

      <div className="account-box">
        <img 
          src={previewImage || (user?.profile_image ? `http://127.0.0.1:8000${user.profile_image}` : "default.png")} 
          alt="Profile" width={150} height={150} />
        <p>Change Image</p>
        {editing && <input type="file" onChange={handleImageChange} />}
      </div>

      <div className="account-details">
        {!editing ? (
          <>
            <p><strong>Username:</strong> {user.username}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>First Name:</strong> {user.first_name}</p>
            <p><strong>Last Name:</strong> {user.last_name}</p>
            <p><strong>Bio:</strong> {user.bio}</p>
            <button onClick={() => setLocalEditing(true)}>Edit Profile</button>
          </>
        ) : (
          <>
            <input type="text" name="username" value={updatedUser.username} onChange={handleInputChange} />
            <input type="text" name="first_name" value={updatedUser.first_name} onChange={handleInputChange} />
            <input type="text" name="last_name" value={updatedUser.last_name} onChange={handleInputChange} />
            <input type="email" name="email" value={updatedUser.email} onChange={handleInputChange} />
            <textarea name="bio" value={updatedUser.bio} onChange={handleInputChange} />
            <button onClick={handleSave}>Save</button>
            <button onClick={() => setLocalEditing(false)}>Cancel</button>
          </>
        )}
      </div>
    </div>
  );
};

export default ProfileForm;