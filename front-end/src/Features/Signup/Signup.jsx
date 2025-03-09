// Signup.jsx
import React, { useState, useEffect } from "react";
import { sendRequest } from "../../Utils/apiEvents";
import "../Help/HelpModal.css";

const Signup = ({onClose}) => {
  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [profileImage, setProfileImage] = useState(null);
  const [preview, setPreview] = useState(null);
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  const handleImageChange = (e) => {
    
    const file = e.target.files[0];
    if (file) {
      setProfileImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    localStorage.removeItem("token");
    e.preventDefault();
    // Clear previous errors
    setUsernameError("");
    setPasswordError("");

    // Client-side check for matching passwords


    const formData = new FormData(e.currentTarget);
    if (formData.get("password") !== formData.get("confirm_password")) {
      setPasswordError("Passwords do not match!");
      return;
    }
    if (profileImage) {
      formData.append("profile_image", profileImage);
    }

    try {
      const data = await sendRequest("http://127.0.0.1:8000/api/users/", "POST", formData);
      console.log("Response data:", data);
      // If no data is returned, treat it as a username error.
      if (!data) {
        setUsernameError("Username already taken.");
        return;
      }
      // Check for errors returned from the backend (using "error" or "detail" keys)
      if (data.error || data.detail) {
        const errMsg = (data.error || data.detail).toLowerCase();
        if (errMsg.includes("username") || errMsg.includes("already taken") || errMsg.includes("unique constraint failed")) {
          setUsernameError("Username already taken.");
        } else if (errMsg.includes("password")) {
          setPasswordError(data.error || data.detail);
        } else {
          // Fallback: assign error to usernameError if we can't classify
          setUsernameError(data.error || data.detail);
        }
        return;
      }
      if (data.token && data.username && data.success){
        localStorage.setItem("token", data.token);
        localStorage.setItem("username", data.username);
        setProfileImage(null);
        setPreview(null);
        e.target.reset();
        onClose();
      }
    } catch (error) {
      console.log("Error in signup:", error);
      const errMsg = error.toString().toLowerCase();
      if (errMsg.includes("unique constraint failed") || errMsg.includes("username")) {
        setUsernameError("Username already taken.");
      } else if (errMsg.includes("password")) {
        setPasswordError(error.toString());
      } else {
        setPasswordError(error.toString());
      }
    }
  };

  return (
    <div className="modal-content">
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        {usernameError && <p className="error">{usernameError}</p>}
        <input 
          type="text" 
          placeholder="Username" 
          name="username"
          required
        />
        {passwordError && <p className="error">{passwordError}</p>}
        <input 
          type="password" 
          placeholder="Password" 
          name="password"
          required
        />
        <input 
          type="password" 
          placeholder="Confirm Password"
          name="confirm_password" 
          required
        />
        <div className="password-instructions">
          <ul>
            <li>Your password can't be too similar to your other personal information.</li>
            <li>Your password must contain at least 8 characters.</li>
            <li>Your password can't be a commonly used password.</li>
            <li>Your password can't be entirely numeric.</li>
          </ul>
        </div>
        {preview && <img src={preview} alt="Profile Preview" className="image-preview" />}
        <label className="submit-btn">
          <input
            type="file"
            id="imageInput"
            accept="image/*"
            onChange={handleImageChange}
          />
          Upload Image
        </label>
        <input 
          type="text" 
          placeholder="First Name" 
          name="first_name"
          required
        />
        <input 
          type="text" 
          placeholder="Last Name" 
          name="last_name"
          required
        />
        <input 
          type="email" 
          placeholder="Email" 
          name="email"
          required
        />
        <button type="submit" className="submit-btn">Sign Up</button>
      </form>
    </div>
  );
};

export default Signup;