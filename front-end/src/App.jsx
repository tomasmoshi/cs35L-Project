import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isSignUpMode, setIsSignUpMode] = useState(false);

  const openLogin = () => {
    setIsLoginOpen(true);
    setIsSignUpMode(false);
  };

  const openSignUp = () => {
    setIsLoginOpen(true);
    setIsSignUpMode(true);
  };

  const closeLogin = () => {
    setIsLoginOpen(false);
    setIsSignUpMode(false);
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        closeLogin();
      }
    };
    if (isLoginOpen) {
      document.addEventListener("keydown", handleKeyDown);
    } else {
      document.removeEventListener("keydown", handleKeyDown);
    }
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isLoginOpen]);

  return (
    <div className="container">
      <nav className="navbar">
        <h1 className="logo">AllExercises</h1>
        <button className="login-btn" onClick={openLogin}>Login</button>
      </nav>
      
      <section className={`search-section ${isLoginOpen ? "blur-background" : ""}`}>
        <h2>Find Exercise Events</h2>
        <div className="search-container">
          <input
            type="text"
            placeholder="Search for events..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button className="search-btn">Search</button>
        </div>
      </section>

      <section className={`event-list ${isLoginOpen ? "blur-background" : ""}`}>
        <h3>Popular Events</h3>
        <ul>
          <li><strong>Basketball</strong></li>
          <li><strong>Tennis</strong></li>
          <li><strong>Swimming</strong></li>
          <li><strong>Golf</strong></li>
          <li><strong>Dodgeball</strong></li>
          <li><strong>Weight Training</strong></li>
          <li><strong>Pilates</strong></li>
        </ul>
      </section>

      {isLoginOpen && (
        <div className="login">
          <div className="login-box">
            <button className="close-btn" onClick={closeLogin}>&times;</button>
            <h2>{isSignUpMode ? "Sign Up" : "Login"}</h2>
            <input type="text" placeholder="Username" />
            <input type="password" placeholder="Password" />
            {isSignUpMode && <input type="password" placeholder="Confirm Password" />}
            <button className="submit-btn">{isSignUpMode ? "Sign Up" : "Login"}</button>
            <p>
              {isSignUpMode ? "Already have an account? " : "Don't have an account? "}
              <a href="#" onClick={isSignUpMode ? openLogin : openSignUp}>
                {isSignUpMode ? "Login" : "Sign up"}
              </a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
export default App;
