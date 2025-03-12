// src/App/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ModalButton from "../Features/ModalButton/ModalButton.jsx";
import Discover from "../Features/Discover/Discover.jsx";
import Account from "../Features/UserProfile/Account.jsx";
import PostEvent from "../Features/PostEvent/PostEvent.jsx";
import { UserProvider } from "../Features/Context/UserContext.jsx";
import "./App.css";
import Home from "../Features/Home/Home.jsx";
import EventDisplay from "../Events/EventDisplay.jsx";
import Signup from "../Features/Signup/Signup.jsx";
<<<<<<< HEAD
import UserMenu from "../Features/UserProfile/user_menu.jsx";
=======
import UserMenu from "../Features/UserProfile/userMenu.jsx";
import Login from "../Features/Login/Login"; 
import SearchBar from "../Features/SearchBar/SearchBar.jsx";


>>>>>>> 6eee88a0d22f8bfeea4d6d486b52e476d84c5666

function App() {
  return (
    <UserProvider>
      <Router>
        <div className="container">
          <nav className="navbar">
            <div className="navbar-brand">
              <h1 className="logo">AllExercises</h1>
              </div>
            <div className="nav-buttons">
              <ModalButton label="Login" modalType="login" />
              <ModalButton label="Help" modalType="help" />
              <ModalButton label="About Us" modalType="about" />
              <ModalButton label="Discover" modalType="discover" />
              <ModalButton label="Post event" modalType="post" />
              <SearchBar onSearch={(query) => console.log("Search query:", query)} />
              <div className="profile-icon nav-button-size">
                <UserMenu />
              </div>
            </div>
          </nav>
          <Routes>
            {}
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login onClose={() =>window.history.back() } />} />
            <Route path="/eventform" element={<PostEvent onEventSubmitted={() => {}} />} />
            <Route path="/discover" element={<Discover />} />
            <Route path="/event/:id" element={<EventDisplay />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/account" element={<Account />} />
          </Routes>
        </div>
      </Router>
    </UserProvider>
    
  );
}

export default App;
