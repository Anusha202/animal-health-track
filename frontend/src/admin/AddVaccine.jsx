import React, { useState, useEffect } from "react";
import axios from "axios";
import AdminSidebar from "../layout/AdminSidebar";
import { useNavigate } from "react-router-dom";

const API = "http://localhost:5001/api";

const AdminVaccine = () => {
  const [showAddVaccineModal, setShowAddVaccineModal] = useState(false);
  const [vaccineName, setVaccineName] = useState("");
  const [animalType, setAnimalType] = useState("");
  const [breedsList, setBreedsList] = useState([]);
  const [selectedBreed, setSelectedBreed] = useState("");
  const [effectivenessData, setEffectivenessData] = useState([]);
  const [animals, setAnimals] = useState([]);
  const [vaccineList, setVaccineList] = useState([]);
  const [selectedVaccineId, setSelectedVaccineId] = useState(null); // Store vaccine ID for edit
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Fetch all animal types
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

  // Fetch breeds based on selected animal type
  useEffect(() => {
    const fetchBreeds = async () => {
      if (!animalType) return; // Prevent API call if animalType is not selected
      try {
        const response = await axios.get(`${API}/breed/getbreedsbyanimal/${animalType}`);
        setBreedsList(response.data.data || []);
        setSelectedBreed(""); // Reset selected breed
      } catch (error) {
        console.error("Error fetching breeds:", error);
        setBreedsList([]); // Ensure breeds list is empty on error
      }
    };
    fetchBreeds();
  }, [animalType]);

  // Fetch all vaccines
  useEffect(() => {
    const fetchVaccines = async () => {
      try {
        const response = await axios.get(`${API}/vaccine/getvaccines`);
        setVaccineList(response.data.data || []);
      } catch (error) {
        console.error("Error fetching vaccines:", error);
      }
    };
    fetchVaccines();
  }, []);

  // Handle changes in effectiveness data
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

  // Add a new row for effectiveness data
  const addEffectivenessRow = () => {
    setEffectivenessData([
      ...effectivenessData,
      { minAge: "", maxAge: "", effectivenessPercentage: "" },
    ]);
  };

  // Handle form submission (Add or Edit)
  const handleSubmit = async (e) => {
    e.preventDefault();
    const vaccineData = {
      vaccineName,
      animalType,
      breed: selectedBreed,
      effectiveness: effectivenessData,
    };

    try {
      if (selectedVaccineId) {
        // Edit existing vaccine
        await axios.put(`${API}/vaccine/updatevaccine/${selectedVaccineId}`, vaccineData);
        setSelectedVaccineId(null); // Reset selected vaccine after edit
      } else {
        // Add new vaccine
        await axios.post(`${API}/vaccine/addvaccine`, vaccineData);
      }
      setShowAddVaccineModal(false);
      setVaccineList((prevList) => [...prevList, vaccineData]); // Update vaccine list
    } catch (error) {
      setError("Error submitting vaccine data");
      console.error("Error submitting vaccine data:", error);
    }
  };

  // Handle Edit button click
  const handleEditClick = (vaccine) => {
    setVaccineName(vaccine.vaccineName);
    setAnimalType(vaccine.animalType);
    setSelectedBreed(vaccine.breed);
    setEffectivenessData(vaccine.effectiveness || []);
    setSelectedVaccineId(vaccine._id); // Set selected vaccine for editing
    setShowAddVaccineModal(true); // Open modal for editing
  };

  // Handle Delete button click
  const handleDeleteClick = async (id) => {
    try {
      await axios.delete(`${API}/vaccine/deletevaccine/${id}`);
      setVaccineList(vaccineList.filter((vaccine) => vaccine._id !== id)); // Remove vaccine from list
    } catch (error) {
      console.error("Error deleting vaccine:", error);
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

        {/* Vaccine List */}
        <div className="mb-4">
          <h3 className="text-xl font-semibold mb-2">Existing Vaccines</h3>
          <table className="min-w-full bg-white border border-gray-200">
            <thead>
              <tr>
                <th className="px-4 py-2 text-left">Vaccine Name</th>
                <th className="px-4 py-2 text-left">Animal Type</th>
                <th className="px-4 py-2 text-left">Breed</th>
                <th className="px-4 py-2 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {vaccineList.map((vaccine) => (
                <tr key={vaccine._id}>
                  <td className="px-4 py-2">{vaccine.vaccineName}</td>
                  <td className="px-4 py-2">{vaccine.animalType}</td>
                  <td className="px-4 py-2">{vaccine.breed}</td>
                  <td className="px-4 py-2">
                    <button
                      onClick={() => handleEditClick(vaccine)}
                      className="bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-600 mr-2"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteClick(vaccine._id)}
                      className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {showAddVaccineModal && (
          <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
              <h3 className="text-xl font-semibold mb-4">
                {selectedVaccineId ? "Edit Vaccine" : "Add New Vaccine"}
              </h3>
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

                <label className="block mb-2">Breed</label>
                <select
                  value={selectedBreed}
                  onChange={(e) => setSelectedBreed(e.target.value)}
                  className="w-full border rounded-lg px-4 py-2 mb-4"
                  required
                >
                  <option value="">Select Breed</option>
                  {breedsList.map((breed) => (
                    <option key={breed._id} value={breed._id}>
                      {breed.breed_name}
                    </option>
                  ))}
                </select>

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
                    {selectedVaccineId ? "Update Vaccine" : "Add Vaccine"}
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
