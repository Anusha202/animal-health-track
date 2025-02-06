import React, { useState, useEffect } from 'react';
const API = "http://localhost:5001/api";

// API function to send vaccine data to the backend
export const addVaccine = async (newVaccine) => {
  try {
    console.log("Sending vaccine data:", newVaccine); 

    const response = await fetch(`${API}/vaccine/addvaccine`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newVaccine), // Send the new vaccine data as JSON
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Failed to add vaccine");
    }

    const data = await response.json();
    return data; // Return the newly added vaccine data
  } catch (error) {
    console.error("Error adding vaccine:", error.message); // Log the error message
    throw error;
  }
};

const App = () => {
  // States to store the vaccine data and effectiveness ranges
  const [vaccineName, setVaccineName] = useState('');
  const [animalType, setAnimalType] = useState('');
  const [breeds, setBreeds] = useState('');
  const [effectivenessData, setEffectivenessData] = useState([]);
  const [showMoreIndex, setShowMoreIndex] = useState(2);  // Track the next age range index to show

  // Generate 5-month intervals from 0 to 180 months
  const generateAgeRanges = () => {
    const ranges = [];
    for (let i = 0; i <= 180; i += 5) {
      ranges.push({
        minAge: i,
        maxAge: i + 5,
        effectivenessPercentage: 0, // Default value for effectiveness
      });
    }
    return ranges;
  };

  // Initialize the age ranges when the component mounts
  useEffect(() => {
    setEffectivenessData(generateAgeRanges());
  }, []);

  // Handle change for effectiveness percentage
  const handleEffectivenessChange = (index, value) => {
    const updatedData = [...effectivenessData];
    updatedData[index].effectivenessPercentage = value;
    setEffectivenessData(updatedData);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const newVaccine = {
      vaccineName,
      animalType,
      breeds,
      effectiveness: effectivenessData,
    };

    try {
      const response = await addVaccine(newVaccine);
      console.log("Vaccine added successfully:", response);
      
    } catch (error) {
      console.error("Error adding vaccine:", error.message);
    }
  };

  const handleShowMore = () => {
    setShowMoreIndex((prevIndex) => prevIndex + 1);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex justify-center items-center">
      <div className="w-full max-w-2xl bg-white p-6 rounded-lg shadow-xl">
        <h1 className="text-3xl font-semibold text-center text-green-600 mb-6">Add vaccines</h1>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Vaccine Name */}
          <div>
            <label className="block text-lg font-medium text-gray-700">Vaccine Name</label>
            <input
              type="text"
              value={vaccineName}
              onChange={(e) => setVaccineName(e.target.value)}
              className="mt-2 p-3 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
              required
            />
          </div>

          {/* Animal Type */}
          <div>
            <label className="block text-lg font-medium text-gray-700">Animal Type</label>
            <input
              type="text"
              value={animalType}
              onChange={(e) => setAnimalType(e.target.value)}
              className="mt-2 p-3 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
              required
            />
          </div>

          {/* Breed */}
          <div>
            <label className="block text-lg font-medium text-gray-700">Breed</label>
            <input
              type="text"
              value={breeds}
              onChange={(e) => setBreeds(e.target.value)}
              className="mt-2 p-3 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
              required
            />
          </div>

          {/* Effectiveness Data */}
          <div>
            <h3 className="text-xl font-semibold text-gray-700 mb-4">Effectiveness Data</h3>
            {effectivenessData.slice(0, showMoreIndex * 2).map((range, index) => (
              <div key={index} className="space-y-4 mb-4">
                <div className="flex justify-between">
                  <label className="text-sm text-gray-600">Min Age (Months): {range.minAge}</label>
                  <label className="text-sm text-gray-600">Max Age (Months): {range.maxAge}</label>
                </div>
                <div>
                  <label className="block text-lg font-medium text-gray-700">Effectiveness (%)</label>
                  <input
                    type="number"
                    value={range.effectivenessPercentage}
                    onChange={(e) =>
                      handleEffectivenessChange(index, e.target.value)
                    }
                    min="0"
                    max="100"
                    className="mt-2 p-3 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
                    required
                  />
                </div>
              </div>
            ))}

            {/* Show More Button */}
            {showMoreIndex * 2 < effectivenessData.length && (
              <button
                type="button"
                onClick={handleShowMore}
                className="text-blue-600 mt-4 hover:underline"
              >
                Show More
              </button>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-green-600 text-white p-3 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-400"
          >
            Save Vaccine
          </button>
        </form>
      </div>
    </div>
  );
};

export default App;
