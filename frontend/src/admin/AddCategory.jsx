import React, { useState, useEffect } from "react";
import axios from "axios";
import AdminSidebar from "../layout/AdminSidebar";
import { useNavigate } from "react-router-dom";
import { addBreed } from "../api/Breed";

const API = "http://localhost:5001/api";

const AdminAnimal = () => {
  const [showAddAnimalModal, setShowAddAnimalModal] = useState(false);
  const [animals, setAnimals] = useState([]);
  const [newAnimalType, setNewAnimalType] = useState('');
  const [newBreeds, setNewBreeds] = useState('');
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Fetch all animals with their breeds
  const fetchAnimals = async () => {
    try {
      const response = await axios.get(`${API}/animal/getallanimal`);
      setAnimals(response.data.data);
    } catch (error) {
      console.error("Error fetching animals:", error);
    }
  };

  useEffect(() => {
    fetchAnimals();
  }, []);

  // Function to add a breed
  const addBreed = async (breedName, animalTypeId) => {
    try {
      const response = await axios.post(`${API}/breed/addbreed`, {
        breed_name: breedName,
        animal_type: animalTypeId,
      });
      return response.data;
    } catch (error) {
      console.error("Error adding breed:", error);
      return { error: "Error adding breed" };
    }
  };

  // Function to add an animal type along with breeds
  const handleAddAnimal = async () => {
    if (!newAnimalType || !newBreeds) {
      setError("Animal type and breed(s) are required.");
      return;
    }

    const breedList = newBreeds.split(",").map(breed => breed.trim());

    try {
      const response = await axios.post(`${API}/animal/addanimal`, {
        animal_type: newAnimalType,
      });

      if (response.data.success) {
        const animalTypeId = response.data.data._id;

        for (let breed of breedList) {
          await addBreed(breed, animalTypeId);
        }

        fetchAnimals();
        setShowAddAnimalModal(false);
        setNewAnimalType("");
        setNewBreeds("");
        setError("");
      } else {
        setError(response.data.message || "Failed to add animal type.");
      }
    } catch (error) {
      setError("An error occurred while adding the animal type and breeds.");
      console.error("Error adding animal type:", error);
    }
  };

  const handleEdit = (animal) => {
    navigate(`/admin/update-category/${animal._id}`);
  };

  return (
    <div className="flex min-h-screen">
      <AdminSidebar />
      <div className="flex-1 p-4 ml-[250px]">
        <h2 className="text-2xl font-semibold mb-4">Animals</h2>

        <button
          onClick={() => setShowAddAnimalModal(true)}
          className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 mb-4"
        >
          Add Animal Type
        </button>

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
                <td className="px-4 py-2">
                  {animal.breeds && animal.breeds.map((breed) => breed.breed_name).join(", ")}
                </td>
                <td className="px-4 py-2">
                  <button
                    onClick={() => handleEdit(animal)}
                    className="bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-600 mr-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => console.log("Delete function here")}
                    className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Modal for Adding Animal Type */}
        {showAddAnimalModal && (
          <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
              <h3 className="text-xl font-semibold mb-4">Add New Animal Type</h3>
              {error && <p className="text-red-500 mb-4">{error}</p>}
              <form onSubmit={(e) => { e.preventDefault(); handleAddAnimal(); }}>
                <label className="block mb-2">Animal Type Name</label>
                <input
                  type="text"
                  value={newAnimalType}
                  onChange={(e) => setNewAnimalType(e.target.value)}
                  placeholder="Enter animal type"
                  className="w-full border rounded-lg px-4 py-2 mb-4"
                  required
                />

                <label className="block mb-2">Breed(s)</label>
                <input
                  type="text"
                  value={newBreeds}
                  onChange={(e) => setNewBreeds(e.target.value)}
                  placeholder="Enter breed names (comma separated)"
                  className="w-full border rounded-lg px-4 py-2 mb-4"
                  required
                />

                <div className="flex justify-between mt-4">
                  <button type="button" onClick={() => setShowAddAnimalModal(false)} className="bg-gray-500 text-white px-4 py-2 rounded-md">Cancel</button>
                  <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-md">Add Animal Type</button>
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
