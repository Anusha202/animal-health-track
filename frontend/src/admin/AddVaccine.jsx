import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminSidebar from "../layout/AdminSidebar"; 

const AddVaccine = () => {
  const navigate = useNavigate();

  // State for form data
  const [formData, setFormData] = useState({
    vaccineName: "",
    animalType: "",
    breed: "",
    frequency: "",
    duration: "",
    ageRangeMin: "", 
    ageRangeMax: "", 
  });

  // State for success message
  const [successMessage, setSuccessMessage] = useState("");

  // Breed options based on animal type
  const breedOptions = {
    dog: ["Labrador", "German Shepherd", "Golden Retriever", "Bulldog"],
    cow: ["Jersey", "Holstein", "Angus", "Hereford"],
    hen: ["Leghorn", "Rhode Island Red", "Plymouth Rock", "Sussex"],
  };

  // Handle change in form fields
  const handleChange = (e) => {
    const { name, value } = e.target;

    // Restrict vaccine name to 30 characters
    if (name === "vaccineName" && value.length > 30) {
      return;
    }

    // Reset breed if animal type changes
    if (name === "animalType") {
      setFormData((prev) => ({ ...prev, breed: "", [name]: value }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  // Handle form submission (only frontend, no API)
  const handleSubmit = (e) => {
    e.preventDefault();
    const { vaccineName, animalType, breed, frequency, duration, ageRangeMin, ageRangeMax } = formData;

    // Validation check
    if (!vaccineName || !animalType || !breed || !frequency || !duration || !ageRangeMin || !ageRangeMax) {
      alert("Please fill in all fields");
      return;
    }

    // Age validation
    if (ageRangeMin <= 0 || ageRangeMax <= 0) {
      alert("Age can't be negative or zero.");
      return;
    }

    if (ageRangeMax > 70) {
      alert("Please enter a valid age.");
      return;
    }

    if (ageRangeMin > ageRangeMax) {
      alert("Minimum age can't be greater than maximum age.");
      return;
    }

    // Duration validation
    if (duration < 1 || duration > 30) {
      alert("Duration must be between 1 and 30 months.");
      return;
    }

    // If all validations pass, show success message
    setSuccessMessage("Vaccine added successfully!");

    // Reset form after successful submission
    setFormData({
      vaccineName: "",
      animalType: "",
      breed: "",
      frequency: "",
      duration: "",
      ageRangeMin: "",
      ageRangeMax: ""
    });
  };

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <AdminSidebar />

      {/* Main Content */}
      <div className="flex-1 p-8 ml-[250px]"> {/* Leave space for sidebar */}
        <div className="bg-white shadow-xl rounded-lg p-8 w-full max-w-lg mx-auto">
          <h2 className="text-3xl font-semibold text-gray-800 text-center mb-8">
            Add Vaccine
          </h2>

          {/* Success message */}
          {successMessage && (
            <div className="mb-4 p-4 bg-green-100 text-green-800 rounded-lg">
              {successMessage}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Vaccine Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Vaccine Name</label>
              <input type="text" name="vaccineName" value={formData.vaccineName} onChange={handleChange} className="w-full px-4 py-3 border rounded-lg" placeholder="Enter vaccine name" />
            </div>

            {/* Animal Type */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Animal Type</label>
              <select name="animalType" value={formData.animalType} onChange={handleChange} className="w-full px-4 py-3 border rounded-lg">
                <option value="">Select Animal Type</option>
                {Object.keys(breedOptions).map((type) => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>

            {/* Breed */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Breed</label>
              <select name="breed" value={formData.breed} onChange={handleChange} className="w-full px-4 py-3 border rounded-lg">
                <option value="">Select Breed</option>
                {formData.animalType && breedOptions[formData.animalType]?.map((breed) => (
                  <option key={breed} value={breed}>{breed}</option>
                ))}
              </select>
            </div>

            {/* Frequency */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Frequency</label>
              <input type="text" name="frequency" value={formData.frequency} onChange={handleChange} className="w-full px-4 py-3 border rounded-lg" placeholder="Enter frequency" />
            </div>

            {/* Age Range */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Min Age</label>
                <input type="number" name="ageRangeMin" value={formData.ageRangeMin} onChange={handleChange} className="w-full px-4 py-3 border rounded-lg" placeholder="Min age" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Max Age</label>
                <input type="number" name="ageRangeMax" value={formData.ageRangeMax} onChange={handleChange} className="w-full px-4 py-3 border rounded-lg" placeholder="Max age" />
              </div>
            </div>

            {/* Duration */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Duration (In months)</label>
              <input type="number" name="duration" value={formData.duration} onChange={handleChange} className="w-full px-4 py-3 border rounded-lg" placeholder="Enter duration" />
            </div>

            <button type="submit" className="w-full bg-blue-500 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-600 transition-all">
              Add Vaccine
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddVaccine;
