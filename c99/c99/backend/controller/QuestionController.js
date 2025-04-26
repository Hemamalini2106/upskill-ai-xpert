const Question = require("../models/QuestionModel");
const Quiz = require("../models/QuizModel");

// Add a question to a specific Quiz
const addQuestionToQuiz = async (req, res) => {
  const { quizId } = req.params;
  const { questionText, options, correctAnswer } = req.body;

  try {
    // Check if the quiz exists
    const quiz = await Quiz.findById(quizId);
    if (!quiz) {
      return res.status(404).json({ message: "Quiz not found" });
    }

    // Create a new question
    const newQuestion = new Question({
      quiz: quizId,
      questionText,
      options,
      correctAnswer,
    });

    // Save the question
    await newQuestion.save();

    // Add question ID to the quiz's questions array
    quiz.questions.push(newQuestion._id);
    await quiz.save();

    res
      .status(201)
      .json({ message: "Question added successfully!", question: newQuestion });
  } catch (error) {
    res.status(500).json({ message: "Error adding question", error });
  }
};

// Delete a Question from a specific Quiz
const deleteQuestionFromQuiz = async (req, res) => {
  const { quizId, questionId } = req.params;

  try {
    // Check if the quiz exists
    const quiz = await Quiz.findById(quizId);
    if (!quiz) {
      return res.status(404).json({ message: "Quiz not found" });
    }

    // Check if the question exists
    const question = await Question.findById(questionId);
    if (!question) {
      return res.status(404).json({ message: "Question not found" });
    }

    // Delete the question
    await Question.findByIdAndDelete(questionId);

    // Remove question ID from the quiz's questions array
    quiz.questions = quiz.questions.filter((q) => q.toString() !== questionId);
    await quiz.save();

    res.status(200).json({ message: "Question deleted successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting question", error });
  }
};

module.exports = {
  addQuestionToQuiz,
  deleteQuestionFromQuiz,
};
