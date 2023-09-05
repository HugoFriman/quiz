import React, { useState, useEffect, Suspense } from 'react';
import QuizRen from '../QuizRen/QuizRen';


function Quiz() {
  const [quizState, setQuizState] = useState({
    currentPart: 1,
    currentQuestion: 0,
    userAnswers: [],
    userAnswersPart: [],
    quizStarted: false,
    intro: true,
    showWarning: false,
    quizData: null,
  });

  // Function to fetch quiz data
  useEffect(() => {
    // Simulate fetching data from an external API
    const fetchData = async () => {
      try {
        const response = await fetch('https://api.npoint.io/ed38a197fb0f77ac567c');
        const data = await response.json();
        setQuizState((prevState) => ({
          ...prevState,
          quizData: data,
        })); // Update the state with fetched data
      } catch (error) {
        console.error(error);
        // Handle errors appropriately (e.g., display an error message)
      }
    };

    fetchData();
  }, []);

  

  const handleCloseApp = () => {
    const userConfirmed = window.confirm("Are you sure you want to quit? Your progress will be lost.");
    if (userConfirmed) {
      setQuizState((prevState) => ({
        ...prevState,
        quizStarted: false,
      }));
    }
  };

  const handleNextSection = () => {
    const { currentPart, userAnswersPart, quizData } = quizState;
    if (isPartCompleted(quizData[currentPart].questions, userAnswersPart)) {
      if (currentPart < 3) {
        setQuizState((prevState) => ({
          ...prevState,
          currentPart: currentPart + 1,
          currentQuestion: 0,
          userAnswers: [...prevState.userAnswers, ...userAnswersPart], // Use spread operator to merge arrays
          userAnswersPart: [],
          intro: true,
        }));
      } else {
        setQuizState((prevState) => ({
          ...prevState,
          currentPart: 0,
        }));
      }
    } else {
      setQuizState((prevState) => ({
        ...prevState,
        showWarning: true,
      }));
    }
  };

  const isPartCompleted = (currentQuestions, updatedUserAnswers) => {
    const currentPassingScore = currentQuestions.length;
    const partScore = updatedUserAnswers
      .slice(0, currentQuestions.length)
      .filter((answer, index) => answer === currentQuestions[index].correctAnswer).length;
    return partScore >= currentPassingScore;
  };

  const handleAnswerSelect = (selectedOption) => {
    if (!quizState.quizStarted) {
      setQuizState((prevState) => ({
        ...prevState,
        quizStarted: true,
      }));
    }
    if (quizState.currentPart === 1 || quizState.currentPart === 2 || quizState.currentPart === 3) {
      const updatedUserAnswers = [...quizState.userAnswersPart];
      updatedUserAnswers[quizState.currentQuestion] = selectedOption;
      setQuizState((prevState) => ({
        ...prevState,
        userAnswersPart: updatedUserAnswers,
      }));
    }
  };

  function getQuestionsForPart(partNumber) {
    return quizState.quizData[partNumber].questions;
  }

  const handlePrevious = () => {
    if (quizState.currentQuestion > 0) {
      setQuizState((prevState) => ({
        ...prevState,
        currentQuestion: prevState.currentQuestion - 1,
      }));
    }
  };
  
  const handleNext = () => {
    if (quizState.currentQuestion < getQuestionsForPart(quizState.currentPart).length - 1) {
      setQuizState((prevState) => ({
        ...prevState,
        currentQuestion: prevState.currentQuestion + 1,
      }));
    } else {
      if (isPartCompleted(getQuestionsForPart(quizState.currentPart), quizState.userAnswersPart)) {
        handleNextSection();
      } else {
        setQuizState((prevState) => ({
          ...prevState,
          showWarning: true,
        }));
      }
    }
  };

  const startPart = (partNumber) => {
    setQuizState((prevState) => ({
      ...prevState,
      currentPart: partNumber,
      currentQuestion: 0,
      intro: true,
      showWarning: false,
    }));
  };

  const startQuestions = (partNumber) => {
    setQuizState((prevState) => ({
      ...prevState,
      currentPart: partNumber,
      currentQuestion: 0,
      intro: false,
    }));
  };

  return (
    <div>
      {quizState.quizData !== null ? (
        // Lazy load QuizRen component with Suspense
        <Suspense fallback={<div>Loading...</div>}>
          <QuizRen
            quizData={quizState.quizData[quizState.currentPart]}
            currentQuestion={quizState.currentQuestion}
            currentPart={quizState.currentPart}
            userAnswersPart={quizState.userAnswersPart}
            handleAnswerSelect={handleAnswerSelect}
            handlePrevious={handlePrevious}
            handleNext={handleNext}
            intro={quizState.intro}
            handleCloseApp={handleCloseApp}
            showWarning={quizState.showWarning}
            startPart={startPart}
            startQuestions={startQuestions}
          />
        </Suspense>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
}

export default Quiz;
