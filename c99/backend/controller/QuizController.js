const Quiz = require("../models/QuizModel");

// Create a new Quiz
const createQuiz = async (req, res) => {
  const { title, level } = req.body;

  try {
    const newQuiz = new Quiz({
      title,
      level,
    });

    await newQuiz.save();
    res
      .status(201)
      .json({ message: "Quiz created successfully!", quiz: newQuiz });
  } catch (error) {
    res.status(500).json({ message: "Error creating quiz", error });
  }
};

// Delete a Quiz
const deleteQuiz = async (req, res) => {
  const { quizId } = req.params;

  try {
    // Check if the quiz exists
    const quiz = await Quiz.findById(quizId);
    if (!quiz) {
      return res.status(404).json({ message: "Quiz not found" });
    }

    // Delete the quiz
    await Quiz.findByIdAndDelete(quizId);

    res.status(200).json({ message: "Quiz deleted successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting quiz", error });
  }
};

const getAllQuizzes = async (req, res) => {
  try {
    const quizzes = await Quiz.find().populate("questions"); // Retrieve all quizzes
    res.status(200).json(quizzes);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving quizzes", error });
  }
};

// Get a single Quiz by ID
const getQuizById = async (req, res) => {
  const { quizId } = req.params;

  try {
    const quiz = await Quiz.findById(quizId).populate("questions"); // Find the quiz by ID
    if (!quiz) {
      return res.status(404).json({ message: "Quiz not found" });
    }
    res.status(200).json(quiz);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving quiz", error });
  }
};

module.exports = {
  createQuiz,
  deleteQuiz,
  getAllQuizzes,
  getQuizById,
};
