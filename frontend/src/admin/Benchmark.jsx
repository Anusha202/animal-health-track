import React, { useState } from 'react';

const BenchmarkForm = () => {
  const [formData, setFormData] = useState({
    animalType: '',
    breed: '',
    weight: { min: '', max: '' },
    lifespan: { min: '', max: '' },
    averageTemperature: '',
    ageData: [
      {
        ageRange: { min: '', max: '' },
        weightRange: { min: '', max: '' },
        milkPerDay: { min: '', max: '' },
      },
    ],
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const [parentKey, childKey] = name.split('.');
    setFormData({
      ...formData,
      [parentKey]: {
        ...formData[parentKey],
        [childKey]: value,
      },
    });
  };

  const handleAgeDataChange = (index, field, value) => {
    const updatedAgeData = [...formData.ageData];
    updatedAgeData[index][field] = value;
    setFormData({
      ...formData,
      ageData: updatedAgeData,
    });
  };

  const handleAddAgeData = () => {
    setFormData({
      ...formData,
      ageData: [
        ...formData.ageData,
        {
          ageRange: { min: '', max: '' },
          weightRange: { min: '', max: '' },
          milkPerDay: { min: '', max: '' },
        },
      ],
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Submitting data:', formData);
    // You can make an API call here to save the data to the backend
  };

  return (
    <div className="flex justify-center items-center bg-gray-50 p-4 min-h-screen">
      <div className="p-4 rounded-lg shadow-lg w-full max-w-2xl bg-white">
        <h2 className="text-xl font-semibold text-center mb-3 text-gray-700">Animal Benchmark Data</h2>
        
        <form onSubmit={handleSubmit}>
          {/* Animal Type and Breed */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">Animal Type</label>
              <input
                type="text"
                name="animalType"
                value={formData.animalType}
                onChange={handleInputChange}
                className="w-full px-2 py-1 border border-gray-300 rounded-md focus:ring focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">Breed</label>
              <input
                type="text"
                name="breed"
                value={formData.breed}
                onChange={handleInputChange}
                className="w-full px-2 py-1 border border-gray-300 rounded-md focus:ring focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Weight */}
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-600 mb-1">Weight (Min and Max)</label>
            <div className="grid grid-cols-2 gap-4">
              <input
                type="number"
                name="weight.min"
                value={formData.weight.min}
                onChange={handleInputChange}
                placeholder="Min"
                className="w-full px-2 py-1 border border-gray-300 rounded-md focus:ring focus:ring-blue-500"
              />
              <input
                type="number"
                name="weight.max"
                value={formData.weight.max}
                onChange={handleInputChange}
                placeholder="Max"
                className="w-full px-2 py-1 border border-gray-300 rounded-md focus:ring focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Lifespan */}
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-600 mb-1">Lifespan (Min and Max)</label>
            <div className="grid grid-cols-2 gap-4">
              <input
                type="number"
                name="lifespan.min"
                value={formData.lifespan.min}
                onChange={handleInputChange}
                placeholder="Min"
                className="w-full px-2 py-1 border border-gray-300 rounded-md focus:ring focus:ring-blue-500"
              />
              <input
                type="number"
                name="lifespan.max"
                value={formData.lifespan.max}
                onChange={handleInputChange}
                placeholder="Max"
                className="w-full px-2 py-1 border border-gray-300 rounded-md focus:ring focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Average Temperature */}
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-600 mb-1">Average Temperature</label>
            <input
              type="number"
              name="averageTemperature"
              value={formData.averageTemperature}
              onChange={handleInputChange}
              className="w-full px-2 py-1 border border-gray-300 rounded-md focus:ring focus:ring-blue-500"
            />
          </div>

          {/* Age Data */}
          <div className="mt-4">
            <h4 className="text-sm font-semibold text-gray-700 mb-2">Age Data</h4>
            {formData.ageData.map((ageEntry, index) => (
              <div key={index} className="mb-4 p-2 rounded border border-gray-300 bg-gray-50">
                <div className="grid grid-cols-3 gap-4 mb-2">
                  <input
                    type="number"
                    name={`ageRange.min`}
                    value={ageEntry.ageRange.min}
                    onChange={(e) => handleAgeDataChange(index, 'ageRange.min', e.target.value)}
                    placeholder="Age Range Min"
                    className="w-full px-2 py-1 border border-gray-300 rounded-md focus:ring focus:ring-blue-500"
                  />
                  <input
                    type="number"
                    name={`ageRange.max`}
                    value={ageEntry.ageRange.max}
                    onChange={(e) => handleAgeDataChange(index, 'ageRange.max', e.target.value)}
                    placeholder="Age Range Max"
                    className="w-full px-2 py-1 border border-gray-300 rounded-md focus:ring focus:ring-blue-500"
                  />
                  <input
                    type="number"
                    name={`weightRange.min`}
                    value={ageEntry.weightRange.min}
                    onChange={(e) => handleAgeDataChange(index, 'weightRange.min', e.target.value)}
                    placeholder="Weight Range Min"
                    className="w-full px-2 py-1 border border-gray-300 rounded-md focus:ring focus:ring-blue-500"
                  />
                </div>
                <div className="grid grid-cols-3 gap-4 mb-2">
                  <input
                    type="number"
                    name={`weightRange.max`}
                    value={ageEntry.weightRange.max}
                    onChange={(e) => handleAgeDataChange(index, 'weightRange.max', e.target.value)}
                    placeholder="Weight Range Max"
                    className="w-full px-2 py-1 border border-gray-300 rounded-md focus:ring focus:ring-blue-500"
                  />
                  <input
                    type="number"
                    name={`milkPerDay.min`}
                    value={ageEntry.milkPerDay.min}
                    onChange={(e) => handleAgeDataChange(index, 'milkPerDay.min', e.target.value)}
                    placeholder="Milk Per Day Min"
                    className="w-full px-2 py-1 border border-gray-300 rounded-md focus:ring focus:ring-blue-500"
                  />
                  <input
                    type="number"
                    name={`milkPerDay.max`}
                    value={ageEntry.milkPerDay.max}
                    onChange={(e) => handleAgeDataChange(index, 'milkPerDay.max', e.target.value)}
                    placeholder="Milk Per Day Max"
                    className="w-full px-2 py-1 border border-gray-300 rounded-md focus:ring focus:ring-blue-500"
                  />
                </div>
              </div>
            ))}
            <button
              type="button"
              onClick={handleAddAgeData}
              className="text-xs bg-blue-500 text-white px-2 py-1 rounded-md hover:bg-blue-600 transition"
            >
              Add Age Data
            </button>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-1 mt-4 rounded-md text-sm hover:bg-blue-600 transition"
          >
            Submit Data
          </button>
        </form>
      </div>
    </div>
  );
};

export default BenchmarkForm;
