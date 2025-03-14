import React, { useState, useEffect } from "react";
import "./Comment.css";
import CommentCard from "./CommentCard";
import CommentForm from "./CommentForm";
import { sendRequest } from "../Utils/apiEvents";

const CommentList = ({ eventId }) => {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const data = await sendRequest(
          `http://127.0.0.1:8000/api/comments/?event=${eventId}`,
          "GET"
        );
        setComments(data);
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
    };

    if (eventId) {
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


