import React, { useState } from "react";
import axios from "axios";
import AdminSidebar from "../layout/AdminSidebar";

const UploadForm = () => {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      setMessage("Please select a file");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await axios.post(
        "http://localhost:5001/api/animal-benchmarks/upload",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      setMessage(res.data.message);
    } catch (err) {
      setMessage("Failed to upload CSV");
    }
  };

  return (
    <>
    <AdminSidebar/>
      <div className="flex justify-center items-center bg-gray-50 p-4 min-h-screen">
        <div className="p-4 rounded-lg shadow-lg w-full max-w-2xl bg-white">
          <h2 className="text-xl font-semibold text-center mb-3 text-gray-700">
            Upload Animal Benchmark CSV
          </h2>

          <form onSubmit={handleSubmit}>
            {/* File Input */}
            <div className="mb-3">
              <label
                htmlFor="file-upload"
                className="block text-sm font-medium text-gray-600 mb-1"
              >
                Choose a file to upload
              </label>
              <input
                type="file"
                id="file-upload"
                accept=".csv"
                onChange={handleFileChange}
                className="w-full text-sm px-2 py-1 border border-gray-300 rounded-md focus:ring focus:ring-blue-500 focus:outline-none"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-1 rounded-md text-sm hover:bg-blue-600 transition"
            >
              Upload
            </button>
          </form>

          {/* Message Display */}
          {message && (
            <p
              className={`mt-3 text-sm text-center ${
                message.includes("Failed") ? "text-red-500" : "text-green-500"
              }`}
            >
              {message}
            </p>
          )}
        </div>
      </div>
    </>
  );
};

export default UploadForm;
