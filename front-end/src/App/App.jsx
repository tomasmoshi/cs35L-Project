
import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import ModalButton from "../Features/ModalButton/ModalButton.jsx";
import Discover from "../Features/Discover/Discover.jsx";
import Account from "../Features/UserProfile/Account.jsx";
import PostEvent from "../Features/PostEvent/PostEvent.jsx";
import { UserProvider } from "../Features/Context/UserContext.jsx";
import "./App.css";
import Home from "../Features/Home/Home.jsx"
import EventDisplay from "../Events/EventDisplay.jsx";
import Signup from "../Features/Signup/Signup.jsx";
import UserMenu from "../Features/UserProfile/user_menu.jsx";

function App() {
  return (
    <UserProvider>
      <Router>
        <div>
          <div className="container">
            <nav className="navbar">
              <h1 className="logo">AllExercises</h1>
              <div className="nav-buttons">
                <ModalButton label="Login" modalType="login" />
                <ModalButton label="Help" modalType="help" />
                <ModalButton label="About Us" modalType="about" />
                <ModalButton label="Discover" modalType="discover" />
                <ModalButton label="Post event" modalType="post" />
                <div className="profile-icon nav-button-size">
                  <UserMenu />
                </div>                
                {/* <Link to="/account">
                  <img src={images} alt="Profile" className="profile-icon nav-button-size" />
                </Link> */}
              </div>
            </nav>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/post" element={<PostEvent onEventSubmitted={() => {}} />} />
              <Route path="/discover" element={<Discover />} />
              <Route path="/event/:id" element={<EventDisplay />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/account" element={<Account />} />
            </Routes>
          </div>
        </div>
      </Router>
    </UserProvider>
  );
}

export default App;
