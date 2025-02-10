import { useState } from "react";
import "./App.css";

function App() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="container">
      <nav className="navbar">
        <h1 className="logo">AllExercises</h1>
        <button className="login-btn">Login</button>
      </nav>
      
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
    </div>
  );
}
export default App;