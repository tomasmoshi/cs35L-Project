import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import CommentList from "./Comments/CommentList.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <div className="comment-container">
      <h2>Comments</h2>
      <CommentList />
    </div>
  </StrictMode>
);