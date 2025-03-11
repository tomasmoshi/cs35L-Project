// EventForm.js
import React, { useState, useEffect } from "react";
import "./EventForm.css";
import { sendRequest } from "../Utils/apiEvents"; // Adjust the path as needed

const EventForm = ({ onEventSubmitted, onClose }) => {
  const [image, setImage] = useState(null); // Store the file object
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

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose, isSubmitting]);


  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      // Create a preview URL for the image
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!localStorage.getItem("token") && !localStorage.getItem("username")) return;
    // Prepare form data; note that we pass the file object directly
    const formData = new FormData(e.currentTarget);
    formData.append("tags", JSON.stringify(tags));
    formData.append("image", image);
    if (!formData.get("title")|| !formData.get("content") || !image ) return;
    setIsSubmitting(true);
    // Post event data (date_posted will be handled by the backend)
    const data = await sendRequest("http://127.0.0.1:8000/api/events/", "POST", formData);
    if (data) {
      onEventSubmitted(data);
      // Reset the form fields
      setImage(null);
      setTags("");
      setPreview(null);
      e.target.reset(); // Resets the file input
      setIsSubmitting(false);
      //console.log(onClose)
      if (onClose){
        onClose();
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="event-form">
      <input
        type="text"
        name="title"
        placeholder="Event Title"
        className="title-input"
      />

      <label className="submit-btn">
        <input
          type="file"
          id="imageInput"
          accept="image/*"
          onChange={handleImageChange}
        />
        Upload Image
      </label>
      {preview && <img src={preview} alt="Preview" className="image-preview" />}

      <textarea placeholder="Write a short event description..." name="content"></textarea>

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
  );
};

export default EventForm;
