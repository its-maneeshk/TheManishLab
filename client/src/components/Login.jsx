import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  // State to hold form data
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [message, setMessage] = useState(""); // For success or error messages
  const navigate = useNavigate(); // To redirect after login

  // Handle form input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent page reload
    setMessage(""); // Clear previous messages

    try {
      const response = await axios.post("http://localhost:8080/api/auth/login", formData, {
        headers: { "Content-Type": "application/json" },
      });

      if (response.status === 200) {
        setMessage("✅ Login successful! 🎉");
        
        // Save token to localStorage
        localStorage.setItem("token", response.data.token);

        // Redirect to dashboard or homepage after login
        setTimeout(() => {
          navigate("/"); // Change to your desired route
        }, 1000);
      }
    } catch (error) {
      setMessage(`❌ ${error.response?.data?.message || "Error connecting to server"}`);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-300">
      <div className="w-full max-w-md p-8 space-y-6 bg-white shadow-lg rounded-lg">
        <h2 className="text-2xl font-bold text-center text-gray-700">Login</h2>

        {/* Show success or error message */}
        {message && (
          <p className={`text-center mb-4 text-sm font-medium ${message.startsWith("✅") ? "text-green-500" : "text-red-500"}`}>
            {message}
          </p>
        )}

        <form className="space-y-4" onSubmit={handleSubmit}>
          {/* Email Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-300 focus:outline-none"
              required
            />
          </div>

          {/* Password Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-300 focus:outline-none"
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300"
          >
            Login
          </button>
        </form>

        <p className="text-sm text-center text-gray-600">
          Don't have an account?{" "}
          <a href="/signup" className="text-blue-500 hover:underline">
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
