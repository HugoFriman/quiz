import React from 'react';
import PopupWarning from '../PopupWarning/PopupWarning';
import Question from '../Question/Question';
import Introduction from '../Introduction/Introduction';
import styles from '../Quiz/Quiz.module.css';

const QuizRen = ({
  quizData,
  currentQuestion,
  currentPart,
  userAnswersPart,
  handleAnswerSelect,
  handlePrevious,
  handleNext, 
  handleCloseApp,
  showWarning,
  startPart,
  setShowWarning,
  intro,
  startQuestions,
}) => {
  const questionData = quizData.questions;
  const totalQuestions = questionData.length;
  const isFirstQuestion = currentQuestion === 0;
  const isLastQuestion = currentQuestion === totalQuestions - 1;

  return (
    <div className={styles.App}>
      {/* Close Button */}
      <button className={styles['close-button']} onClick={handleCloseApp}>
        X
      </button>

      {showWarning && (
        // Display the PopupWarning component when showWarning is true
        <PopupWarning
          quizData={quizData}
          handleCloseApp={handleCloseApp}
          showWarning={showWarning}
          startPart={startPart}
          currentPart={currentPart}
          setShowWarning={setShowWarning}
        />  
      )}

      {!intro ? (
        <div className={styles['quiz']}>
          <div>
            {/* Render the Question component when not in the introduction */}
            <Question
              questionData={questionData[currentQuestion]}
              userAnswersPart={userAnswersPart[currentQuestion]}
              handleAnswerSelect={handleAnswerSelect}
              totalLength={questionData.length}
              isLastQuestion={isLastQuestion}
              isFirstQuestion={isFirstQuestion}
              handleNext={handleNext}
              handlePrevious={handlePrevious}
            />   
          </div>
        </div>
      ) : (
        // Render the Introduction component when in the introduction
        <Introduction
          startQuestions={startQuestions}
          currentPart={currentPart}
          quizData={quizData}
        />
      )}
    </div>
  );
};


export default QuizRen;
