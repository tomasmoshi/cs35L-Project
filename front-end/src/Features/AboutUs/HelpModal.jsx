
function HelpModal({ onClose }) {
    return (
      <div className="modal">
        <div className="modal-content">
          <h2>Welcome to AllExercises!</h2>
          <p>Here are some instructions to help you get started with AllExercises:</p>
          <ul>
            <li>
              <strong>Sign Up:</strong> Click the "Sign up" button at the top right and create an account. Verify via email and you're set!
            </li>
            <li>
              <strong>After logging in</strong> you can search for different sports/workouts and even post events for others to join.
            </li>
            <li>
              <strong>Post an Event:</strong>
              <ul>
                <li>Navigate to the "Post Event" section.</li>
                <li>Select an exercise type (e.g., Basketball, Tennis, etc.).</li>
                <li>Fill in the details (location, date, time, etc.).</li>
                <li>Submit your event for others to join.</li>
              </ul>
            </li>
            <li>
              <strong>Join an Event:</strong>
              <ul>
                <li>Browse the list of upcoming events on our homepage.</li>
                <li>Click on an event to view details.</li>
                <li>If interested, click the "Join" button to participate.</li>
              </ul>
            </li>
          </ul>
          <button onClick={onClose}>Close</button>
        </div>
      </div>
    );
  }