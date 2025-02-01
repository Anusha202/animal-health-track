// import React, { useEffect, useState } from 'react';
// import { Link } from 'react-router-dom';

// let API = "http://localhost:5000/api";
// const HealthTrack = () => {
//   const [weeklyData, setWeeklyData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   // Fetch data from the backend
//   useEffect(() => {
//     const fetchWeeklyData = async () => {
//       try {
//         const response = await fetch(`${API}/daily/dailyrecords`); // Replace with your backend endpoint
//         if (!response.ok) {
//           throw new Error('Failed to fetch data');
//         }
//         const data = await response.json();
//         setWeeklyData(data);
//         setLoading(false);
//       } catch (err) {
//         setError(err.message);
//         setLoading(false);
//       }
//     };

//     fetchWeeklyData();
//   }, []);

//   return (
//     <div className="min-h-screen bg-gradient-to-r from-blue-50 to-blue-100 flex flex-col justify-center items-center p-4">
//       <h2 className="text-3xl font-bold mb-6 text-blue-900 text-center">Cow's Daily Data Track</h2>

//       {loading ? (
//         <p className="text-blue-700 font-semibold">Loading data...</p>
//       ) : error ? (
//         <p className="text-red-600 font-semibold">Error: {error}</p>
//       ) : (
//         <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-2xl border border-blue-300">
//           <table className="w-full border-collapse text-sm sm:text-base">
//             <thead>
//               <tr>
//                 <th className="border border-gray-300 text-left px-4 py-2 bg-blue-500 text-white">Day</th>
//                 <th className="border border-gray-300 text-left px-4 py-2 bg-blue-500 text-white">Weight</th>
//                 <th className="border border-gray-300 text-left px-4 py-2 bg-blue-500 text-white">Milk Production</th>
//                 <th className="border border-gray-300 text-left px-4 py-2 bg-blue-500 text-white">Temperature</th>
//               </tr>
//             </thead>
//             <tbody>
//               {weeklyData.map((data, index) => (
//                 <tr key={index}>
//                   <td className="border border-gray-300 px-4 py-2 text-gray-700">{index+1}</td>
//                   <td className="border border-gray-300 px-4 py-2 text-blue-800 font-semibold">{data.weight}</td>
//                   <td className="border border-gray-300 px-4 py-2 text-blue-800 font-semibold">{data.production}</td>
//                   <td className="border border-gray-300 px-4 py-2 text-blue-800 font-semibold">{data.temperature}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       )}

//       <Link to="/reporttrack">
//         <button className="bg-blue-600 text-white px-6 py-2 rounded mt-6 hover:bg-blue-700 transition duration-200 shadow-md w-full sm:w-auto">
//           Add Daily Report Tracking
//         </button>
//       </Link>

//       <Link to="/vaccinationreport">
//         <button className="bg-blue-600 text-white px-6 py-2 rounded mt-4 hover:bg-blue-700 transition duration-200 shadow-md w-full sm:w-auto">
//           Check Report
//         </button>
//       </Link>
//     </div>

//   );
// };

// export default HealthTrack;

import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getAllDailyRecord, getDailyRecordById } from "../api/dailyRecord"; // Ensure addDailyRecord is available
import { getUserAnimalById } from "../api/Add";

const HealthTrack = () => {
  const [dailyData, setDailyData] = useState([]);
  const [loading, setLoading] = useState(true);

  const [animal, setAnimal] = useState("");
  const [error, setError] = useState("");
  let { id } = useParams();
  console.log(id);
  useEffect(() => {
    fetchDailyData();
    animalDetail();
  }, []);

  const animalDetail = () => {
    setLoading(true);
    getUserAnimalById(id).then((data) => {
      if (data?.error) {
        console.log(data.error);
        setError(data.error);
      } else {
        setAnimal(data);
      }
      setLoading(false);
    });
  };

  const fetchDailyData = () => {
    setLoading(true);
    getDailyRecordById(id)
      .then((data) => {
        if (data?.error) {
          setError(data.error);
          console.log(data.error)
        } else {
          // setDailyData(data.data.slice(0, 7).reverse());
          setDailyData(data);
        console.log("data", data);
          
        }
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message || "Failed to fetch daily records.");
        setLoading(false);
      });
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 to-blue-100 flex flex-col justify-center items-center p-4">
      <h2 className="text-3xl font-bold mb-6 text-blue-900 text-center">
        {animal.animal_type?.animal_type}'s Daily Data Track
      </h2>

      {loading ? (
        <p className="text-blue-700 text-lg">Loading...</p>
      ) : error ? (
        <p className="text-red-600 text-lg">{error}</p>
      ) : dailyData.length === 0 ? (
        <p className="text-blue-700 text-lg">
          No data available .Please add your animal health record
        </p>
      ) : (
        <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-2xl border border-blue-300 mb-6">
          <table className="w-full border-collapse text-sm sm:text-base">
            <thead>
              <tr>
                <th className="border border-gray-300 text-left px-4 py-2 bg-blue-500 text-white">
                  Day
                </th>
                <th className="border border-gray-300 text-left px-4 py-2 bg-blue-500 text-white">
                  Weight
                </th>
                {(animal?.animal_type?.animal_type === "Cow" ||
                  animal?.animal_type?.animal_type === "Chicken") && (
                  <th className="border border-gray-300 text-left px-4 py-2 bg-blue-500 text-white">
                {animal?.animal_type?.animal_type === "Cow" ? "Milk Production (litres)" : "Egg Production"}

                  </th>
                )}

                <th className="border border-gray-300 text-left px-4 py-2 bg-blue-500 text-white">
                  Temperature
                </th>
              </tr>
            </thead>
            <tbody>
              {dailyData.map((data, index) => (
                <tr key={index}>
                  <td className="border border-gray-300 px-4 py-2 text-gray-700">
                    {index + 1}
                  </td>
                  <td className="border border-gray-300 px-4 py-2 text-blue-800 font-semibold">
                    {data.weight}
                  </td>
                  {(animal?.animal_type?.animal_type === "Cow" ||
                    animal?.animal_type?.animal_type === "Chicken") && (
                    <td className="border border-gray-300 px-4 py-2 text-blue-800 font-semibold">
                      {data.production}
                    </td>
                  )}
                  <td className="border border-gray-300 px-4 py-2 text-blue-800 font-semibold">
                    {data.temperature}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <Link to={`/reports/${id}`}>
        <button className="bg-blue-600 text-white px-6 py-2 rounded mt-4 hover:bg-blue-700 transition duration-200 shadow-md w-full sm:w-auto">
          Check Summary Support
        </button>
      </Link>
      <Link to={`/reporttrack/${id}`}>
        <button className="bg-blue-600 text-white px-6 py-2 rounded mt-6 hover:bg-blue-700 transition duration-200 shadow-md w-full sm:w-auto">
          Add Daily Report Tracking
        </button>
      </Link>

      <Link to={`/vaccinationreport/${id}`}>
        <button className="bg-blue-600 text-white px-6 py-2 rounded mt-4 hover:bg-blue-700 transition duration-200 shadow-md w-full sm:w-auto">
          Check Vaccination Schedule
        </button>
      </Link>
    </div>
  );
};

export default HealthTrack;
