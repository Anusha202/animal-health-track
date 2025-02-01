import React, { useState } from 'react';
import { forgotpassword } from '../api/Userapp';

const ForgetPassword = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  // Email validation function
  const validateEmail = (email) => {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(email);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Validate email before proceeding
    if (!email) {
      setError('Email is required.');
      setSuccess(false);
      return;
    }

    if (!validateEmail(email)) {
      setError('Please enter a valid email address.');
      setSuccess(false);
      return;
    }

    // If validation passes, call the forgotpassword function
    forgotpassword({ email })
      .then((data) => {
        if (data.error) {
          setError(data.error);
          setSuccess(false);
        } else {
          setError('');
          setSuccess(true);
          setEmail('');
        }
      })
      .catch((err) => console.log(err));
  };

  const showError = () => {
    if (error) {
      return <div className="text-red-600 text-xl font-bold text-center">{error}</div>;
    }
  };

  const showSuccess = () => {
    if (success) {
      return <div className="text-green-500 text-lg font-bold text-center">Password reset link has been sent to your email.</div>;
    }
  };

  return (
    <>
      <div className="w-5/6 mx-auto">
        <form className="shadow-md flex flex-col items-center justify-center w-full" style={{ height: '100vh' }}>
          {showError()}
          {showSuccess()}
          <div className="w-full lg:w-1/2 bg-blue-200 border-2 border-solid border-slate-900 ps-3 pr-4">
            <h1 className="text-2xl font-bold text-center pb-4 pt-4 underline">Forget Password</h1>

            <div className="pb-4 text-2xl font-semibold flex justify-between">
              <label htmlFor="email">Email</label>
              <input
                type="text"
                className="border-2 border-zinc-300 p-2 rounded-md w-5/6"
                name="email"
                id="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
            </div>
            <div className="pb-4 text-center">
              <button
                type="submit"
                className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-200"
                onClick={handleSubmit}
              >
                Send password reset link
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default ForgetPassword;
