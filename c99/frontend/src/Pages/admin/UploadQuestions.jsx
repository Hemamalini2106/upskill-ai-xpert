import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaTrash } from "react-icons/fa";

const UploadQuestions = () => {
  const quizId = localStorage.getItem("selectedQuiz");
  const [questionText, setQuestionText] = useState("");
  const [options, setOptions] = useState(["", "", "", ""]);
  const [correctAnswer, setCorrectAnswer] = useState("");
  const [questions, setQuestions] = useState([]);
  const [quizName, setQuizName] = useState("");

  useEffect(() => {
    fetchQuestions();
  }, []);

  const fetchQuestions = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/quiz/quizzes/${quizId}`
      );
      setQuestions(response.data.questions || []); // Ensure it’s an array
      setQuizName(response.data.title);
    } catch (error) {
      console.error("Error fetching questions:", error);
    }
  };

  const handleOptionChange = (index, value) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const handleSaveQuestion = async () => {
    try {
      const response = await axios.post(
        `http://localhost:8080/questions/quizzes/${quizId}/questions`,
        {
          questionText,
          options,
          correctAnswer,
        }
      );
      console.log("Question saved:", response.data);
      setQuestions([...questions, response.data.question]);
      setQuestionText("");
      setOptions(["", "", "", ""]);
      setCorrectAnswer("");
      fetchQuestions(); // Refetch questions after saving
    } catch (error) {
      console.error("Error saving question:", error);
    }
  };

  const handleDelete = async (questionId) => {
    try {
      await axios.delete(
        `http://localhost:8080/questions/quizzes/${quizId}/questions/${questionId}`
      );
      fetchQuestions();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen flex flex-col items-center">
      <h1 className="text-4xl font-bold mb-6">{quizName}</h1>
      <h1 className="text-3xl font-bold mb-6">Upload Questions</h1>

      {/* Question Form */}
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg mb-8">
        <label className="block mb-2 text-lg font-semibold">Question</label>
        <textarea
          value={questionText}
          onChange={(e) => setQuestionText(e.target.value)}
          placeholder="Enter the question"
          className="w-full p-2 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
        ></textarea>

        <label className="block mb-2 text-lg font-semibold">Options</label>
        {options.map((option, index) => (
          <input
            key={index}
            value={option}
            onChange={(e) => handleOptionChange(index, e.target.value)}
            placeholder={`Option ${index + 1}`}
            className="w-full p-2 mb-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
          />
        ))}

        <label className="block mb-2 text-lg font-semibold">
          Correct Answer
        </label>
        <input
          value={correctAnswer}
          onChange={(e) => setCorrectAnswer(e.target.value)}
          placeholder="Enter the correct answer"
          className="w-full p-2 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
        />

        <button
          onClick={handleSaveQuestion}
          className="w-full bg-green-500 text-white py-2 rounded-lg font-bold hover:bg-green-600"
        >
          Save Question
        </button>
      </div>

      {/* Display Existing Questions */}
      <div className="w-full max-w-3xl">
        <h2 className="text-2xl font-semibold mb-4">Existing Questions</h2>
        {questions.length > 0 ? (
          questions.map((question, index) => (
            <div
              key={index}
              className="bg-white p-4 mb-4 rounded-lg shadow-md border border-gray-200"
            >
              <h3 className="text-xl font-semibold mb-2">
                {index + 1}. {question.questionText}
              </h3>
              <ul className="pl-4">
                {question.options &&
                  question.options.map((option, i) => (
                    <li
                      key={i}
                      className={`mb-1 ${
                        option === question.correctAnswer
                          ? "text-green-600 font-bold"
                          : "text-gray-700"
                      }`}
                    >
                      - {option}
                    </li>
                  ))}
              </ul>
              <p className="mt-2 font-semibold text-blue-600">
                Correct Answer: {question.correctAnswer}
              </p>
              <FaTrash
                size={25}
                color="red"
                onClick={() => handleDelete(question._id)}
                className="cursor-pointer place-self-end hover:scale-105"
              />
            </div>
          ))
        ) : (
          <p className="text-gray-500">No questions available.</p>
        )}
      </div>
    </div>
  );
};

export default UploadQuestions;
