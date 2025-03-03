import React, { useState, useEffect, useContext } from "react";
import images from "../images/user.png";
import "../AccountPage/user.css";
import { UserContext } from "../Features/Context/UserContext.jsx";
import Signup from "../Features/Signup/Signup.jsx";
const Account = () => {
  const { user, setUser } = useContext(UserContext);

  useEffect(() => {
    if (!user) {
      const fetchUserData = async () => {
        const response = await fetch("http://127.0.0.1:8000/api/user/");
        const data = await response.json();
        setUser(data);
      };
      fetchUserData();
    }
  }, [user, setUser]);

  if (!user) {
    return <p>Loading...</p>;
  }
  return (
    <div className="account">
      <div className="account-info">
        <h1>Profile Settings</h1>
        <p>Update your profile information and preferences.</p>
      </div>
      <div className="account-box">
        <div className="account-image">
          <img
            src={user.profile_image || images}
            alt="Account Upload"
            width={150}
            height={150}
            className="account-image"
          />
          <p className="account-box-img-para">Change Image</p>
        </div>
        <div className="account-box-form">
        </div>
      </div>
      <div className="account-details">
        <p><strong>Username:</strong> {Signup.username}</p>
        <p><strong>Email:</strong> {Signup.email}</p>
        <p><strong>First Name:</strong> {Signup.first_name}</p>
        <p><strong>Last Name:</strong> {Signup.last_name}</p>
      </div>
    </div>
  );
};

export default Account;