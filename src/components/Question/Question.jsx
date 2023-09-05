import React, { useState } from 'react';
import PopupInfo from '../PopupInfo/PopupInfo';
import styles from '../Quiz/Quiz.module.css';

const Question = ({
  questionData,
  userAnswersPart,
  handleAnswerSelect,
  totalLength,
  isLastQuestion,
  isFirstQuestion,
  handleNext,
  handlePrevious,
}) => {
  // State for controlling the visibility of the information popup
  const [isInfoPopupOpen, setIsInfoPopupOpen] = useState(false);

  // Determine whether the "Next" button should be disabled based on userAnswersPart
  const isNextButtonDisabled = userAnswersPart === null || userAnswersPart === undefined || userAnswersPart === '';

  // Open the information popup
  const openInfoPopup = () => {
    setIsInfoPopupOpen(true);
  };

  // Close the information popup
  const closeInfoPopup = () => {
    setIsInfoPopupOpen(false);
  };

  return (
    <div className={styles['question']}>
      {/* Display question number and total questions */}
      <div className={styles['question-counter']}>
        <span className={styles['active-question-no']}> Question {questionData.id}</span>
        <span className={styles['totalQuestion']}>/{totalLength}</span>
      </div>

      {/* Display the question text and make it clickable to open the info popup */}
      <div onClick={openInfoPopup} className={styles['question-text']}>
        {questionData.question}
      </div>

      {/* Display "Read more" text and make it clickable to open the info popup */}
      <div onClick={openInfoPopup} className={styles['read-more-text']}>
        Read more →
      </div>

      {/* Information popup */}
      {isInfoPopupOpen && (
        <div className={styles['popup-overlay']}>
          <PopupInfo text={questionData.popup} onClose={closeInfoPopup} />
        </div>
      )}
      
      {/* Display answer options */}
      <ul className={styles['options-list']}>
        {questionData.options.map((option, index) => (
          <li key={index}>
            <button
              onClick={() => handleAnswerSelect(option)}
              className={`${styles['original-button']} ${
                userAnswersPart === option ? styles['selected'] : ''
              }`}
            >
              {option}
            </button>
          </li>
        ))}
      </ul>

      {/* Navigation buttons */}
      <div className={styles['navigation-buttons']}>
        {isLastQuestion ? (
          <>                             
            <button
              className={styles['empty']}
              onClick={handlePrevious}
              disabled={isFirstQuestion}
            >
              Previous
            </button>
            <button
              className={`${styles['filled']} ${userAnswersPart ? styles['selected'] : ''}`}
              onClick={handleNext}
              disabled={isNextButtonDisabled}
            >
              Finish
            </button>
          </>
        ) : (
          <>
            <button
              className={styles['empty']}
              onClick={handlePrevious}
              disabled={isFirstQuestion}
            >
              Previous
            </button>

            <button
              className={`${styles['filled']} ${userAnswersPart ? styles['filled'] : ''}`}
              onClick={handleNext}
              disabled={isNextButtonDisabled}
            >
              Next
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Question;
