import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaSyringe } from "react-icons/fa";
import AdminSidebar from "../layout/AdminSidebar"; // Import your Sidebar component

const API = "http://localhost:5001/api";

const VaccinesList = () => {
  const [vaccines, setVaccines] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchVaccines = async () => {
      try {
        const response = await axios.get(`${API}/vaccine/getallvaccine`);
        setVaccines(response.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to load vaccines");
        setLoading(false);
      }
    };

    fetchVaccines();
  }, []);

  return (
    <div className="flex min-h-screen bg-gradient-to-r from-blue-50 to-blue-100">
      {/* Sidebar */}
      <AdminSidebar />

      {/* Main Content */}
      <div className="flex-1 p-8 ml-[250px]"> {/* ml-[250px] to leave space for sidebar */}
        <h1 className="text-3xl text-blue-700 pt-8 pb-4 font-bold">
          Vaccine List
        </h1>

        <div className="flex flex-col justify-center items-center p-4">
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
                      <th className="py-4 px-6 text-left text-blue-800">Vaccine Name</th>
                      <th className="py-4 px-6 text-left text-blue-800">Animal Type</th>
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
                              {vaccine.vaccine_name || "Unknown Vaccine"} {/* Fallback for missing data */}
                            </span>
                          </div>
                        </td>
                        <td className="py-3 px-6 text-gray-700">
                          {vaccine.animal_type?.animal_type || "Unknown Type"} {/* Fallback for missing data */}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VaccinesList;
