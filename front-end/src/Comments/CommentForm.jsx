import React, { useState } from "react";
import "./Comment.css";
import { sendRequest } from "../Utils/apiEvents";

const CommentForm = ({ commentAdd, eventId }) => {
  const [comment, setComment] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!comment.trim()) return; // Don't post empty comments

    // Create form data and include the comment content and event id
    const formData = new FormData();
    formData.append("content", comment);
    formData.append("event", eventId);

    try {
      // Post the comment to the backend
      const data = await sendRequest(
        "http://127.0.0.1:8000/api/comments/",
        "POST",
        formData
      );
      // Add the returned comment to the list
      commentAdd(data);
      setComment("");
    } catch (err) {
      console.error("Error posting comment", err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="comment-form">
      <textarea
        name="content"
        placeholder="Write a comment!"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        className="comment-input"
      />
      <input type="hidden" name="event" value={eventId} />
      <button type="submit" className="comment-submit-btn">
        Post Comment
      </button>
    </form>
  );
};

export default CommentForm;

