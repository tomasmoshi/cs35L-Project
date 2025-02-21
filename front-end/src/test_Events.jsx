import React, { useState } from "react";
import "./Events.css";

const Events = () => {
  const [events, setEvents] = useState([]);
  const [image, setImage] = useState(null);
  const [description, setDescription] = useState("");

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!image || !description.trim()) return;

    const formData = new FormData();
    formData.append("content", description);
    formData.append("image", image);

    // Send the FormData to the backend
    fetch("http://127.0.0.1:8000/api/events/", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        setEvents([data, ...events]);  // Add the new event to the list
        setImage(null);
        setDescription("");
        document.getElementById("imageInput").value = "";  // Reset file input
      })
      .catch((error) => console.error("Error:", error));
  };

  return (
    <div className="events-container">
      <h2> Share an Event</h2>
      <form onSubmit={handleSubmit} className="event-form">
        <label className="custom-file-upload">
          <input
            type="file"
            id="imageInput"
            accept="image/*"
            onChange={handleImageChange}
          />
          Upload Image
        </label>

        {image && <img src={URL.createObjectURL(image)} alt="Preview" className="image-preview" />}

        <textarea
          placeholder="Write a short event description..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>

        <button type="submit" className="submit-btn">Post Event</button>
      </form>

      <div className="events-list">
        {events.length === 0 ? (
          <p className="no-events">No events yet. Be the first to share! </p>
        ) : (
          events.map((event) => (
            <div key={event.id} className="event-card">
              <img src={event.image} alt="Event" className="event-image" />
              <p className="event-text">{event.content}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Events;
