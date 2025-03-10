import React, { useState, useEffect } from "react";
import "./Comment.css";
import CommentCard from "./CommentCard";
import CommentForm from "./CommentForm";
import { sendRequest } from "../Utils/apiEvents";

const CommentList = ({ eventId }) => {
  const [comments, setComments] = useState([]);



  const addComment = (newComment) => {
    setComments((prevComments) => [newComment, ...prevComments]);
  };

  return (
    <div>
      <div className="comment-list">
        {comments.length === 0 ? (
          <p className="no-comments">There are no comments yet, put the first comment!</p>
        ) : (
          comments.map((comment) => (
            <CommentCard key={comment.id} comment={comment} />
          ))
        )}
      </div>
      {/* Pass eventId to CommentForm */}
      <CommentForm commentAdd={addComment} eventId={eventId} />
    </div>
  );
};

export default CommentList;
