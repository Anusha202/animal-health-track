import React, { useState } from "react";
import axios from "axios";

const API = "http://localhost:5001/api";

const SimpleAnimalCategory = () => {
  const [animalType, setAnimalType] = useState("");
  const [breeds, setBreeds] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!animalType || !breeds) {
      alert("Please fill out all fields");
      return;
    }

    const data = { 
      animal_type: animalType.trim(), 
      breeds: breeds.split(",").map(breed => breed.trim()) // Split and trim for multiple breeds 
    };

    try {
      const response = await axios.post(`${API}/animals/addcategory`, data);
      alert("Animal category added successfully!");
      setAnimalType("");
      setBreeds("");
      console.log("Response:", response.data);
    } catch (error) {
      console.error("Error adding animal category:", error);
      alert("Failed to add animal category. Please try again.");
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-4">Add Animal Category</h2>
      <form onSubmit={handleSubmit} className="max-w-md mx-auto">
        <div className="mb-4">
          <label htmlFor="animalType" className="block text-gray-700 mb-2">
            Animal Type
          </label>
          <input
            type="text"
            id="animalType"
            value={animalType}
            onChange={(e) => setAnimalType(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-2"
            placeholder="Enter animal type"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="breeds" className="block text-gray-700 mb-2">
            Breeds (comma-separated)
          </label>
          <input
            type="text"
            id="breeds"
            value={breeds}
            onChange={(e) => setBreeds(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-2"
            placeholder="Enter breeds, separated by commas"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 w-full"
        >
          Add Category
        </button>
      </form>
    </div>
  );
};

export default SimpleAnimalCategory;
