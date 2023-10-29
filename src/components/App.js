import React, { useState } from "react";
import Question from "./Question";
import quiz from "../data/quiz";

function App() {
  const [questions, setQuestions] = useState(quiz);
  const [currentQuestionId, setCurrentQuestion] = useState(1);
  const [score, setScore] = useState(0);

  function handleQuestionAnswered(correct) {
    if (currentQuestionId < questions.length) {
      setCurrentQuestion(currentQuestionId + 1);
    } else {
      setCurrentQuestion(null);
    }
    if (correct) {
      setScore(score + 1);
    }
  }

  return (
    <main>
      <section>
        {currentQuestionId ? (
          <Question
            question={questions[currentQuestionId - 1]}
            onAnswered={handleQuestionAnswered}
          />
        ) : (
          <>
            <h1>Game Over</h1>
            <h2>Total Correct: {score}</h2>
          </>
        )}
      </section>
    </main>
  );
}

export default App;
