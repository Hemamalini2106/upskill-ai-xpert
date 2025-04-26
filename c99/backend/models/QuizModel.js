const mongoose = require("mongoose");

// Define the Quiz schema
const quizSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  level: {
    type: String,
    required: true,
  },
  questions: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Question", // References the Question model
    },
  ],
});

// Create the Quiz model
const Quiz = mongoose.model("Quiz", quizSchema);

module.exports = Quiz;
