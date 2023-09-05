import React from 'react';
import styles from '../Quiz/Quiz.module.css';

const PopupWarning = ({
  quizData,
  setShowWarning,
  handleCloseApp,
  startPart,
  currentPart,
}) => {
  return (
    <div className={styles.overlay}>
      <div className={styles['warning-popup']}>
        <h2>
          <b>{quizData.warning.title}</b>
        </h2>
        <p>{quizData.warning.text}</p>
        {/* Conditional rendering of buttons based on currentPart */}
        {currentPart === 1 && (
          <div className={styles['warning-popup-buttons-container']}>
            <a
              href="https://accumeo.com/en/faq/who-can-invest"
              target="_blank"
              rel="noreferrer"
            >
              Learn more
            </a>
            <br />
            <button
              className={styles['empty']}
              onClick={() => setShowWarning(false)}
            >
              Close
            </button>
          </div>
        )}
        {currentPart === 2 && (
          <div className={styles['warning-popup-buttons-container']}>
            <button
              className={styles['filled']}
              onClick={() => startPart(3)}
            >
              Accept
            </button>
            <button
              className={styles['empty']}
              onClick={() => setShowWarning(false)}
            >
              Close
            </button>
          </div>
        )}
        {currentPart === 3 && (
          <div className={styles['warning-popup-buttons-container']}>
            <button
              className={styles['filled']}
              onClick={handleCloseApp}
            >
              Accept
            </button>
            <button
              className={styles['empty']}
              onClick={() => setShowWarning(false)}
            >
              Close
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PopupWarning;
