// Login.jsx
import React, { useState, useEffect } from "react";
import "../Help/HelpModal.css";
import Signup from "../Signup/Signup";

function Login({ onClose }) {
  const [isSignUpMode, setIsSignUpMode] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  const handleEmailChange = (event) => setEmail(event.target.value);
  const handlePasswordChange = (event) => setPassword(event.target.value);

  const handleLoginSubmit = (event) => {
    event.preventDefault();
    // Add your login logic here
    onClose();
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <button className="close-btn" onClick={onClose}>
          &times;
        </button>
        {isSignUpMode ? (
          <>
            <Signup />
          </>
        ) : (
          <>
            <h2>Login</h2>
            <form onSubmit={handleLoginSubmit}>
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
              <button type="submit" className="submit-btn">
                Login
              </button>
            </form>
          </>
        )}
        <p>
          {isSignUpMode
            ? "Already have an account? "
            : "Don't have an account? "}
          <a
            href="#"
            onClick={() => setIsSignUpMode(!isSignUpMode)}
          >
            {isSignUpMode ? "Login" : "Sign up"}
          </a>
        </p>
      </div>
    </div>
  );
}

export default Login;
