import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App/App.jsx'
import EventForm from './Events/EventForm.jsx'
import EventsList from './Events/EventList.jsx'
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
    {/* <EventForm/>
    <EventsList/> */}
  </StrictMode>
)
