import React, { useState, useEffect } from "react";
import axios from "axios";
import AdminSidebar from "../layout/AdminSidebar";
import { useNavigate } from "react-router-dom";
import Select from "react-select";

const API = "http://localhost:5001/api";

const AdminVaccine = () => {
  const [showAddVaccineModal, setShowAddVaccineModal] = useState(false);
  const [vaccineName, setVaccineName] = useState("");
  const [animalType, setAnimalType] = useState("");
  const [breedsList, setBreedsList] = useState([]);
  const [selectedBreeds, setSelectedBreeds] = useState([]);
  const [effectivenessData, setEffectivenessData] = useState([]);
  const [animals, setAnimals] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAnimals = async () => {
      try {
        const response = await axios.get(`${API}/animal/getallanimal`);
        setAnimals(response.data.data);
      } catch (error) {
        console.error("Error fetching animals:", error);
      }
    };
    fetchAnimals();
  }, []);

  useEffect(() => {
    const fetchBreeds = async () => {
      if (!animalType) return;
      try {
        const response = await axios.get(`${API}/breed/getbreed/${animalType}`);
        setBreedsList(response.data.data || []);
        setSelectedBreeds([]);
      } catch (error) {
        console.error("Error fetching breeds:", error);
      }
    };
    fetchBreeds();
  }, [animalType]);

  const handleEffectivenessChange = (index, field, value) => {
    let sanitizedValue = value;
    if (field === "minAge" || field === "maxAge") {
      sanitizedValue = Math.max(0, Math.min(70, Number(value)));
    } else if (field === "effectivenessPercentage") {
      sanitizedValue = Math.max(0, Math.min(100, Number(value)));
    }
    const updatedData = [...effectivenessData];
    updatedData[index][field] = sanitizedValue;
    setEffectivenessData(updatedData);
  };

  const addEffectivenessRow = () => {
    setEffectivenessData([
      ...effectivenessData,
      { minAge: "", maxAge: "", effectivenessPercentage: "" },
    ]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newVaccine = {
      vaccineName,
      animalType,
      breeds: selectedBreeds.map((breed) => breed.value),
      effectiveness: effectivenessData,
    };

    try {
      await axios.post(`${API}/vaccine/addvaccine`, newVaccine);
      setShowAddVaccineModal(false);
    } catch (error) {
      setError("Error adding vaccine");
      console.error("Error adding vaccine:", error);
    }
  };

  return (
    <div className="flex min-h-screen">
      <AdminSidebar />
      <div className="flex-1 p-4 ml-[250px]">
        <h2 className="text-2xl font-semibold mb-4">Vaccines</h2>
        <button
          onClick={() => setShowAddVaccineModal(true)}
          className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 mb-4"
        >
          Add Vaccine
        </button>

        {showAddVaccineModal && (
          <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
              <h3 className="text-xl font-semibold mb-4">Add New Vaccine</h3>
              {error && <p className="text-red-500 mb-4">{error}</p>}
              <form onSubmit={handleSubmit}>
                <label className="block mb-2">Vaccine Name</label>
                <input
                  type="text"
                  value={vaccineName}
                  onChange={(e) => setVaccineName(e.target.value)}
                  className="w-full border rounded-lg px-4 py-2 mb-4"
                  required
                />

                <label className="block mb-2">Animal Type</label>
                <select
                  value={animalType}
                  onChange={(e) => setAnimalType(e.target.value)}
                  className="w-full border rounded-lg px-4 py-2 mb-4"
                  required
                >
                  <option value="">Select Animal Type</option>
                  {animals.map((animal) => (
                    <option key={animal._id} value={animal._id}>
                      {animal.animal_type}
                    </option>
                  ))}
                </select>

                <label className="block mb-2">Breeds</label>
                <Select
                  isMulti
                  options={
                    breedsList.length > 0
                      ? breedsList.map((breed) => ({
                          value: breed._id,
                          label: breed.breed_name,
                        }))
                      : []
                  }
                  value={selectedBreeds}
                  onChange={setSelectedBreeds}
                  className="w-full border rounded-lg px-4 py-2 mb-4"
                />

                <h3 className="text-lg font-semibold mb-2">Effectiveness Data</h3>
                {effectivenessData.map((range, index) => (
                  <div key={index} className="mb-3 p-2 rounded border border-gray-300 bg-gray-50">
                    <input
                      type="number"
                      placeholder="Min Age (Months)"
                      value={range.minAge}
                      onChange={(e) => handleEffectivenessChange(index, "minAge", e.target.value)}
                      className="w-full px-2 py-1 border border-gray-300 rounded-md mb-2"
                    />
                    <input
                      type="number"
                      placeholder="Max Age (Months)"
                      value={range.maxAge}
                      onChange={(e) => handleEffectivenessChange(index, "maxAge", e.target.value)}
                      className="w-full px-2 py-1 border border-gray-300 rounded-md mb-2"
                    />
                    <input
                      type="number"
                      placeholder="Effectiveness (%)"
                      value={range.effectivenessPercentage}
                      onChange={(e) =>
                        handleEffectivenessChange(index, "effectivenessPercentage", e.target.value)
                      }
                      className="w-full px-2 py-1 border border-gray-300 rounded-md"
                      required
                    />
                  </div>
                ))}

                <button type="button" onClick={addEffectivenessRow} className="text-blue-600 mt-4 hover:underline">
                  + Add Effectiveness Data
                </button>

                <div className="flex justify-between mt-4">
                  <button
                    type="button"
                    onClick={() => setShowAddVaccineModal(false)}
                    className="bg-gray-500 text-white px-4 py-2 rounded-md"
                  >
                    Cancel
                  </button>
                  <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-md">
                    Add Vaccine
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminVaccine;
