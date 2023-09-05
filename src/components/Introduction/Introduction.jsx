import React from 'react';
import styles from '../Quiz/Quiz.module.css';

function Introduction({ startQuestions, currentPart, quizData }) {
  return (
    <div>
      {/* Display current part and total parts */}
      <div className={styles['question-counter']}>
        <span className={styles['active-question-no']}> Part {currentPart}</span>
        <span className={styles['totalQuestion']}>/3</span>
      </div>
      {/* Display introductory information */}
      <div className={styles['introductory-explanation']}>
        <h2>{quizData.intro.title}</h2>
        <p>{quizData.intro.text}</p>
        {/* Button to start the part */}
        <button
          className={styles['intro']}
          onClick={() => startQuestions(currentPart)}
        >
          Start Part {currentPart}
        </button>
      </div>
    </div>
  );
}

export default Introduction;

