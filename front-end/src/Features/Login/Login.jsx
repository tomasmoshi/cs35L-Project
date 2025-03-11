import React, { useState, useEffect } from "react";
import "../Help/HelpModal.css";
import Signup from "../Signup/Signup";
import { sendRequest } from "../../Utils/EventsUtils";


function Login({ onClose }) {
  const [isSignUpMode, setIsSignUpMode] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  const handleUsernameChange = (event) => setUsername(event.target.value);
  const handlePasswordChange = (event) => setPassword(event.target.value);

  const handleLoginSubmit = async (event) => {
    event.preventDefault();
    setErrorMsg("");

    // Use sendRequest helper to post the JSON payload
    const data = await sendRequest(
      "http://127.0.0.1:8000/api/users/login/",
      "POST",
      JSON.stringify({ username, password })
    );

    if (data && data.token) {
      localStorage.setItem("token", data.token);
      localStorage.setItem("username", data.username);
      onClose();
    } else {
      setErrorMsg(data && data.error ? data.error : "Login failed. Please try again.");
    }
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <button className="close-btn" onClick={onClose}>
          &times;
        </button>
        {isSignUpMode ? (
          <Signup />
        ) : (
          <>
            <h2>Login</h2>
            {errorMsg && <p className="error">{errorMsg}</p>}
            <form onSubmit={handleLoginSubmit}>
              <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={handleUsernameChange}
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
          <a href="#" onClick={() => setIsSignUpMode(!isSignUpMode)}>
            {isSignUpMode ? "Login" : "Sign up"}
          </a>
        </p>
      </div>
    </div>
  );
}

export default Login;