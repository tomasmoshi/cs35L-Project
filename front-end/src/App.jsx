import React from "react";
import Events from "./Events"; // Import the Events component

function App() {
  return (
    <div className="App">
      <h1>My Events App</h1>
      <Events />
    </div>
  );
}

export default App;

// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'
// import { useEffect, useState } from "react";
// import Events from './Events';

// function App() {
//   const [data, setData] = useState(null);
//   useEffect(() => {
//     fetch("http://127.0.0.1:8000/")
//       .then((response) => response.json())
//       .then((data) => setData(data.message))
//       .catch((error) => console.error("Error fetching data:", error));
//   }, []);

//   return <div>{data ? data : "Loading..."}</div>;
// }

// export default App;
