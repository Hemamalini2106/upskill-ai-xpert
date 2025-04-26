import React, { useState } from "react";
import { Link } from "react-router-dom";

const CreateDSA = () => {
  const [showModal, setShowModal] = useState(false);

  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  return (
    <>
      {/* Header */}
      <div className="bg-slate-100 flex justify-between items-center p-4 h-[90px] sticky top-0 z-50">
        <h1 className="font-bold text-black font-serif text-[40px]">UpSkill</h1>

        <nav className="font-bold text-black font-serif text-[20px] flex justify-center items-center gap-[40px]">
          <Link to="/createQuiz">Quiz</Link>
          <Link to="/createDSA">DSA</Link>
          <Link to="/">LogOut</Link>
        </nav>
      </div>

      {/* Create Quiz Button */}
      <button
        onClick={openModal}
        className="absolute left-1/2 transform -translate-x-1/2 bg-blue-600 text-white px-4 py-2 mt-[30px] rounded-lg font-bold"
      >
        Create Questions
      </button>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white w-full max-w-lg p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold text-center mb-4">Create Quiz</h2>

            {/* DSA Question Input */}
            <label className="block mb-2 text-lg font-semibold">
              DSA Question
            </label>
            <textarea
              placeholder="Type your DSA question here..."
              className="w-full px-3 py-2 mb-4 h-[100px] border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring focus:ring-blue-300"
            ></textarea>

            {/* Difficulty Dropdown */}
            <label className="block mb-2 text-lg font-semibold">
              Difficulty Level
            </label>
            <select className="w-full px-3 py-2 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-300">
              <option>Basic</option>
              <option>Intermediate</option>
              <option>Advanced</option>
            </select>

            {/* Marks per Question Dropdown */}
            <label className="block mb-2 text-lg font-semibold">
              Marks for the Question
            </label>
            <select className="w-full px-3 py-2 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-300">
              <option>5</option>
              <option>10</option>
              <option>15</option>
              <option>20</option>
              <option>30</option>
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
                onClick={closeModal} // Replace with save functionality
                className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CreateDSA;
