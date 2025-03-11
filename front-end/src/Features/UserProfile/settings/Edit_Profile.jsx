import React, { useState } from "react";
import apiUsers from "../../../Utils/apiUsers";
import "../../../App/App.css";

const EditProfileForm = ({ updatedUser, setUpdatedUser, setEditing, setUser }) => {
  const [previewImage, setPreviewImage] = useState(null);

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
      const formData = new FormData();
      for (const key in updatedUser) {
        formData.append(key, updatedUser[key]);
      }

      await apiUsers("http://127.0.0.1:8000/api/users/me/", "PUT", formData);
      setUser(updatedUser);
      setEditing(false);
    } catch (err) {
      console.error("Error updating profile", err);
    }
  };

  return (
    <div className="edit-profile-form">
      <input type="text" name="bio" value={updatedUser.bio || ""} onChange={handleInputChange} placeholder="Update your bio" />
      <input type="file" onChange={handleImageChange} />
      {previewImage && <img src={previewImage} alt="Preview" width={100} />}
      <button onClick={handleSave}>Save</button>
      <button onClick={() => setEditing(false)}>Cancel</button>
    </div>
  );
};

export default EditProfileForm;
