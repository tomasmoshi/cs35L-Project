import React, { useEffect, useState } from "react";
import images from "../../assets/images/user.png";
import apiUsers from "../../Utils/apiUsers";

const Account = () => {
  const [user, setUser] = useState(null);
  const token = localStorage.getItem("token");
  console.log("token: ", token);
  useEffect(() => {
    const fetchUserData = async () => {
      if (!token) return; //  Stop if no token

      try {
        const data = await apiUsers("http://127.0.0.1:8000/api/users/me/", "GET"); // Updated URL
        console.log("Fetched User Data:", data);

        if (data) {
          setUser(data); //  Set user after fetching
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, [token]);
  console.log("user: ", user);
  if (!user) return <p>Loading...</p>;

  return (
    <div className="account">
      <h1>Profile Settings</h1>
      <p>Update your profile information and preferences.</p>

      <div className="account-box">
        <img 
          src={user.profile_image || images} 
          alt="Profile" 
          width={150} 
          height={150} 
        />
        <p>Change Image</p>
      </div>

      <div className="account-details">
        <p><strong>Username:</strong> {user.username}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>First Name:</strong> {user.first_name}</p>
        <p><strong>Last Name:</strong> {user.last_name}</p>
      </div>
    </div>
  );
};

export default Account;
