import React, { useState } from "react";

const BenchmarkForm = () => {
  const [formData, setFormData] = useState({
    animalType: "",
    breed: "",
    vaccineName: "",
    weight: { min: "", max: "" },
    lifespan: { min: "", max: "" },
    averageTemperature: "",
    ageData: [
      {
        ageRange: { min: "", max: "" },
        weightRange: { min: "", max: "" },
        milkPerDay: { min: "", max: "" },
      },
    ],
  });

  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  // Function to handle general input change
  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // Function to handle nested input change for object fields
  const handleNestedInputChange = (parentField, subField, value) => {
    setFormData((prev) => ({
      ...prev,
      [parentField]: {
        ...prev[parentField],
        [subField]: value,
      },
    }));
  };

  // Function to handle age-related data changes
  const handleAgeDataChange = (index, field, value) => {
    const updatedAgeData = [...formData.ageData];
    const fieldKeys = field.split(".");
    updatedAgeData[index][fieldKeys[0]][fieldKeys[1]] = value;

    setFormData((prev) => ({
      ...prev,
      ageData: updatedAgeData,
    }));
  };

  // Function to add a new age entry
  const handleAddAgeData = () => {
    setFormData((prev) => ({
      ...prev,
      ageData: [
        ...prev.ageData,
        {
          ageRange: { min: "", max: "" },
          weightRange: { min: "", max: "" },
          milkPerDay: { min: "", max: "" },
        },
      ],
    }));
  };

  // Form submission handler
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.animalType || !formData.breed || !formData.vaccineName) {
      setError("Animal Type, Breed, and Vaccine Name are required!");
      return;
    }
    setError("");
    setSuccessMessage("Benchmark data submitted successfully!");
    console.log("Submitted Data:", formData);
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-xl font-semibold text-gray-700 mb-4">
        Benchmark Form
      </h2>
      <form onSubmit={handleSubmit}>
        {/* Animal Type */}
        <input
          type="text"
          value={formData.animalType}
          onChange={(e) => handleInputChange("animalType", e.target.value)}
          placeholder="Animal Type"
          className="w-full px-2 py-1 border border-gray-300 rounded-md mb-2"
        />

        {/* Breed */}
        <input
          type="text"
          value={formData.breed}
          onChange={(e) => handleInputChange("breed", e.target.value)}
          placeholder="Breed"
          className="w-full px-2 py-1 border border-gray-300 rounded-md mb-2"
        />

        {/* Vaccine Name */}
        <input
          type="text"
          value={formData.vaccineName}
          onChange={(e) => handleInputChange("vaccineName", e.target.value)}
          placeholder="Vaccine Name"
          className="w-full px-2 py-1 border border-gray-300 rounded-md mb-2"
        />

        {/* Lifespan */}
        <div className="grid grid-cols-2 gap-4 mb-2">
          <input
            type="number"
            value={formData.lifespan.min}
            onChange={(e) => handleNestedInputChange("lifespan", "min", e.target.value)}
            placeholder="Lifespan Min (Years)"
            className="w-full px-2 py-1 border border-gray-300 rounded-md"
          />
          <input
            type="number"
            value={formData.lifespan.max}
            onChange={(e) => handleNestedInputChange("lifespan", "max", e.target.value)}
            placeholder="Lifespan Max (Years)"
            className="w-full px-2 py-1 border border-gray-300 rounded-md"
          />
        </div>

        {/* Age Data */}
        <div className="mt-4">
          <h4 className="text-sm font-semibold text-gray-700 mb-2">Age Data</h4>
          {formData.ageData.map((ageEntry, index) => (
            <div
              key={index}
              className="mb-4 p-2 rounded border border-gray-300 bg-gray-50"
            >
              <div className="grid grid-cols-3 gap-4 mb-2">
                <input
                  type="number"
                  value={ageEntry.ageRange.min}
                  onChange={(e) =>
                    handleAgeDataChange(index, "ageRange.min", e.target.value)
                  }
                  placeholder="Age Min"
                  className="w-full px-2 py-1 border border-gray-300 rounded-md"
                />
                <input
                  type="number"
                  value={ageEntry.ageRange.max}
                  onChange={(e) =>
                    handleAgeDataChange(index, "ageRange.max", e.target.value)
                  }
                  placeholder="Age Max"
                  className="w-full px-2 py-1 border border-gray-300 rounded-md"
                />
                <input
                  type="number"
                  value={ageEntry.weightRange.min}
                  onChange={(e) =>
                    handleAgeDataChange(index, "weightRange.min", e.target.value)
                  }
                  placeholder="Weight Min"
                  className="w-full px-2 py-1 border border-gray-300 rounded-md"
                />
              </div>
              <div className="grid grid-cols-3 gap-4 mb-2">
                <input
                  type="number"
                  value={ageEntry.weightRange.max}
                  onChange={(e) =>
                    handleAgeDataChange(index, "weightRange.max", e.target.value)
                  }
                  placeholder="Weight Max"
                  className="w-full px-2 py-1 border border-gray-300 rounded-md"
                />
                <input
                  type="number"
                  value={ageEntry.milkPerDay.min}
                  onChange={(e) =>
                    handleAgeDataChange(index, "milkPerDay.min", e.target.value)
                  }
                  placeholder="Milk Min"
                  className="w-full px-2 py-1 border border-gray-300 rounded-md"
                />
                <input
                  type="number"
                  value={ageEntry.milkPerDay.max}
                  onChange={(e) =>
                    handleAgeDataChange(index, "milkPerDay.max", e.target.value)
                  }
                  placeholder="Milk Max"
                  className="w-full px-2 py-1 border border-gray-300 rounded-md"
                />
              </div>
            </div>
          ))}
          <button
            type="button"
            onClick={handleAddAgeData}
            className="text-blue-500 hover:underline"
          >
            Add Age Data
          </button>
        </div>

        {/* Submission */}
        <div className="mt-6">
          {error && <p className="text-red-500">{error}</p>}
          {successMessage && <p className="text-green-500">{successMessage}</p>}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
          >
            Submit Benchmark Data
          </button>
        </div>
      </form>
    </div>
  );
};

export default BenchmarkForm;

