import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AdminSidebar from "../layout/AdminSidebar";
import Select from "react-select";

const API = "http://localhost:5001/api";

const AdminAnimal = () => {
  const [showModal, setShowModal] = useState(false);
  const [animals, setAnimals] = useState([]);
  const [newAnimal, setNewAnimal] = useState({ animal_type: "", breeds: [] });
  const [editAnimal, setEditAnimal] = useState(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const breedOptions = {
    cow: [
      { label: "Jersey", value: "jersey" },
      { label: "Holstein", value: "holstein" },
      { label: "Sahiwal", value: "sahiwal" },
    ],
    dog: [
      { label: "Labrador", value: "labrador" },
      { label: "Beagle", value: "beagle" },
      { label: "German Shepherd", value: "german_shepherd" },
    ],
    chicken: [
      { label: "Rhode Island Red", value: "rhode_island_red" },
      { label: "Leghorn", value: "leghorn" },
      { label: "Plymouth Rock", value: "plymouth_rock" },
    ],
  };

  useEffect(() => {
    axios.get(`${API}/animal/getallanimal`).then((response) => {
      setAnimals(response.data.data);
    }).catch((error) => {
      console.error("Error fetching animals:", error);
    });
  }, []);

  const handleModalClose = () => {
    setShowModal(false);
    setEditAnimal(null);
    setNewAnimal({ animal_type: "", breeds: [] });
    setError("");
  };

  const handleEdit = (animal) => {
    setEditAnimal(animal);
    const selectedAnimalType = animal.animal_type.toLowerCase();
    const availableBreeds = breedOptions[selectedAnimalType] || [];
    const selectedBreeds = animal.breeds.map((breed) => ({
      label: breed.breed_name,
      value: breed.breed_name.toLowerCase(),
    }));
    
    // Filter out already selected breeds from the dropdown options
    const filteredBreeds = availableBreeds.filter(
      (breed) => !selectedBreeds.some((selected) => selected.value === breed.value)
    );
    
    setNewAnimal({
      animal_type: selectedAnimalType,
      breeds: selectedBreeds,
    });
    setShowModal(true);
  };

  const handleUpdateAnimal = () => {
    if (!newAnimal.animal_type || !newAnimal.breeds.length) {
      setError("All fields are required.");
      return;
    }
    
    const updatedAnimals = animals.map((animal) =>
      animal._id === editAnimal._id
        ? { 
            ...animal, 
            animal_type: newAnimal.animal_type, 
            breeds: newAnimal.breeds.map((breed) => ({ breed_name: breed.label })) 
          }
        : animal
    );
    setAnimals(updatedAnimals);
    handleModalClose();
  };

  const handleDelete = (id) => {
    setAnimals(animals.filter((animal) => animal._id !== id));
  };

  const handleInputChange = (e) => {
    setNewAnimal({ ...newAnimal, [e.target.name]: e.target.value });
  };

  const handleBreedChange = (selectedOptions) => {
    setNewAnimal({ ...newAnimal, breeds: selectedOptions || [] });
  };

  return (
    <div className="flex min-h-screen">
      <AdminSidebar />
      <div className="flex-1 p-4 ml-[250px]">
        <h2 className="text-2xl font-semibold mb-4">Animals</h2>
        <button onClick={() => setShowModal(true)} className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 mb-4">Add Animal</button>
        <table className="w-full border-collapse border border-gray-200">
          <thead>
            <tr className="bg-gray-100">
              <th className="border px-4 py-2">#</th>
              <th className="border px-4 py-2">Animal Type</th>
              <th className="border px-4 py-2">Breeds</th>
              <th className="border px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {animals.map((animal, index) => (
              <tr key={animal._id} className="border-b">
                <td className="px-4 py-2">{index + 1}</td>
                <td className="px-4 py-2">{animal.animal_type}</td>
                <td className="px-4 py-2">{animal.breeds.map((breed) => breed.breed_name).join(", ")}</td>
                <td className="px-4 py-2">
                  <button onClick={() => handleEdit(animal)} className="bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-600 mr-2">Edit</button>
                  <button onClick={() => handleDelete(animal._id)} className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {showModal && (
          <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
              <h3 className="text-xl font-semibold mb-4">{editAnimal ? "Edit Animal" : "Add New Animal"}</h3>
              {error && <p className="text-red-500 mb-4">{error}</p>}
              <form onSubmit={(e) => { e.preventDefault(); editAnimal ? handleUpdateAnimal() : handleAddAnimal(); }}>
                <label className="block mb-2">Animal Type</label>
                <select 
                  name="animal_type" 
                  value={newAnimal.animal_type} 
                  onChange={handleInputChange} 
                  className="w-full border rounded-lg px-4 py-2"
                >
                  <option value="">Select an animal type</option>
                  {Object.keys(breedOptions).map((type) => (
                    <option key={type} value={type}>{type.charAt(0).toUpperCase() + type.slice(1)}</option>
                  ))}
                </select>
                <label className="block mt-4 mb-2">Breeds</label>
                <Select 
                  isMulti 
                  options={breedOptions[newAnimal.animal_type] || []} 
                  value={newAnimal.breeds} 
                  onChange={handleBreedChange} 
                  className="w-full"
                />
                <div className="flex justify-between mt-4">
                  <button type="button" onClick={handleModalClose} className="bg-gray-500 text-white px-4 py-2 rounded-md">Cancel</button>
                  <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-md">{editAnimal ? "Update Animal" : "Add Animal"}</button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminAnimal;
