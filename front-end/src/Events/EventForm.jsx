// EventForm.js
import React, { useState } from "react";
import "./EventForm.css";
import { sendRequest } from "../Utils/EventsUtils"; // Adjust the path as needed

const EventForm = ({ onEventSubmitted }) => {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState(null); // Store the file object
  const [content, setContent] = useState("");
  const [preview, setPreview] = useState();
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
    // Prepare form data; note that we pass the file object directly
    const formData = new FormData(e.currentTarget);
    formData.append("tags", JSON.stringify(tags));
    formData.append("image", image);
    if (!formData.get("title")|| !formData.get("content") || !image || !tags) return;


    // Post event data (date_posted will be handled by the backend)
    const data = await sendRequest("http://127.0.0.1:8000/api/events/", "POST", formData);
    if (data) {
      onEventSubmitted(data);
      // Reset the form fields
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
      {preview && (
        <img src={preview} alt="Preview" className="image-preview" />
      )}

      <textarea
        placeholder="Write a short event description..."
        name="content"
      ></textarea>
      <input
        type="text"
        placeholder="Tags (comma separated)"
        className="title-input"
        value={tags}
        onChange={(e) => setTags(e.target.value)}
      />
      <button type="submit" className="submit-btn">
        Post Event
      </button>
    </form>
  );
};

export default EventForm;
