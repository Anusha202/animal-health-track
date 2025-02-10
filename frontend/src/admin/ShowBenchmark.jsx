import React, { useEffect, useState } from "react";
import { getAllBenchmarks, deleteBenchmark } from "../api/Benchmark"; // Adjust the path as needed
import { useNavigate } from "react-router-dom"; // Import useNavigate for routing

const ShowBenchmark = () => {
  const [benchmarks, setBenchmarks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // Hook to navigate between routes

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

  if (loading) return <p className="text-center text-xl">Loading...</p>;
  if (error) return <p className="text-center text-red-500">{`Error: ${error}`}</p>;

  // Handle Edit button click
  const handleEditClick = (benchmarkId) => {
    navigate(`/update-category/${benchmarkId}`); // Navigate to the update page for the selected benchmark
  };

  // Handle Delete button click
  const handleDeleteClick = async (id) => {
    // Optimistically remove the benchmark from the list
    setBenchmarks(benchmarks.filter((benchmark) => benchmark._id !== id));

    try {
      const response = await deleteBenchmark(id);
      if (!response.success) {
        // If the delete fails, re-add the benchmark to the list and show error message
        setBenchmarks((prevBenchmarks) => [
          ...prevBenchmarks,
          benchmarks.find((benchmark) => benchmark._id === id),
        ]);
        setError(response.message || "Failed to delete benchmark");
      }
    } catch (err) {
      // If there's an error, restore the benchmark to the list
      setBenchmarks((prevBenchmarks) => [
        ...prevBenchmarks,
        benchmarks.find((benchmark) => benchmark._id === id),
      ]);
      setError("Failed to delete benchmark");
    }
  };

  return (
    <div className="p-4 max-w-7xl mx-auto space-y-4">
      <h2 className="text-xl font-semibold text-center text-gray-800">Benchmark Data</h2>

      <table className="min-w-full table-auto border-collapse border border-gray-300 shadow-sm">
        <thead className="bg-blue-500 text-white text-xs">
          <tr>
            <th className="border border-gray-300 px-3 py-2 text-left">Select</th>
            <th className="border border-gray-300 px-3 py-2 text-left">Animal</th>
            <th className="border border-gray-300 px-3 py-2 text-left">Breed</th>
            <th className="border border-gray-300 px-3 py-2 text-left">Weight (kg)</th>
            <th className="border border-gray-300 px-3 py-2 text-left">Lifespan (years)</th>
            <th className="border border-gray-300 px-3 py-2 text-left">Avg Temp (°C)</th>
            <th className="border border-gray-300 px-3 py-2 text-left">Age Data</th>
            <th className="border border-gray-300 px-3 py-2 text-left">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-gray-50 text-xs">
          {benchmarks.map((benchmark, index) => (
            <tr key={index} className="hover:bg-gray-100 transition-all duration-200 cursor-pointer">
              <td className="border border-gray-300 px-3 py-2">
                <input type="radio" name="selectedBenchmark" />
              </td>
              <td className="border border-gray-300 px-3 py-2">{benchmark.animalType}</td>
              <td className="border border-gray-300 px-3 py-2">{benchmark.breed}</td>
              <td className="border border-gray-300 px-3 py-2">{benchmark.weight?.min ?? "N/A"} - {benchmark.weight?.max ?? "N/A"}</td>
              <td className="border border-gray-300 px-3 py-2">{benchmark.lifespan?.min ?? "N/A"} - {benchmark.lifespan?.max ?? "N/A"}</td>
              <td className="border border-gray-300 px-3 py-2">{benchmark.average_temperature ?? "N/A"}</td>
              <td className="border border-gray-300 px-3 py-2">
                {benchmark.age_data.length > 0 ? (
                  <div className="space-y-1">
                    {benchmark.age_data.map((age, i) => (
                      <AgeData key={i} age={age} isExpanded={i === 0} />
                    ))}
                  </div>
                ) : (
                  <span className="text-gray-500 italic">No data</span>
                )}
              </td>
              <td className="border border-gray-300 px-3 py-2 text-center">
                <button
                  onClick={() => handleEditClick(benchmark._id)}
                  className="bg-yellow-500 text-white px-3 py-1 rounded-md hover:bg-yellow-600 text-xs mr-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteClick(benchmark._id)}
                  className="bg-red-600 text-white px-3 py-1 rounded-md hover:bg-red-700 text-xs"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const AgeData = ({ age, isExpanded }) => {
  const [expanded, setExpanded] = useState(isExpanded);

  const toggleExpand = () => {
    setExpanded(prev => !prev);
  };

  return (
    <div className="text-xs">
      <button onClick={toggleExpand} className="text-blue-500 hover:underline">
        {expanded ? "Show less" : "Show more"}
      </button>

      {expanded && (
        <div className="bg-blue-50 p-3 rounded-md border border-gray-300 mt-2 text-xs">
          <div className="flex justify-between mb-2">
            <span className="font-medium">Age Range:</span>
            <span>{age.age_range?.min ?? "N/A"} - {age.age_range?.max ?? "N/A"} years</span>
          </div>
          <div className="flex justify-between mb-2">
            <span className="font-medium">Weight Range:</span>
            <span>{age.weight_range?.min ?? "N/A"} - {age.weight_range?.max ?? "N/A"} kg</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium">Milk per Day:</span>
            <span>{age.milk_per_day?.min ?? "N/A"} - {age.milk_per_day?.max ?? "N/A"} liters</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShowBenchmark;
