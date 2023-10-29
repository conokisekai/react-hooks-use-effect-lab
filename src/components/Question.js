import React, { useState, useEffect } from "react";

function Question({ question, onAnswered }) {
  const [timeRemaining, setTimeRemaining] = useState(10);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeRemaining(prevTime => (prevTime > 0 ? prevTime - 1 : prevTime));
    }, 1000);

    return () => {
      clearInterval(timer); // Clear the interval when the component is unmounted
    };
  }, []);

  useEffect(() => {
    if (timeRemaining === 0) {
      setTimeRemaining(10);
      onAnswered(false);
    }
  }, [timeRemaining, onAnswered]);

  const { id, prompt, answers, correctIndex } = question;

  function handleAnswer(isCorrect) {
    setTimeRemaining(10);
    onAnswered(isCorrect);
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      if (timeRemaining > 0) {
        setTimeRemaining(timeRemaining - 1);
      } else {
        // calls  onAnswered(false) after 10 sec
        setTimeRemaining(10);
        onAnswered(false);
      }
    }, 1000);

    //clear the timeout after unmount
    return () => {
      clearTimeout(timer);
    };
  }, [timeRemaining, onAnswered]); 

  return (
    <>
      <h1>Question {id}</h1>
      <h3>{prompt}</h3>
      {answers.map((answer, index) => {
        const isCorrect = index === correctIndex;
        return (
          <button key={answer} onClick={() => handleAnswer(isCorrect)}>
            {answer}
          </button>
        );
      })}
      <h5>{timeRemaining} seconds remaining</h5>
    </>
  );
}

export default Question;
