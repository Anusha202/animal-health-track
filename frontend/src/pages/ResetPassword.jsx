
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { resetPassword } from "../api/Userapp";


const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const { token } = useParams();
  const [message, setMessage] = useState("");
  console.log("token:", token);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!token) {
      setMessage("Invalid or missing token.");
      return;
    }

    try {
      const data = await resetPassword(token, password);
      if (data.success) {
        setMessage("Password reset successful!");
      } else {
        setMessage(data.message || "Password reset failed.");
      }
    } catch (error) {
      setMessage("An error occurred while resetting the password.");
    }
    console.log("New Password:", password);
  };


  return (

    <div className="flex items-center justify-center h-screen bg-gray-100  ">
    <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md bg-gradient-to-b from-blue-300 via-blue-200 to-white ">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
        Reset Password
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="password">
            New Password
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}

            className="w-full border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Your New Password"
            required    
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white font-bold py-2 rounded-lg hover:bg-blue-700 transition duration-200 " onClick={handleSubmit}
        >
          Reset Password
        </button>
      </form>
      {message && (
        <div className="mt-4 text-center text-gray-600">{message}</div>
      )}
    </div>
  </div>
   
  );
};

export default ResetPassword;
