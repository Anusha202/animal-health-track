import React, { useState, useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const API = "http://localhost:5001/api";

const UpdateCategory = () => {
  const { id } = useParams(); 
  const location = useLocation();
  const navigate = useNavigate();
  
  const [animalType, setAnimalType] = useState("");
  const [breeds, setBreeds] = useState([]);
  const [newBreed, setNewBreed] = useState("");

  useEffect(() => {
    if (location.state?.animal) {
      // Prefill form with data passed from DeleteCategory
      const { animal_type, breeds } = location.state.animal;
      setAnimalType(animal_type);
      setBreeds(breeds || []);
    } else {
      // Fetch from API if no state is available
      axios.get(`${API}/animal/${id}`)
        .then((res) => {
          setAnimalType(res.data.animal_type);
          setBreeds(res.data.breeds || []);
        })
        .catch((err) => console.error("Error fetching animal:", err));
    }
  }, [id, location.state]);

  const handleUpdate = async () => {
    try {
      const response = await axios.put(`${API}/animal/update/${id}`, {
        animal_type: animalType,
        breeds,
      });

      if (response.data.success) {
        alert("Animal updated successfully!");
        navigate("/admin/delete-category");
      } else {
        alert("Failed to update animal.");
      }
    } catch (error) {
      console.error("Error updating animal:", error);
    }
  };

  const handleAddBreed = () => {
    if (newBreed) {
      setBreeds([...breeds, { breed_name: newBreed }]);
      setNewBreed("");
    }
  };

  const handleRemoveBreed = (index) => {
    setBreeds(breeds.filter((_, i) => i !== index));
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4">Update Animal Type</h2>

        <label className="block mb-2">Animal Type</label>
        <input
          type="text"
          value={animalType}
          onChange={(e) => setAnimalType(e.target.value)}
          className="w-full border rounded-lg px-4 py-2 mb-4"
        />

        <h3 className="text-lg font-semibold mb-2">Breeds</h3>
        <ul>
          {breeds.map((breed, index) => (
            <li key={index} className="flex justify-between items-center mb-2">
              {breed.breed_name}
              <button
                onClick={() => handleRemoveBreed(index)}
                className="text-red-500"
              >
                ❌
              </button>
            </li>
          ))}
        </ul>

        <input
          type="text"
          value={newBreed}
          onChange={(e) => setNewBreed(e.target.value)}
          placeholder="Enter breed name"
          className="w-full border rounded-lg px-4 py-2 mb-2"
        />
        <button onClick={handleAddBreed} className="bg-blue-600 text-white px-4 py-2 rounded-md mb-4 w-full">
          Add Breed
        </button>

        <div className="flex justify-between">
          <button onClick={() => navigate("/admin/delete-category")} className="bg-gray-500 text-white px-4 py-2 rounded-md">
            Cancel
          </button>
          <button onClick={handleUpdate} className="bg-green-600 text-white px-4 py-2 rounded-md">
            Update
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpdateCategory;
