const express = require("express");
const {
  addQuestionToQuiz,
  deleteQuestionFromQuiz,
} = require("../controller/QuestionController"); // Adjust the path as needed

const router = express.Router();

// Route to add a question to a specific quiz
router.post("/quizzes/:quizId/questions", addQuestionToQuiz);

// Route to delete a question from a specific quiz
router.delete("/quizzes/:quizId/questions/:questionId", deleteQuestionFromQuiz);

module.exports = router;
