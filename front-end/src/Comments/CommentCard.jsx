import React from "react";
import "./Comment.css";

const CommentCard = ({ comment }) => {
  return (
    <div className="comment-card">
      <span className="comment-user">{comment.user}</span>
      <p className="comment-text">{comment.text}</p>
      <span className="comment-date">{comment.date}</span>
    </div>
  );
};

export default CommentCard;