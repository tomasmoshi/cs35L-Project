import React, { useState } from "react";
import "./Events.css";

const Events = () => {
  const [events, setEvents] = useState([]);
  const [image, setImage] = useState(null);
  const [description, setDescription] = useState("");

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!image || !description.trim()) return;

    const newEvent = {
      id: Date.now(),
      image,
      description,
    };

    setEvents([newEvent, ...events]);
    setImage(null);
    setDescription("");
    document.getElementById("imageInput").value = ""; // Reset file input
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

        {image && <img src={image} alt="Preview" className="image-preview" />}

        <textarea
          placeholder="Write a short event description..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>

        <button type="submit" className="submit-btn"> Post Event</button>
      </form>

      <div className="events-list">
        {events.length === 0 ? (
          <p className="no-events">No events yet. Be the first to share! </p>
        ) : (
          events.map((event) => (
            <div key={event.id} className="event-card">
              <img src={event.image} alt="Event" className="event-image" />
              <p className="event-text">{event.description}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Events;

