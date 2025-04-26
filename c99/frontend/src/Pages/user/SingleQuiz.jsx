import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Modal from "react-modal";

const SingleQuiz = () => {
  const quizId = localStorage.getItem("userQuiz"); // Get the quiz ID from the URL params
  const [quiz, setQuiz] = useState(null);
  const [answers, setAnswers] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [totalQuestions, setTotalQuestions] = useState(0);
  const [quizResult, setQuizResult] = useState([]);
  var i = 1;

  // Fetch the quiz data based on the quizId
  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/quiz/quizzes/${quizId}`
        );
        setQuiz(response.data);
        setTotalQuestions(response.data.questions.length);
      } catch (error) {
        console.error("Error fetching the quiz:", error);
      }
    };

    fetchQuiz();
  }, [quizId]);

  // Handle answer selection
  const handleAnswerChange = (questionId, selectedOption) => {
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionId]: selectedOption,
    }));
  };

  // Handle form submission
  const handleSubmit = () => {
    let correctCount = 0;
    const results = [];

    // Calculate the number of correct answers
    quiz.questions.forEach((question) => {
      const selectedAnswer = answers[question._id];
      const isCorrect = selectedAnswer === question.correctAnswer;
      results.push({
        questionText: question.questionText,
        selectedAnswer,
        correctAnswer: question.correctAnswer,
        isCorrect,
      });
      if (isCorrect) {
        correctCount++;
      }
    });

    setCorrectAnswers(correctCount);
    setQuizResult(results);
    setIsModalOpen(true); // Open the result modal
  };

  // Close the modal
  const closeModal = () => {
    setIsModalOpen(false);
  };

  // Render the quiz and options
  if (!quiz) {
    return <div>Loading quiz...</div>;
  }

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">{quiz.title}</h1>

      <form onSubmit={(e) => e.preventDefault()}>
        {quiz.questions.map((question) => (
          <div key={question._id} className="mb-4">
            <p className="text-lg font-semibold">
              {i++}. {question.questionText}
            </p>
            <div className="space-y-2 mt-5">
              {question.options.map((option, index) => (
                <label key={index} className="block">
                  <input
                    type="radio"
                    name={question._id}
                    value={option}
                    checked={answers[question._id] === option}
                    onChange={() => handleAnswerChange(question._id, option)}
                    className="mr-2"
                  />
                  {option}
                </label>
              ))}
            </div>
          </div>
        ))}
      </form>

      <button
        onClick={handleSubmit}
        className="mt-6 px-4 py-2 bg-blue-500 text-white rounded-lg"
      >
        Submit Quiz
      </button>

      {/* Modal for displaying the result */}
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Quiz Result"
      >
        <h2 className="text-xl font-semibold mb-4">Quiz Results</h2>
        <p className="mb-4">
          Correct Answers: {correctAnswers} / {totalQuestions}
        </p>
        <p className="mb-4">
          Incorrect Answers: {totalQuestions - correctAnswers} /{" "}
          {totalQuestions}
        </p>

        {/* Display all questions and answers with correctness */}
        <div>
          {quizResult.map((result, index) => (
            <div key={index} className="mb-3">
              <p className="font-semibold">{result.questionText}</p>
              <p>
                <strong>Your Answer:</strong> {result.selectedAnswer}{" "}
                {result.isCorrect ? (
                  <span className="text-green-500">(Correct)</span>
                ) : (
                  <span className="text-red-500">(Incorrect)</span>
                )}
              </p>
              <p>
                <strong>Correct Answer:</strong> {result.correctAnswer}
              </p>
            </div>
          ))}
        </div>

        <button
          onClick={closeModal}
          className="px-4 py-2 bg-red-500 text-white rounded-lg"
        >
          Close
        </button>
      </Modal>
    </div>
  );
};

export default SingleQuiz;
