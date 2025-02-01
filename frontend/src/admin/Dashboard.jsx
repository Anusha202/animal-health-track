import React, { useState, useEffect } from "react";
import { FaUsers, FaDog, FaPaw, FaSyringe } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import DashboardCard from "../components/DashboardCard";
import axios from "axios";

// API URL
const API = "http://localhost:5001/api";

// Function to get all animals (not needed directly for animal type count now)
const getAllAnimals = () => {
  return fetch(`${API}/animal/getallanimal`)
    .then((res) => {
      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }
      return res.json();
    })
    .catch((error) => {
      console.error("Error during getAllAnimals request:", error);
      return { error: "An error occurred while retrieving animals." };
    });
};

const Dashboard = () => {
  const [vaccines, setVaccines] = useState([]);
  const [animalTypesCount, setAnimalTypesCount] = useState({}); // State to store animal type counts for vaccines
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Fetch vaccines and count animal types associated with them
  useEffect(() => {
    const fetchVaccines = async () => {
      try {
        const response = await axios.get(`${API}/vaccine/getallvaccines`);
        setVaccines(response.data);
        setLoading(false);

        // Count animal types per vaccine
        const vaccineAnimalTypeCounts = response.data.reduce((acc, vaccine) => {
          const animalType = vaccine.animal_type;
          
          // Increment count for the vaccine's animal_type
          if (acc[animalType]) {
            acc[animalType]++;
          } else {
            acc[animalType] = 1;
          }
          return acc;
        }, {});

        setAnimalTypesCount(vaccineAnimalTypeCounts); // Set the animal type count for vaccines
      } catch (err) {
        setError("Failed to load vaccines");
        setLoading(false);
      }
    };

    fetchVaccines();
  }, []);

  const handleShowMore = () => {
    navigate("/vaccines");
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 to-blue-100">
      <h1 className="text-3xl text-blue-700 pt-8 pb-4 ps-72 font-bold">
        Welcome back 🙏
      </h1>

      <div className="flex flex-col justify-center items-center p-4">
        {/* Dashboard Cards */}
        <div className="cards flex flex-col md:flex-row w-[62%] justify-between mb-8">
          <DashboardCard icon={<FaUsers />} title="Total Users" value={7} />
          <DashboardCard icon={<FaDog />} title="Total Animals" value={3} />
          <DashboardCard
            icon={<FaPaw />}
            title="Animals Registered"
            value={3} // Displaying the total count of animals (could be dynamic if needed)
          />
        </div>

        {/* Animal Types Count per Vaccine */}
        {/* <div className="animal-types-count w-full md:w-3/4 lg:w-2/3 py-10">
          <h2 className="text-2xl font-semibold pb-4 text-center text-blue-700">
            Animal Types per Vaccine
          </h2>

          {Object.keys(animalTypesCount).length > 0 ? (
            <div className="animal-type-list">
              <ul className="list-disc pl-8">
                {Object.entries(animalTypesCount).map(([type, count], index) => (
                  <li key={index} className="text-blue-600">
                    {type}: <strong>{count}</strong> vaccines
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <p className="text-center text-blue-600">No animal types associated with vaccines</p>
          )}
        </div> */}

        {/* Vaccines List */}
        <div className="vaccines-list w-full md:w-3/4 lg:w-2/3 py-10">
          <h1 className="text-3xl font-bold pb-6 text-center text-blue-700">
            Vaccines List
          </h1>

          {loading ? (
            <p className="text-center text-blue-600">Loading vaccines...</p>
          ) : error ? (
            <p className="text-center text-red-600">{error}</p>
          ) : (
            <div className="vaccines-list-container w-full max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-xl border border-blue-300">
              <table className="table-auto w-full text-sm">
                <thead>
                  <tr className="bg-blue-100">
                    <th className="py-4 px-6 text-left text-blue-800">
                      Vaccine Name
                    </th>
                    <th className="py-4 px-6 text-left text-blue-800">
                      Animal Type
                    </th>
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
                        {vaccine.animal_type}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          <div className="flex justify-center mt-6">
            <button
              onClick={handleShowMore}
              className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-6 py-3 rounded-lg hover:bg-gradient-to-l transition duration-300 shadow-md transform hover:scale-105"
              aria-label="Show more vaccines"
            >
              Show More
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
