import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Login from "./login";
import Discover from "./Discover";
import "./App.css";

function App() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <Router>
      <div className="container">
        <nav className="navbar">
          <h1 className="logo">AllExercises</h1>
          <div className="nav-links">
            <Link to="/" className="home-btn">Home </Link>
            <Link to="/discover" className="discover-btn">Discover</Link>
            <Link to="/login" className="login-btn">Login</Link>
          </div>
        </nav>

        <Routes>
          <Route
            path="/"
            element={
              <>
                <section className="search-section">
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

                <section className="event-list">
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
              </>
            }
          />
          <Route path="/discover" element={<Discover />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
