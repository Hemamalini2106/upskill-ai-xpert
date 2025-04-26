import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "../../components/Header";
import { Link, useNavigate } from "react-router-dom";

const parseQuestions = (data) => {
  if (!data || typeof data !== "string") {
    console.error("Invalid data input for parsing");
    return [];
  }

  // Split the data into individual question blocks using triple newlines
  const questionBlocks = data.split(/\n\n\n/);

  return questionBlocks
    .map((block) => {
      try {
        // Match question text
        const questionMatch = block.match(/^Q\d+\.\s(.*?)(?=\nA\))/s);

        // Match options (A, B, C, D) using non-greedy matching
        const optionsMatch = block.match(
          /A\)\s(.*?)(?=\nB\))\nB\)\s(.*?)(?=\nC\))\nC\)\s(.*?)(?=\nD\))\nD\)\s(.*?)(?=\nAnswer:)/s
        );

        // Match the correct answer
        const answerMatch = block.match(/Answer:\s([A-D])/);

        // Explanation is optional
        const explanationMatch = block.match(/Explanation:\s(.*)/s);

        if (questionMatch && optionsMatch && answerMatch) {
          const options = [
            optionsMatch[1].trim(),
            optionsMatch[2].trim(),
            optionsMatch[3].trim(),
            optionsMatch[4].trim(),
          ];

          return {
            question_text: questionMatch[1].trim(),
            options,
            correct_answer: options[answerMatch[1].charCodeAt(0) - 65],
            explanation: explanationMatch ? explanationMatch[1].trim() : "",
          };
        }
      } catch (err) {
        console.error("Error parsing block:", block, err);
      }
      return null;
    })
    .filter((q) => q !== null);
};

const MCQ = () => {
  const [questions, setQuestions] = useState([]);
  const [userAnswers, setUserAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [currentLevel, setCurrentLevel] = useState(1);
  const navigate = useNavigate();

  const topics = [
    "Introduction to Python",
    "Data Types and Variables",
    "Control Flow and Loops",
    "Functions and Modules",
    "Object-Oriented Programming",
    "File Handling",
    "Exception Handling",
    "Python Libraries (e.g., NumPy, Pandas)",
    "Data Structures",
    "Advanced Python Concepts",
  ];

  useEffect(() => {
    fetchQuestions();
  }, [currentLevel]);

  const fetchQuestions = async () => {
    setLoading(true);
    try {
      const topic = topics[currentLevel - 1];
      const response = await axios.post(
        "http://127.0.0.1:8000/generate_questions",
        {
          core_concept: topic,
          level: `level_${currentLevel}`,
        }
      );
      const questionsData = parseQuestions(response.data.questions);
      setQuestions(questionsData || []);
    } catch (error) {
      console.error("Error fetching questions:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAnswerSelect = (questionIndex, selectedOption) => {
    setUserAnswers((prev) => ({
      ...prev,
      [questionIndex]: selectedOption,
    }));
  };

  const handleQuizSubmit = () => {
    let correctCount = 0;
    questions.forEach((question, index) => {
      if (userAnswers[index] === question.correct_answer) {
        correctCount += 1;
      }
    });
    setScore({ correct: correctCount, total: questions.length });
    setSubmitted(true);
    setShowModal(true);
  };

  const goToNextLevel = () => {
    if (currentLevel === 4) {
      navigate("/phase1intermediate");
      return;
    }
    setCurrentLevel((prev) => prev + 1);
    setUserAnswers({});
    setSubmitted(false);
    setScore(null);
    setShowModal(false);
  };

  return (
    <>
      <Header />
      <div className="container mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6 text-center text-indigo-700">
          Python Quiz - Level {currentLevel}: {topics[currentLevel - 1]}
        </h1>

        {loading && (
          <p className="text-center text-gray-700">Loading questions...</p>
        )}

        {!loading && questions.length > 0 && (
          <div className="bg-gray-50 p-6 rounded-lg shadow-lg max-w-2xl mx-auto">
            {questions.map((question, index) => (
              <div key={index} className="mb-6">
                <h3 className="text-lg font-medium text-gray-800 mb-2">
                  {`${index + 1}. ${question.question_text}`}
                </h3>
                <div className="space-y-2">
                  {question.options.map((option, optionIndex) => (
                    <label
                      key={optionIndex}
                      className={`block p-2 rounded-lg cursor-pointer transition ${
                        userAnswers[index] === option
                          ? "bg-indigo-100 border border-indigo-300"
                          : "bg-white border border-gray-200"
                      } hover:bg-indigo-50`}
                    >
                      <input
                        type="radio"
                        name={`question-${index}`}
                        value={option}
                        checked={userAnswers[index] === option}
                        onChange={() => handleAnswerSelect(index, option)}
                        className="mr-2"
                      />
                      {option}
                    </label>
                  ))}
                </div>
              </div>
            ))}

            <button
              onClick={handleQuizSubmit}
              className="bg-green-600 text-white px-4 py-2 rounded-lg w-full font-semibold hover:bg-green-700 transition mt-6"
              disabled={submitted}
            >
              Submit Quiz
            </button>
          </div>
        )}
      </div>

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-xl w-full h-[600px] overflow-auto">
            <h2 className="text-2xl font-bold text-center mb-4 text-green-600">
              🎉 Your Score: {score.correct}/{score.total} 🎉
            </h2>
            <div className="space-y-4">
              {questions.map((question, index) => (
                <div key={index} className="p-4 border rounded-lg">
                  <h3 className="text-lg font-medium text-gray-800">
                    {`${index + 1}. ${question.question_text}`}
                  </h3>
                  <p className="mt-2">
                    <strong>Your Answer:</strong>{" "}
                    <span
                      className={
                        userAnswers[index] === question.correct_answer
                          ? "text-green-600"
                          : "text-red-600"
                      }
                    >
                      {userAnswers[index] || "Not Answered"}
                    </span>
                  </p>
                  <p>
                    <strong>Correct Answer:</strong>{" "}
                    <span className="text-green-600">
                      {question.correct_answer}
                    </span>
                  </p>
                  <p className="mt-2">
                    <strong>Explanation:</strong> {question.explanation}
                  </p>
                </div>
              ))}
            </div>
            <button
              onClick={goToNextLevel}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg mt-4 w-full hover:bg-blue-700"
            >
              Go to Level {currentLevel + 1}
            </button>
            <button
              onClick={() => setShowModal(false)}
              className="bg-red-600 text-white px-4 py-2 rounded-lg mt-4 w-full hover:bg-red-700"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default MCQ;
