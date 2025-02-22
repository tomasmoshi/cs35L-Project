import React, { useState } from "react";
import "./App/App.css"; // Ensure this path is correct

function Login({ isSignUpMode, onClose }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleEmailChange = (event) => setEmail(event.target.value);
  const handlePasswordChange = (event) => setPassword(event.target.value);
  const handleConfirmPasswordChange = (event) => setConfirmPassword(event.target.value);

  const handleSubmit = (event) => {
    event.preventDefault();
    // Add your login/sign-up logic here
    onClose();
  };

  return (
    <div className="login">
      <div className="login-box">
        <button className="close-btn" onClick={onClose}>&times;</button>
        <h2>{isSignUpMode ? "Sign Up" : "Login"}</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={handleEmailChange}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={handlePasswordChange}
            required
          />
          {isSignUpMode && (
            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
              required
            />
          )}
          <button type="submit" className="submit-btn">
            {isSignUpMode ? "Sign Up" : "Login"}
          </button>
        </form>
        <p>
          {isSignUpMode ? "Already have an account? " : "Don't have an account? "}
          <a href="#" onClick={isSignUpMode ? onClose : onClose}>
            {isSignUpMode ? "Login" : "Sign up"}
          </a>
        </p>
      </div>
    </div>
  );
}

export default Login;