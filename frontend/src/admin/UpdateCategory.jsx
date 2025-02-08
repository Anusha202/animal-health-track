import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import AdminSidebar from "../layout/AdminSidebar";

const API = "http://localhost:5001/api";

const UpdateCategory = () => {
  const [animalType, setAnimalType] = useState("");
  const [breeds, setBreeds] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const animal = location.state?.animal;

  useEffect(() => {
    if (animal) {
      setAnimalType(animal.animal_type);
      setBreeds(animal.breeds.map((b) => b.breed_name).join(", "));
    }
  }, [animal]);

  const handleUpdate = async () => {
    if (!animalType || !breeds) {
      setError("Animal type and breed(s) are required.");
      return;
    }

    const breedList = breeds.split(",").map((b) => b.trim());
    try {
      const response = await axios.put(`${API}/animal/update/${animal._id}`, {
        animal_type: animalType,
        breeds: breedList,
      });

      if (response.data.success) {
        navigate("/admin/manage-animals");
      } else {
        setError(response.data.message || "Failed to update animal type.");
      }
    } catch (error) {
      setError("An error occurred while updating the animal type and breeds.");
      console.error("Error updating animal type:", error);
    }
  };

  return (
    <div className="flex min-h-screen">
      <AdminSidebar />
      <div className="flex-1 p-4 ml-[250px]">
        <h2 className="text-2xl font-semibold mb-4">Update Animal Type</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <form onSubmit={(e) => { e.preventDefault(); handleUpdate(); }}>
          <label className="block mb-2">Animal Type Name</label>
          <input
            type="text"
            value={animalType}
            onChange={(e) => setAnimalType(e.target.value)}
            className="w-full border rounded-lg px-4 py-2 mb-4"
            required
          />

          <label className="block mb-2">Breed(s)</label>
          <input
            type="text"
            value={breeds}
            onChange={(e) => setBreeds(e.target.value)}
            className="w-full border rounded-lg px-4 py-2 mb-4"
            required
          />

          <div className="flex justify-between mt-4">
            <button type="button" onClick={() => navigate("/admin/manage-animals")} className="bg-gray-500 text-white px-4 py-2 rounded-md">Cancel</button>
            <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-md">Update</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateCategory;
