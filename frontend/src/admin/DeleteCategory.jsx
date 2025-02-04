import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import AdminSidebar from "../layout/AdminSidebar";

const API = "http://localhost:5001/api";

export const deleteAnimal = async (id) => {
  try {
    const response = await fetch(`${API}/animal/delete/${id}`, { method: "DELETE" });
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.json();
  } catch (error) {
    console.error("Error during deleteAnimal request:", error);
    return { error: "An error occurred while deleting the animal." };
  }
};

const DeleteCategory = () => {
  const [animals, setAnimals] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`${API}/animal/getallanimal`)
      .then((response) => setAnimals(response.data.data))
      .catch((error) => console.error("Error fetching animals:", error));
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this animal type?")) {
      const response = await deleteAnimal(id);
      if (response.success) {
        setAnimals(animals.filter((animal) => animal._id !== id));
      } else {
        alert(response.error || "Failed to delete animal type.");
      }
    }
  };

  return (
    <div className="flex min-h-screen">
      <AdminSidebar />
      <div className="flex-1 p-4 ml-[250px]">
        <h2 className="text-2xl font-semibold mb-4">Animals</h2>
        
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
                <td className="px-4 py-2">{animal.breeds.map((b) => b.breed_name).join(", ")}</td>
                <td className="px-4 py-2">
                  <button 
                    onClick={() => navigate(`/admin/update-category/${animal._id}`, { state: { animal } })} 
                    className="bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-600 mr-2"
                  >
                    Edit
                  </button>
                  <button 
                    onClick={() => handleDelete(animal._id)} 
                    className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DeleteCategory;
