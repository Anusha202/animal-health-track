import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const API = "http://localhost:5001/api";

const UpdateCategory = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    animalType: "",
    breeds: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategoryData = async () => {
      try {
        // Fetch animal data using /getanimals/:id
        const response = await axios.get(`${API}/animal/getanimals/${id}`, { withCredentials: true });
        
        if (response.data.success) {
          const { animal_type, breeds } = response.data.data;
          
          // Populate formData with the fetched animal type and breed names
          setFormData({
            animalType: animal_type || "",
            breeds: breeds ? breeds.map(breed => breed.breed_name).join(", ") : "",
          });
        } else {
          setError("Animal category not found.");
        }
      } catch (err) {
        console.error(err);
        setError("Failed to load category data.");
      }
    };

    fetchCategoryData();
  }, [id]); // Dependency on id, ensuring it fetches data whenever the id changes

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    const { animalType, breeds } = formData;

    // Validate fields
    if (!animalType || !breeds) {
      setError("All fields are required.");
      return;
    }

    const breedList = breeds.split(",").map((breed) => breed.trim());

    const updatedData = {
      animal_type: animalType,
      breeds: breedList,
    };

    setLoading(true);
    try {
      const response = await axios.put(`${API}/animal/update/${id}`, updatedData, {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json',
        }
      });
      if (response.data.success) {
        alert("Category updated successfully!");
        navigate("/admin/add-category");
      } else {
        setError(response.data.error || "An unexpected error occurred.");
      }
    } catch (err) {
      console.error(err);
      setError("An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 to-blue-100 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-lg bg-white p-6 rounded-lg shadow-xl">
        <h1 className="text-3xl font-bold pb-6 text-center text-blue-700">
          Update Category
        </h1>
        {error && <p className="text-red-600 text-center mb-4">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="animalType"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Animal Type
            </label>
            <input
              type="text"
              id="animalType"
              name="animalType"
              value={formData.animalType}
              onChange={handleChange}
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              placeholder="Enter animal type"
            />
          </div>

          <div>
            <label
              htmlFor="breeds"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Breeds (comma separated)
            </label>
            <input
              type="text"
              id="breeds"
              name="breeds"
              value={formData.breeds}
              onChange={handleChange}
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              placeholder="Enter breeds, separated by commas"
            />
          </div>

          <button
            type="submit"
            className={`w-full px-6 py-3 rounded-lg shadow-md text-white transition-all ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-500 hover:bg-blue-600"
            }`}
            disabled={loading}
          >
            {loading ? "Updating..." : "Update Category"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateCategory;
