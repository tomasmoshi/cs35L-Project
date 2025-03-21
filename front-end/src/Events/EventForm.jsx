import React, { useState, useEffect } from "react";
import "./EventForm.css";
import { sendRequest } from "../Utils/apiEvents";

const EventForm = ({ onEventSubmitted, onClose, location }) => {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [tags, setTags] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && onClose && !isSubmitting) {
        onClose();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose, isSubmitting]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!localStorage.getItem("token") && !localStorage.getItem("username")) return;
    const formData = new FormData(e.currentTarget);
    formData.append("tags", JSON.stringify(tags));
    formData.append("image", image);
    // Append latitude and longitude if available.
    if (location) {
      formData.append("latitude", location.lat);
      formData.append("longitude", location.lng);
    }
    // Check required fields
    if (!formData.get("title") || !formData.get("content") || !image) return;
    setIsSubmitting(true);
    const data = await sendRequest("http://127.0.0.1:8000/api/events/", "POST", formData);
    if (data) {
      onEventSubmitted(data);
      setImage(null);
      setTags("");
      setPreview(null);
      e.target.reset();
      setIsSubmitting(false);
      if (onClose) {
        onClose();
      }
    }
  };

  return (
    <div className="event-form-container">
      <button className="close-btn" onClick={onClose}>
        &times;
      </button>
      <form onSubmit={handleSubmit} className="event-form">
        <h2 className="event-form-title">Post an event!</h2>
        <input type="text" name="title" placeholder="Event Title" className="title-input" />
        <label className="submit-btn">
          <input type="file" id="imageInput" accept="image/*" onChange={handleImageChange} />
          Upload Image
        </label>
        {preview && <img src={preview} alt="Preview" className="image-preview" />}
        <div className="event-form-content">
          <textarea placeholder="Write a short event description..." name="content"></textarea>
        </div>
        <input
          type="text"
          placeholder="Tags (comma separated)"
          className="title-input"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
        />
        <button type="submit" className="submit-btn" disabled={isSubmitting}>
          {isSubmitting ? "Posting..." : "Post Event"}
        </button>
      </form>
    </div>
  );
};

export default EventForm;
