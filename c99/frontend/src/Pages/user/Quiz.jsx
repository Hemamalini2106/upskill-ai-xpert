import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "../../components/Header";
import { Link } from "react-router-dom";

const Quiz = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [selectedLevel, setSelectedLevel] = useState("all");

  useEffect(() => {
    // Fetch quizzes from the API
    const fetchQuizzes = async () => {
      try {
        const response = await axios.get("http://localhost:8080/quiz/quizzes");
        setQuizzes(response.data);
      } catch (error) {
        console.error("Error fetching quizzes:", error);
      }
    };

    fetchQuizzes();
  }, []);

  // Filter quizzes based on selected level
  const filteredQuizzes =
    selectedLevel === "all"
      ? quizzes
      : quizzes.filter(
          (quiz) => quiz.level.toLowerCase() === selectedLevel.toLowerCase()
        );

  return (
    <>
      <Header />
      <div className="p-8 bg-gray-100 min-h-screen">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Available Quizzes</h1>

          {/* Dropdown for selecting quiz level */}

          <select
            value={selectedLevel}
            onChange={(e) => setSelectedLevel(e.target.value)}
            className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
          >
            <option value="all">All</option>
            <option value="basic">Basic</option>
            <option value="intermediate">Intermediate</option>
            <option value="advanced">Advanced</option>
          </select>
        </div>

        {filteredQuizzes.length > 0 ? (
          <div className="space-y-4">
            {filteredQuizzes.map((quiz) => (
              <div
                key={quiz._id}
                className="bg-white p-4 rounded-lg shadow-md border border-gray-200 w-[300px] flex flex-col"
              >
                <h2 className="text-xl font-semibold">{quiz.title}</h2>
                <p className="text-gray-700">Level: {quiz.level}</p>
                <p className="text-gray-700">
                  No. of questions: {quiz.questions.length}
                </p>
                <Link
                  onClick={() => localStorage.setItem("userQuiz", quiz._id)}
                  to={`/singleQuiz`}
                  className="text-gray-700 place-self-center mt-5 text-xl hover:underline-offset-4 hover:underline"
                >
                  Attempt the quiz
                </Link>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No quizzes available.</p>
        )}
      </div>
    </>
  );
};

export default Quiz;
