import React from "react";
import "./Comment.css";
import { formatDate } from "../Utils/DateHelper";


const CommentCard = ({ comment }) => {
  return (
    <div className="comment-card">
      <span className="comment-user">{comment.author}</span>
      <p className="comment-text">{comment.content}</p>
      <span className="comment-date">{formatDate(comment.date_posted)}</span>
    </div>
  );
};

export default CommentCard;