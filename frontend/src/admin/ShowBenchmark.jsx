import React, { useEffect, useState } from "react";
import { getAllBenchmarks } from "../api/Benchmark"; // Adjust the path as needed

const ShowBenchmark = () => {
  const [benchmarks, setBenchmarks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBenchmarks = async () => {
      try {
        const data = await getAllBenchmarks();
        if (data.success === false) {
          setError(data.message);
        } else {
          setBenchmarks(data);
        }
      } catch (err) {
        setError("Failed to fetch data");
      } finally {
        setLoading(false);
      }
    };
    fetchBenchmarks();
  }, []);

  if (loading) return <p className="text-center text-xl">Loading benchmarks...</p>;
  if (error) return <p className="text-center text-red-500">{`Error: ${error}`}</p>;

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">Benchmark Data</h2>
      <table className="min-w-full table-auto border-collapse border border-gray-300 shadow-lg">
        <thead className="bg-blue-500 text-white">
          <tr>
            <th className="border border-gray-300 px-6 py-3 text-left">Animal Type</th>
            <th className="border border-gray-300 px-6 py-3 text-left">Breed</th>
            <th className="border border-gray-300 px-6 py-3 text-left">Weight (kg)</th>
            <th className="border border-gray-300 px-6 py-3 text-left">Lifespan (years)</th>
            <th className="border border-gray-300 px-6 py-3 text-left">Average Temperature (°C)</th>
            <th className="border border-gray-300 px-6 py-3 text-left">Age Data</th>
          </tr>
        </thead>
        <tbody className="bg-gray-50">
          {benchmarks.map((benchmark, index) => (
            <tr
              key={index}
              className="hover:bg-gray-100 transition-colors duration-200"
            >
              <td className="border border-gray-300 px-6 py-4">{benchmark.animalType}</td>
              <td className="border border-gray-300 px-6 py-4">{benchmark.breed}</td>
              <td className="border border-gray-300 px-6 py-4">
                {benchmark.weight?.min ?? "N/A"} - {benchmark.weight?.max ?? "N/A"}
              </td>
              <td className="border border-gray-300 px-6 py-4">
                {benchmark.lifespan?.min ?? "N/A"} - {benchmark.lifespan?.max ?? "N/A"}
              </td>
              <td className="border border-gray-300 px-6 py-4">{benchmark.average_temperature ?? "N/A"}</td>
              <td className="border border-gray-300 px-6 py-4">
                {benchmark.age_data.length > 0 ? (
                  <div className="space-y-2">
                    {benchmark.age_data.map((age, i) => (
                      <AgeData key={i} age={age} isExpanded={i === 0} /> 
                    ))}
                  </div>
                ) : (
                  <span className="text-gray-500 italic">No age data available</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const AgeData = ({ age, isExpanded }) => {
  const [expanded, setExpanded] = useState(isExpanded); // Default expanded for the first item

  const toggleExpand = () => {
    setExpanded(prev => !prev);
  };

  return (
    <div>
      <button
        onClick={toggleExpand}
        className="text-blue-500 hover:underline text-sm mb-2"
      >
        {expanded ? "Show less" : "Show more"}
      </button>

      {expanded && (
        <div className="bg-gradient-to-r from-blue-50 via-blue-100 to-blue-200 p-4 rounded-md border border-gray-300 mt-2">
          <div className="flex justify-between items-center mb-2">
            <span className="font-medium text-gray-800">Age Range:</span>
            <span className="text-gray-700">{age.age_range?.min ?? "N/A"} - {age.age_range?.max ?? "N/A"} years</span>
          </div>
          <div className="flex justify-between items-center mb-2">
            <span className="font-medium text-gray-800">Weight Range:</span>
            <span className="text-gray-700">{age.weight_range?.min ?? "N/A"} - {age.weight_range?.max ?? "N/A"} kg</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="font-medium text-gray-800">Milk Per Day:</span>
            <span className="text-gray-700">{age.milk_per_day?.min ?? "N/A"} - {age.milk_per_day?.max ?? "N/A"} liters</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShowBenchmark;
