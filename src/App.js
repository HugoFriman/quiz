import React, { useState } from 'react';
import Quiz from './components/Quiz/Quiz'; // Import the Quiz component

function App() {
  const [quizStarted, setQuizStarted] = useState(false); // State variable to track if the quiz has started
  const [user, setUser] = useState(""); // State variable to track user input

  // Function to handle starting the quiz
  const handleStartQuiz = () => {
    setQuizStarted(true);
  };

  return (
    <div className="test">
      {quizStarted ? (
        // If the quiz has started, display the Quiz component
        <Quiz />
      ) : (
        // If the quiz has not started, display the "Start Quiz" button
        <>
          <button className="start-button" onClick={handleStartQuiz}>
            Start Quiz
          </button>
          <button className="start-button" onClick={handleStartQuiz}>
            See Quiz Answers
          </button>
          <input
            type="text"
            placeholder="Enter your ID"
            value={user}
            onChange={(e) => setUser(e.target.value)}
          />
        </>
      )}
    </div>
  );
}

export default App;
