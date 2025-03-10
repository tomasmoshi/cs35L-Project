import React, { useState, useEffect } from "react";
import "./Comment.css";
import { sendRequest } from "../Utils/apiEvents"; // adjust the path if needed

const CommentForm = ({ commentAdd, eventId }) => {
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!comment.trim()) return;

    // Prepare the comment payload including the event id
    const commentData = {
      text: comment,
      event: eventId,
      // The backend will associate the user if authenticated
    };

    try {
      // Post the comment to the backend
      const data = await sendRequest(
        "http://127.0.0.1:8000/api/comments/",
        "POST",
        JSON.stringify(commentData),
        {
          "Content-Type": "application/json",
        }
      );
      // Add the returned comment (with backend-generated id and date) to the list
      commentAdd(data);
      setComment("");
    } catch (err) {
      console.error("Error posting comment", err);
    }
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
