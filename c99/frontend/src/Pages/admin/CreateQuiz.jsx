import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { PiUploadSimpleBold } from "react-icons/pi";
import { FaTrash } from "react-icons/fa";

const CreateQuiz = () => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [subject, setSubject] = useState("");
  const [difficulty, setDifficulty] = useState("Basic");
  const [quizzes, setQuizzes] = useState([]);

  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  // Fetch all quizzes
  useEffect(() => {
    fetchQuizzes();
  }, []);

  const fetchQuizzes = async () => {
    try {
      const response = await axios.get("http://localhost:8080/quiz/quizzes");
      setQuizzes(response.data);
    } catch (error) {
      console.error("Error fetching quizzes:", error);
    }
  };

  const handleSave = async () => {
    try {
      const response = await axios.post("http://localhost:8080/quiz/quizzes", {
        title: subject,
        level: difficulty,
      });
      console.log("Quiz saved:", response.data);

      // Refresh the quizzes list after saving a new quiz
      fetchQuizzes();
      closeModal();
    } catch (error) {
      console.error("Error saving quiz:", error);
    }
  };

  const handleDelete = async (quizId) => {
    try {
      await axios.delete(`http://localhost:8080/quiz/quizzes/${quizId}`);

      fetchQuizzes();
    } catch (error) {
      console.error("Error deleting quiz:", error);
    }
  };

  return (
    <>
      {/* Header */}
      <div className="bg-slate-100 flex justify-between items-center p-4 h-[90px] sticky top-0 z-50">
        <h1 className="font-bold text-black font-serif text-[40px]">UpSkill</h1>

        <nav className="font-bold text-black font-serif text-[20px] flex justify-center items-center gap-[40px]">
          <Link to="/createQuiz">Quiz</Link>
          <Link to="/">LogOut</Link>
        </nav>
      </div>

      {/* Create Quiz Button */}
      <button
        onClick={openModal}
        className="absolute left-1/2 transform -translate-x-1/2 bg-blue-600 text-white px-4 py-2 mt-[30px] rounded-lg font-bold"
      >
        Create Quiz
      </button>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white w-full max-w-lg p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold text-center mb-4">Create Quiz</h2>

            {/* Subject Input */}
            <label className="block mb-2 text-lg font-semibold">Subject</label>
            <input
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="Enter subject name"
              className="w-full px-3 py-2 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
            />

            {/* Difficulty Dropdown */}
            <label className="block mb-2 text-lg font-semibold">
              Difficulty Level
            </label>
            <select
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value)}
              className="w-full px-3 py-2 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
            >
              <option>Basic</option>
              <option>Intermediate</option>
              <option>Advanced</option>
            </select>

            {/* Action Buttons */}
            <div className="flex justify-end gap-4">
              <button
                onClick={closeModal}
                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Display list of quizzes */}
      <div className="mt-12 p-4">
        <h2 className="text-3xl font-bold mb-4 mt-[30px]">Available Quizzes</h2>
        {quizzes.length > 0 ? (
          <div className="flex flex-wrap justify-center items-start mt-[50px] gap-[50px] ">
            {quizzes.map((quiz) => (
              <div
                key={quiz.id}
                className="bg-white p-4 rounded-lg shadow-md border border-gray-200 w-[300px] hover:cursor-pointer flex flex-col"
              >
                <h3 className="text-xl font-semibold">{quiz.title}</h3>
                <p className="text-gray-600">Difficulty: {quiz.level}</p>
                <p className="text-gray-600">
                  No. of questions: {quiz.questions && quiz.questions.length}
                </p>
                <div className="flex place-self-end items-center gap-[20px] mt-[20px]">
                  <PiUploadSimpleBold
                    size={25}
                    color="blue"
                    onClick={() => {
                      localStorage.setItem("selectedQuiz", quiz._id);
                      navigate("/uploadQuestions");
                    }}
                  />
                  <FaTrash
                    size={25}
                    color="red"
                    onClick={() => handleDelete(quiz._id)}
                    className="cursor-pointer"
                  />
                </div>
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

export default CreateQuiz;
