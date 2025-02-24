import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App/App.jsx'
import EventsList from './Events/EventList.jsx'
import EventForm from './Events/EventForm.jsx'
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <EventForm/>
    <EventsList/>
    {/* <App /> */}
  </StrictMode>
)
