const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const connectDB = require("./config/db");
const userRoutes = require("./routes/UserRoutes");
const quizRoutes = require("./routes/QuizRoutes");
const questionRoutes = require("./routes/QuestionRoutes");

const app = express();
const port = 8080;

connectDB();

app.use(cors()); // Enable CORS
app.use(bodyParser.json()); // Parse JSON bodies
app.use(bodyParser.urlencoded({ extended: true })); // Parse URL-encoded bodies

app.use("/user", userRoutes);
app.use("/quiz", quizRoutes);
app.use("/questions", questionRoutes);

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
