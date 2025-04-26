const mongoose = require("mongoose");

// Define the Question schema
const questionSchema = new mongoose.Schema({
  quiz: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Quiz", // References the Quiz model
    required: true,
  },
  questionText: {
    type: String,
    required: true,
  },
  options: [
    {
      type: String,
      required: true,
    },
  ],
  correctAnswer: {
    type: String,
    required: true,
  },
});

// Create the Question model
const Question = mongoose.model("Question", questionSchema);

module.exports = Question;
