import React, { useState } from "react";
import { FaSyringe } from "react-icons/fa";

const VaccineReject = () => {
  // State for animal type, breed, and vaccines
  const [animalType, setAnimalType] = useState("Dog");
  const [breed, setBreed] = useState("Bulldog");

  const animalData = {
    Dog: {
      breeds: ["Bulldog", "Labrador", "Beagle"],
      vaccines: [
        { vaccine_name: "Rabies", id: 1 },
        { vaccine_name: "Parvovirus", id: 2 },
        { vaccine_name: "Distemper", id: 3 },
      ],
    },
    Cow: {
      breeds: ["Jersey", "Holstein", "Angus"],
      vaccines: [
        { vaccine_name: "Brucellosis", id: 1 },
        { vaccine_name: "Tuberculosis", id: 2 },
        { vaccine_name: "Foot-and-Mouth", id: 3 },
      ],
    },
    Chicken: {
      breeds: ["Leghorn", "Rhode Island Red", "Plymouth Rock"],
      vaccines: [
        { vaccine_name: "Marek's Disease", id: 1 },
        { vaccine_name: "Newcastle Disease", id: 2 },
        { vaccine_name: "Avian Influenza", id: 3 },
      ],
    },
  };

  const [vaccines, setVaccines] = useState(animalData[animalType].vaccines);
  const [selectedVaccines, setSelectedVaccines] = useState({});
  const [message, setMessage] = useState(""); // State for displaying message

  // Handle vaccine acceptance or rejection
  const handleAction = (vaccineName, action) => {
    setSelectedVaccines({
      ...selectedVaccines,
      [vaccineName]: action,
    });
    setMessage(`${vaccineName} vaccine ${action === "accepted" ? "Accepted" : "Rejected"}`); // Display message
  };

  // Handle animal type change
  const handleAnimalChange = (e) => {
    const selectedAnimal = e.target.value;
    setAnimalType(selectedAnimal);
    setBreed(animalData[selectedAnimal].breeds[0]);
    setVaccines(animalData[selectedAnimal].vaccines);
  };

  // Handle breed change
  const handleBreedChange = (e) => {
    setBreed(e.target.value);
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-r from-blue-50 to-blue-100">
      {/* Sidebar */}
      <div className="w-64 bg-gray-800 p-4 text-white">
        <h2 className="text-xl font-bold">Admin Sidebar</h2>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8 ml-[250px]">
        <h1 className="text-3xl text-blue-700 pt-8 pb-4 font-bold">
          Vaccine Suggestions for 
        </h1>

        {/* Animal Type and Breed Selection */}
        <div className="flex space-x-4 mb-6">
          <div>
            <label htmlFor="animal-type" className="block text-lg font-semibold">
              Animal Type:
            </label>
            <select
              id="animal-type"
              value={animalType}
              onChange={handleAnimalChange}
              className="w-full p-2 border border-gray-300 rounded"
            >
              {Object.keys(animalData).map((animal) => (
                <option key={animal} value={animal}>
                  {animal}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="breed" className="block text-lg font-semibold">
              Breed:
            </label>
            <select
              id="breed"
              value={breed}
              onChange={handleBreedChange}
              className="w-full p-2 border border-gray-300 rounded"
            >
              {animalData[animalType].breeds.map((breedOption) => (
                <option key={breedOption} value={breedOption}>
                  {breedOption}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Vaccine List */}
        <div className="vaccines-list w-full md:w-3/4 lg:w-2/3 py-10">
          <h1 className="text-3xl font-bold pb-6 text-center text-blue-700">
            Suggested Vaccines
          </h1>
          <div className="vaccines-list-container w-full max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-xl border border-blue-300">
            <table className="table-auto w-full text-sm">
              <thead>
                <tr className="bg-blue-100">
                  <th className="py-4 px-6 text-left text-blue-800">
                    Vaccine Name
                  </th>
                  <th className="py-4 px-6 text-left text-blue-800">Action</th>
                </tr>
              </thead>
              <tbody>
                {vaccines.map((vaccine, index) => (
                  <tr
                    key={index}
                    className="border-b hover:bg-blue-50 transition duration-300"
                  >
                    <td className="py-3 px-6 flex items-center space-x-3">
                      <div className="flex items-center space-x-2">
                        <div className="bg-orange-100 p-2 rounded-full">
                          <FaSyringe className="text-orange-600 text-xl" />
                        </div>
                        <span className="font-semibold text-gray-800">
                          {vaccine.vaccine_name}
                        </span>
                      </div>
                    </td>
                    <td className="py-3 px-6 text-gray-700">
                      <button
                        className={`px-4 py-2 mr-2 rounded ${
                          selectedVaccines[vaccine.vaccine_name] === "accepted"
                            ? "bg-green-500 text-white"
                            : "bg-gray-500 text-white"
                        }`}
                        onClick={() => handleAction(vaccine.vaccine_name, "accepted")}
                        disabled={selectedVaccines[vaccine.vaccine_name] === "accepted"}
                      >
                        Accept
                      </button>
                      <button
                        className={`px-4 py-2 rounded ${
                          selectedVaccines[vaccine.vaccine_name] === "rejected"
                            ? "bg-red-500 text-white"
                            : "bg-gray-500 text-white"
                        }`}
                        onClick={() => handleAction(vaccine.vaccine_name, "rejected")}
                        disabled={selectedVaccines[vaccine.vaccine_name] === "rejected"}
                      >
                        Reject
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Message Display */}
        {message && (
          <div className="mt-6 p-4 text-center text-lg font-semibold text-green-600">
            {message}
          </div>
        )}
      </div>
    </div>
  );
};

export default VaccineReject;
