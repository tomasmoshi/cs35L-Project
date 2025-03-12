// SearchBar.jsx
import React, { useState } from "react";
import { sendRequest } from "../../Utils/apiEvents";
import "./SearchBar.css";

const SearchBar = ({ onSearchResults }) => {
  const [query, setQuery] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    try {
      const url = `http://127.0.0.1:8000/api/events/?tags=${encodeURIComponent(query.trim())}`;
      const data = await sendRequest(url, "GET", null);
      if (onSearchResults) {
        onSearchResults(data);
      } else {
        console.log("Search results:", data);
      }
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
  };

  return (
    <form className="searchbar-container" onSubmit={handleSubmit}>
      <input
        type="text"
        className="searchbar-input"
        placeholder="Search by tag..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button type="submit" className="searchbar-button">
        Search
      </button>
    </form>
  );
};

export default SearchBar;
