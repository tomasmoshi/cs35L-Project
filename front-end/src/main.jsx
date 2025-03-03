//main.jsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App/App.jsx'
import EventForm from './Events/EventForm.jsx'
import EventList from './Events/EventList.jsx'
const handleEventSubmitted = (newEvent) => {
  console.log("New event submitted:", newEvent);
  // You can update state or perform any other actions here
};

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
    <EventForm onEventSubmitted={handleEventSubmitted}/>
    <EventList />
  </StrictMode>
);