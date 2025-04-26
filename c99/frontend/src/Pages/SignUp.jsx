import React, { useState } from "react";
import axios from "axios"; // Import Axios
import bg from "../assets/bg2.png";
import { Link, useNavigate } from "react-router-dom";

const SignUp = () => {
  // State for form inputs
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  // Function to handle form submission
  const handleSignUp = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    const userDetails = {
      name,
      email,
      password,
    };

    try {
      const response = await axios.post(
        "http://localhost:8080/user/register",
        userDetails,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Signup successful:", response.data);
      navigate("/");
      // Handle successful signup (e.g., redirect to login or dashboard)
    } catch (error) {
      console.error("Signup failed:", error.response.data);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen w-full ">
      {/* Background image */}
      <img className="w-[45vw] " src={bg} alt="Background" />

      {/* Sign Up Form Box */}
      <div className="bg-slate-100 shadow-xl  w-[500px] rounded-[15px] ml-[50px] flex flex-col justify-center items-center p-8">
        <h2 className="text-3xl font-semibold text-gray-700 mb-8">Sign Up</h2>

        <form onSubmit={handleSignUp} className="w-full flex flex-col">
          {/* Name Input */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-600 mb-2">
              Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter your name"
            />
          </div>

          {/* Email Input */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-600 mb-2">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter your email"
            />
          </div>

          {/* Password Input */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-600 mb-2">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter your password"
            />
          </div>

          {/* Sign Up Button */}
          <button
            type="submit"
            className="w-[200px] bg-blue-500 text-white place-self-center py-3 rounded-lg hover:bg-blue-600 transition duration-300 mb-4"
          >
            Sign Up
          </button>

          {/* Sign Up Text */}
          <p className="text-lg text-gray-600 place-self-center">
            Already have an account?{" "}
            <Link to="/" className="text-blue-500 hover:underline">
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
