const express = require("express");
const {
  createQuiz,
  deleteQuiz,
  getAllQuizzes,
  getQuizById,
} = require("../controller/QuizController");

const router = express.Router();

// Route to create a new quiz
router.post("/quizzes", createQuiz);

// Route to delete a specific quiz by ID
router.delete("/quizzes/:quizId", deleteQuiz);

// Route to get all quizzes
router.get("/quizzes", getAllQuizzes);

// Route to get a specific quiz by ID
router.get("/quizzes/:quizId", getQuizById);

module.exports = router;
