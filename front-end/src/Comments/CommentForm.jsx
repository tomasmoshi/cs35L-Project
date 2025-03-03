import React, { useState, useEffect } from "react";
import "./Comment.css";
import { sendRequest } from "../Utils/apiEvents"; // adjust the path if needed

const CommentForm = ({ commentAdd }) => {
  const [comment, setComment] = useState("");
  const [user, setUser] = useState(null);

  // Fetch the current user info when the component mounts
  useEffect(() => {
    const fetchUser = async () => {
      try {
        // Replace the URL below with your actual endpoint for the current user
        const data = await sendRequest("http://127.0.0.1:8000/api/current_user/", "GET", null);
        setUser(data);
      } catch (err) {
        console.error("Error fetching current user:", err);
      }
    };
    fetchUser();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!comment.trim()) return;

    const newComment = {
      id: Date.now(),
      // Use the fetched username or default to "Anonymous" if not available
      user: user ? user.username : "Anonymous",
      text: comment,
      date: new Date().toLocaleString(),
    };

    commentAdd(newComment);
    setComment("");
  };

  return (
    <form onSubmit={handleSubmit} className="comment-form">
      <p className="logged-in-user">
        {user ? `Logged in as: ${user.username}` : "Loading user..."}
      </p>
      <textarea
        placeholder="Write a comment!"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        className="comment-input"
      ></textarea>
      <button type="submit" className="comment-submit-btn">Post Comment</button>
    </form>
  );
};

export default CommentForm;
