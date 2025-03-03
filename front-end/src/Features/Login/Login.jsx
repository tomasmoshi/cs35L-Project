// Login.jsx
import React, { useState, useEffect, useContext } from "react";
import apiService from "../../Utils/apiService";
import "../Help/HelpModal.css";
import Signup from "../Signup/Signup";
import { UserContext } from "../Context/UserContext.jsx";


function Login({ onClose }) {
  const {setUser} = useContext(UserContext);
  const [error, setError] = useState("");
  const [isSignUpMode, setIsSignUpMode] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailChange = (event) => setEmail(event.target.value);
  const handlePasswordChange = (event) => setPassword(event.target.value);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  // the handles for the email and password are used to update the state of the email and password fields
  const handleLoginSubmit = async (event) => {
    event.preventDefault(); // prevents the default form submission behavior
    try{
      // send a POST request to the login endpoint with the email and password
      const data = await apiService("/login/", "POST", {
        email: email,
        password: password,
      });
    // if the login is successful, set the user state to the response data
    setUser(data);
    // close the modal
    onClose("Login successful");
    } catch (error) {
      setError("Invalid email or password");
    }
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
          {isSignUpMode ? "Don't have an account? " : "Already have an account? "}
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