import React, { useState, useEffect } from "react";
import "./Comment.css";
import CommentCard from "./CommentCard";
import CommentForm from "./CommentForm";
import { sendRequest } from "../Utils/apiEvents";

const CommentList = ({ eventId }) => {
  const [comments, setComments] = useState([]);

  // Fetch comments for the given event
  useEffect(() => {
    if (eventId) {
      const fetchComments = async () => {
        try {
          const url = `http://127.0.0.1:8000/api/comments/?event=${eventId}`;
          const data = await sendRequest(url, "GET", null);
          console.log(data);
          setComments(data);
        } catch (err) {
          console.error("Error fetching comments:", err);
        }
      };
      fetchComments();
    }
  }, [eventId]);

  const addComment = (newComment) => {
    setComments((prevComments) => [newComment, ...prevComments]);
  };

  return (
    <div>
      <div className="comment-list">
        {comments && comments.map((comment) => (
          <CommentCard key={comment.id} comment={comment} />
        ))}
      </div>
      {/* Pass eventId to CommentForm so it can send the associated event */}
      <CommentForm commentAdd={addComment} eventId={eventId} />
    </div>
  );
};

export default CommentList;


