// Signup.jsx
import React, { useState } from "react";
import { sendRequest } from "../../Utils/EventsUtils";
import "../Help/HelpModal.css";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [profileImage, setProfileImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Clear previous errors
    setUsernameError("");
    setPasswordError("");

    // Client-side check for matching passwords
    if (password !== confirmPassword) {
      setPasswordError("Passwords do not match!");
      return;
    }

    const formData = new FormData();
    formData.append("username", username);
    formData.append("password", password);
    formData.append("confirm_password", confirmPassword);
    formData.append("first_name", firstName);
    formData.append("last_name", lastName);
    formData.append("email", email);
    if (profileImage) {
      formData.append("profile_Image", profileImage);
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

      // On success (assuming data.success is returned), clear the form
      if (data.success) {
        console.log("Signup successful", data);
        setUsername("");
        setPassword("");
        setConfirmPassword("");
        setFirstName("");
        setLastName("");
        setEmail("");
        setProfileImage(null);
        setPreview(null);
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
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        {passwordError && <p className="error">{passwordError}</p>}
        <input 
          type="password" 
          placeholder="Password" 
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <input 
          type="password" 
          placeholder="Confirm Password" 
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
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
        <input 
          type="file" 
          accept="image/*" 
          onChange={handleImageChange}
        />
        {preview && <img src={preview} alt="Profile Preview" className="image-preview" />}
        <input 
          type="text" 
          placeholder="First Name" 
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          required
        />
        <input 
          type="text" 
          placeholder="Last Name" 
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          required
        />
        <input 
          type="email" 
          placeholder="Email" 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type="submit" className="submit-btn">Sign Up</button>
      </form>
    </div>
  );
};

export default Signup;
