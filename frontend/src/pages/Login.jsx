import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import Toastify styles
import { login } from '../api/Userapp';
import { useUserStore } from '../store/userStore';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const { loginState } = useUserStore(); // Access Zustand state and actions

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const data = await login(email, password);
      if (!data.success) {
        toast.error(data.message || "Login Failed. Please try again");
      } else {
        loginState(data.user);
        toast.success("Successfully Logged In!", {
          onClose: () => navigate("/"), // Redirect after toast closes
        });
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message || "An error occurred. Please try again.");
    }
  };
  
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-blue-200 p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">Login</h2>
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-200"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700 font-medium mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter your password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-200"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-200"
          >
            Log in
          </button>
        </form>
        <div className="mt-4 text-center text-lg">
          <Link
            to="/forgot-password"
            className="text-blue-600 hover:underline"
          >
            Forgot Password
          </Link>
        </div>
      </div>
      {/* ToastContainer to display toast messages */}
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default Login;
