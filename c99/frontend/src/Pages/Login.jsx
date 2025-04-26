import React, { useState } from "react";
import axios from "axios"; // Import Axios
import bg from "../assets/bg.png";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  // State for form inputs

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  // Function to handle form submission
  const handleLogin = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    const userCredentials = {
      email,
      password,
    };

    try {
      const response = await axios.post(
        "http://localhost:8080/user/login",
        userCredentials,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      localStorage.setItem("User", JSON.stringify(response.data));
      navigate("/home");
      alert("Login successful:");
      // Handle successful login (e.g., redirect to dashboard or store token)
    } catch (error) {
      console.error("Login failed:", error.response.data);
      // Handle login error (e.g., show error message)
    }
  };

  return (
    <div className="flex justify-center items-center h-screen w-full ">
      {/* Background image */}
      <img className="w-[45vw] " src={bg} alt="Background" />

      {/* Login Form Box */}
      <div className="bg-slate-100 shadow-xl  w-[500px] rounded-[15px] ml-[100px] flex flex-col justify-center items-center p-8">
        <h2 className="text-3xl font-semibold text-gray-700 mb-8">Login</h2>

        <form onSubmit={handleLogin} className="w-full flex flex-col">
          {/* Email Input */}
          <div className="w-full mb-6">
            <label className="block text-sm font-medium text-gray-600 mb-2">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)} // Update email state
              className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter your email"
            />
          </div>

          {/* Password Input */}
          <div className="w-full mb-6">
            <label className="block text-sm font-medium text-gray-600 mb-2">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)} // Update password state
              className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter your password"
            />
          </div>

          {/* Login Button */}
          <button
            type="submit" // Set type to "submit" for form submission
            className="w-[200px] bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition duration-300 mb-4 place-self-center mt-[10px]"
          >
            Login
          </button>
        </form>

        {/* Sign Up Text */}
        <p className="text-lg text-gray-600">
          Don't have an account?{" "}
          <Link to="/signUp" className="text-blue-500 hover:underline">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
