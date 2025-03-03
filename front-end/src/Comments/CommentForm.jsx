import React, { useState } from "react";
import "./Comment.css";

const CommentForm = ({ commentAdd }) => {
  const [comment, setComment] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!comment.trim()) return;

    const newComment = {
      id: Date.now(),
      user: "Harvey Spectere",
      text: comment,
      date: new Date().toLocaleString(),
    };

    commentAdd(newComment);
    setComment("");
  };

  return (
    <form onSubmit={handleSubmit} className="comment-form">
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