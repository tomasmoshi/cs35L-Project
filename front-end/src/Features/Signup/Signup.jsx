// Signup.jsx
import React, { useState, useEffect } from "react";
import { sendRequest } from "../../Utils/apiEvents";
import "./Signup.css";


const Signup = ({onClose}) => {
  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [emailError, setEmailError] = useState("");
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

  const triggerButtonShake = () => {
    const buttons = document.querySelectorAll(".submit-btn");
    //This line fixed a the big where the upload image would shake, and now it looks for the last button instead of the first one automatically.
    const signUpButton = buttons[buttons.length - 1]; 
  
    if (signUpButton) {
      signUpButton.classList.add("shake-btn");
      setTimeout(() => {
        signUpButton.classList.remove("shake-btn");
      }, 1000);
    }
  };
  
  
  const validatePassword = (password, username) => {
    if (password.length < 8) {
      return "Your password must contain at least 8 characters.";
    }
    if (!isNaN(password)) {
      return "Your password can't be entirely numeric.";
    }
    if (password.toLowerCase().includes(username.toLowerCase())) {
      return "Your password can't be too similar to your personal information.";
    }
    const commonPasswords = ["password", "123456", "qwerty", "abc123", "password1"];
    if (commonPasswords.includes(password.toLowerCase())) {
      return "Your password can't be a commonly used password.";
    }
    return null;
  };
  
  const handleSubmit = async (e) => {
    localStorage.removeItem("token");
    e.preventDefault();
    setUsernameError("");
    setEmailError("");
    setPasswordError("");
  
    const formData = new FormData(e.currentTarget);
    const password = formData.get("password");
    const confirmPassword = formData.get("confirm_password");
    const username = formData.get("username");
    const email = formData.get("email");
  
    const passwordValidationError = validatePassword(password, username);
    if (passwordValidationError) {
      setPasswordError(passwordValidationError);
      triggerButtonShake();
      return;
    }
  
    if (password !== confirmPassword) {
      setPasswordError("Passwords do not match!");
      triggerButtonShake();
      return;
    }
  
    if (profileImage) {
      formData.append("profile_image", profileImage);
    }
  
    try {
      const data = await sendRequest("http://127.0.0.1:8000/api/users/", "POST", formData);
  
      if (!data) {
        setUsernameError("Username already taken.");
        triggerButtonShake();
        return;
      }
  
      if (data.error || data.detail) {
        const errMsg = (data.error || data.detail).toLowerCase();
  
        if (errMsg.includes("username") || errMsg.includes("already taken") || errMsg.includes("unique constraint failed")) {
          setUsernameError("Username already taken.");
        } else if (errMsg.includes("email") || errMsg.includes("email already exists")) {
          setEmailError("Email is already taken.");
        } else if (errMsg.includes("password")) {
          setPasswordError(data.error || data.detail);
        } else {
          setUsernameError(data.error || data.detail);
        }
  
        triggerButtonShake();
        return;
      }
  
      if (data.token && data.username && data.success) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("username", data.username);
        setProfileImage(null);
        setPreview(null);
        e.target.reset();
        onClose();
      }
    } catch (error) {
      const errMsg = error.toString().toLowerCase();
  
      if (errMsg.includes("email") || errMsg.includes("email already exists")) {
        setEmailError("Email is already taken.");
      } else {
        setPasswordError(error.toString());
      }
  
      triggerButtonShake();
    }
  };
  

  return (
    <div className="signup-modal">
      <button className="close-btn" onClick={onClose}>&times;</button>
      <form onSubmit={handleSubmit} className="signup-form">
        <h2>Sign Up</h2>
          <div className="input-group">
            <input type="text" placeholder="First Name" name="first_name" required />
            <input type="text" placeholder="Last Name" name="last_name" required />
          </div>
          <input type="text" placeholder="Username" name="username" required />
          {usernameError && <p className="error">{usernameError}</p>}
          <input type="email" placeholder="Email" name="email" required />
          {emailError && <p className="error">{emailError}</p>}
          <input type="password" placeholder="Password" name="password" required />
          <input type="password" placeholder="Confirm Password" name="confirm_password" required />
          {passwordError && <p className="error">{passwordError}</p>}
          <div className="password-instructions">
            <ul>
              <li>Your password can't be too similar to your personal information.</li>
              <li>Your password must contain at least 8 characters.</li>
              <li>Your password can't be a commonly used password.</li>
              <li>Your password can't be entirely numeric.</li>
            </ul>
          </div>
          {preview && <img src={preview} alt="Profile Preview" className="image-preview" />}
          <label className="submit-btn">
            <input type="file" id="imageInput" accept="image/*" onChange={handleImageChange} />
            Upload Image
            </label>
          <button type="submit" className="submit-btn">Sign Up</button>
      </form>
    </div>
  );
};

export default Signup;