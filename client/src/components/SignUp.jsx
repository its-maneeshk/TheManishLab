import React, { useState } from 'react';
import axios from 'axios';

const SignUp = () => {
  // State to store form data
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const [message, setMessage] = useState(''); // To show success or error messages

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent page reload
    setMessage(''); // Clear previous messages

    try {
      const response = await axios.post('http://localhost:8080/api/auth/signup', formData, {
        headers: { 'Content-Type': 'application/json' },
      });

      if (response.status === 201) {
        setMessage('✅ Signup successful! 🎉');
      }
    } catch (error) {
      setMessage(`❌ ${error.response?.data?.message || 'Error connecting to server'}`);
    }
  };

  return (
    <>
      <div className="flex min-h-screen items-center justify-center bg-gray-300">
        <div className="w-full max-w-md p-8 space-y-6 bg-white shadow-lg rounded-lg">
          <h2 className="text-2xl font-bold text-center text-gray-700">Sign Up</h2>

          {/* Show success or error message */}
          {message && (
            <p className="text-center mb-4 text-sm font-medium text-red-500">
              {message}
            </p>
          )}

          <form className="space-y-4" onSubmit={handleSubmit}>
            {/* Name Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your name"
                className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-300 focus:outline-none"
                required
              />
            </div>

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
              Sign Up
            </button>
          </form>

          <p className="text-sm text-center text-gray-600">
            Already have an account?{' '}
            <a href="/login" className="text-blue-500 hover:underline">
              Login
            </a>
          </p>
        </div>
      </div>
    </>
  )
}

export default SignUp