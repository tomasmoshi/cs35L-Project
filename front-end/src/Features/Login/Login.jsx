// Login.jsx
import React, { useState, useEffect } from "react";
import "./Login.css";
import Signup from "../Signup/Signup";
import { sendLogin } from "../../Utils/apiLogin";

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

    const data = await sendLogin(
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

      const button = document.querySelector(".submit-btn");
      button.classList.add("shake-btn");

      setTimeout(() => {
        button.classList.remove("shake-btn");
      }, 1000);
    }
  };

  
  if (isSignUpMode) {
    return <Signup onClose={onClose} />;
  }

  return (
    <div className="login-modal">
      <div className="login-modal-content">
        <button className="close-btn" onClick={onClose}>
          &times;
        </button>
        <>
          <h2>Login</h2>
          {errorMsg && <p className="error">{errorMsg}</p>}
          <form onSubmit={handleLoginSubmit}>
            <div className="input-container">
              <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={handleUsernameChange}
                required
              />
            </div>
            <div className="input-container">
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={handlePasswordChange}
                required
              />
            </div>
            <div className="button-container">
              <button type="submit" className="submit-btn">
                Login
              </button>
            </div>
          </form>
        </>
        <p>
          {"Don't have an account? "}
          <a href="#" onClick={() => setIsSignUpMode(true)}>
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
}

export default Login;
