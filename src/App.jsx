import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Home'; // Import the Home component

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} /> {/* Add this line */}
        {/* ...existing routes... */}
      </Routes>
    </Router>
  );
}

export default App;
