const express = require("express");
const {
  registerUser,
  loginUser,
  getAllUsers,
  getUserById,
} = require("../controller/UserController"); // Adjust the path as needed

const router = express.Router();

// Route to register a new user
router.post("/register", registerUser);

// Route to login a user
router.post("/login", loginUser);

// Route to get all users
router.get("/users", getAllUsers);

// Route to get a single user by ID
router.get("/users/:userId", getUserById);

module.exports = router;
