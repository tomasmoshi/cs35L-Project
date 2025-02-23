// EventForm.js
import React, { useState } from "react";
import "./EventForm.css";
import { sendRequest } from "../Utils/EventsUtils"; // Adjust the path as needed

const EventForm = ({ onEventSubmitted }) => {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState(null); // Store the file object
  const [content, setContent] = useState("");
  const [preview, setPreview] = useState(null); // For displaying image preview
  const [tags, setTags] = useState("");
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
    if (!title.trim() || !content.trim() || !image) return;

    // Prepare form data; note that we pass the file object directly
    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    formData.append("image", image);
    const tagsList = tags
      .split(",")
      .map((tag) => tag.trim())
      .filter((tag) => tag.length > 0);
    formData.append("tags", JSON.stringify(tagsList));
    for (let [key, value] of formData.entries()) {
      console.log(key, value);
    }
    // Post event data (date_posted will be handled by the backend)
    const data = await sendRequest("http://127.0.0.1:8000/api/events/", "POST", formData);
    if (data) {
      onEventSubmitted(data);
      // Reset the form fields
      setTitle("");
      setContent("");
      setImage(null);
      setTags("");
      setPreview(null);
      e.target.reset(); // Resets the file input
    }
  };

  return (
    <form onSubmit={handleSubmit} className="event-form">
      <input
        type="text"
        placeholder="Event Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="title-input"
      />

      <label className="custom-file-upload">
        <input
          type="file"
          id="imageInput"
          accept="image/*"
          onChange={handleImageChange}
        />
        Upload Image
      </label>
      {preview && (
        <img src={preview} alt="Preview" className="image-preview" />
      )}

      <textarea
        placeholder="Write a short event description..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
      ></textarea>
      <input
        type="text"
        placeholder="Tags (comma separated)"
        value={tags}
        onChange={(e) => setTags(e.target.value)}
        className="title-input"
      />
      <button type="submit" className="submit-btn">
        Post Event
      </button>
    </form>
  );
};

export default EventForm;
