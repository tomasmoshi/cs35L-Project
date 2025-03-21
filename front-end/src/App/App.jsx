import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import ModalButton from "../Features/ModalButton/ModalButton.jsx";
import Discover from "../Features/Discover/Discover.jsx";
import Account from "../Features/UserProfile/Account.jsx";
import PostEvent from "../Features/PostEvent/PostEvent.jsx";
import { UserProvider } from "../Features/Context/UserContext.jsx";
import "./App.css";
import Home from "../Features/Home/Home.jsx";
import EventDisplay from "../Events/EventDisplay.jsx";
import Signup from "../Features/Signup/Signup.jsx";
import UserMenu from "../Features/UserProfile/user_menu.jsx";
import Login from "../Features/Login/Login"; 
import SearchBar from "../Features/SearchBar/SearchBar.jsx";
import AccountSettings from "../Features/UserProfile/settings/Profile_Form.jsx";

function App() {
  const [activeModal, setActiveModal] = useState(null);

  const handleToggleModal = (modalType) => {
    setActiveModal((prev) => (prev === modalType ? null : modalType));
  };

  return (
    <UserProvider>
      <Router>
        <div className="container">
          <nav className="navbar">
            <div className="navbar-brand">
            <Link to ="/" className="navbar-brand" style = {{textDecoration: 'none', color:"inherit"}}>
              <h1 className="logo">AllExercises</h1>
              </Link>
              </div>
            <div className="nav-buttons">
            <ModalButton label="Home" modalType="home" onToggle={handleToggleModal} activeModal={activeModal} />
              <ModalButton label="Login" modalType="login" onToggle={handleToggleModal} activeModal={activeModal} />
              <ModalButton label="Help" modalType="help" onToggle={handleToggleModal} activeModal={activeModal} />
              <ModalButton label="About Us" modalType="about" onToggle={handleToggleModal} activeModal={activeModal} />
              <ModalButton label="Discover" modalType="discover" onToggle={handleToggleModal} activeModal={activeModal} />
              <ModalButton label="Post event" modalType="post" onToggle={handleToggleModal} activeModal={activeModal} />
              <SearchBar onSearch={(query) => console.log("Search query:", query)} />
              <div className="profile-icon nav-button-size">
                <UserMenu />
              </div>
            </div>
          </nav>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login onClose={() =>window.history.back() } />} />
            <Route path="/eventform" element={<PostEvent onEventSubmitted={() => {}} />} />
            <Route path="/discover" element={<Discover />} />
            <Route path="/event/:id" element={<EventDisplay />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/account" element={<Account />} />
            <Route path="/settings" element={<AccountSettings />} />
          </Routes>
        </div>
      </Router>
    </UserProvider>
  );
}
export default App;
