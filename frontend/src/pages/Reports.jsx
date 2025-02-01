// import React from 'react';

// // Card component for individual data points
// const DataCard = ({ title, value, isAbnormal }) => {
//   return (
//     <div className="bg-white shadow-md rounded-lg p-6 mb-4 w-full sm:w-1/3 md:w-1/4 lg:w-1/4">
//       <h3 className="text-lg font-semibold mb-3">{title}</h3>
//       <div
//         className={`text-xl font-medium ${
//           isAbnormal ? 'text-red-500' : 'text-green-500'
//         }`}
//       >
//         {value}
//       </div>
//     </div>
//   );
// };

// const Reports = () => {
//   // Example data
//   const reportData = [
//     { id: 1, temperature: 99, weight: 99, milkProduction: 4 },
//   ];

//   // Thresholds for abnormalities
//   const thresholds = {
//     temperature: { min: 98.5, max: 103 },
//     weight: { min: 80, max: 150 },
//     milkProduction: { min: 5, max: 10 },
//   };

//   // Function to determine if a value is abnormal
//   const isAbnormal = (value, { min, max }) => value < min || value > max;

//   return (
//     <div className="w-5/6 mx-auto">
//       <h1 className="text-2xl font-bold text-center">Summary Report</h1>
//       <div className="pb-7 ps-5">
//         <h1 className="py-3">
//           Animal Type: <span>Cow</span>
//         </h1>
//         <h1>
//           Breed: <span>Lulu</span>
//         </h1>
//       </div>

//       {/* Loop through each report and display its data */}
//       {reportData.map((report) => {
//         // Check if the report has abnormalities
//         const hasAbnormality =
//           isAbnormal(report.temperature, thresholds.temperature) ||
//           isAbnormal(report.weight, thresholds.weight) ||
//           isAbnormal(report.milkProduction, thresholds.milkProduction);

//         return (
//           <div key={report.id} className="mb-10">
//             <h2 className="text-xl font-bold mb-5">Report ID: {report.id}</h2>
//             <div className="flex flex-wrap gap-4 justify-center">
//               {/* Card Components for Temperature, Weight, and Milk Production */}
//               <DataCard
//                 title="Temperature"
//                 value={report.temperature}
//                 isAbnormal={isAbnormal(report.temperature, thresholds.temperature)}
//               />
//               <DataCard
//                 title="Weight"
//                 value={report.weight}
//                 isAbnormal={isAbnormal(report.weight, thresholds.weight)}
//               />
//               <DataCard
//                 title="Milk Production"
//                 value={report.milkProduction}
//                 isAbnormal={isAbnormal(report.milkProduction, thresholds.milkProduction)}
//               />
//             </div>
//             {/* Conclusion */}
//             <div className="mt-5">
//               <h3 className="text-lg font-semibold">Conclusion:</h3>
//               <p
//                 className={`text-lg font-medium ${
//                   hasAbnormality ? 'text-red-500' : 'text-green-500'
//                 }`}
//               >
//                 {hasAbnormality
//                   ? 'Abnormality found in milk production. Consult a vet immediately.'
//                   : 'Your animal is healthy. Continue to monitor their health and ensure timely vaccinations.'}
//               </p>
//             </div>
//           </div>
//         );
//       })}
//     </div>
//   );
// };

// export default Reports;

// import React, { useState, useEffect } from 'react';
// import { useParams } from 'react-router-dom';
// import { getUserAnimalById } from '../api/Add'; // Assuming this is for fetching animal details
// let API = "http://localhost:5000/api";
// const DataCard = ({ title, value, isAbnormal }) => (
//   <div className="bg-white shadow-md rounded-lg p-6 mb-4 w-full sm:w-1/3 md:w-1/4 lg:w-1/4">
//     <h3 className="text-lg font-semibold mb-3">{title}</h3>
//     <div
//       className={`text-xl font-medium ${isAbnormal ? 'text-red-500' : 'text-green-500'}`}
//     >
//       {value}
//     </div>
//   </div>
// );

// const Reports = () => {
//   let { id } = useParams();
//   const [reportData, setReportData] = useState(null);
//   const [animalDetails, setAnimalDetails] = useState({});
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   const thresholds = {
//     temperature: { min: 98.5, max: 103 },
//     weight: { min: 80, max: 150 },
//     milkProduction: { min: 5, max: 10 },
//   };

//   const isAbnormal = (value, { min, max }) => value < min || value > max;

//   useEffect(() => {
//     fetchReportData(); // Fetch report data
//     animalDetail(); // Fetch animal details
//   }, [id]);

//   const animalDetail = () => {
//     setLoading(true);
//     getUserAnimalById(id)
//       .then((data) => {
//         if (data?.error) {
//           console.log(data.error);
//           setError(data.error);
//         } else {
//           setAnimalDetails(data);
//           console.log("Animal Data:", data);
//         }
//         setLoading(false);
//       })
//       .catch((err) => {
//         setError("Failed to fetch animal details.");
//         setLoading(false);
//       });
//   };

//   const fetchReportData = () => {
//     setLoading(true);
//     fetch(`${API}/report/getWeeklyReport/${id}`, {
//       method: 'GET',
//       headers: {
//         'Content-Type': 'application/json',
//         // Add Authorization header if needed
//         // 'Authorization': `Bearer ${yourToken}`,
//       },
//     })
//       .then((response) => response.json())
//       .then((data) => {
//         if (data?.error) {
//           setError(data.error);
//         } else {
//           setReportData(data.report); // Assuming the response has the structure { report: { ... } }
//         }
//         setLoading(false);
//       })
//       .catch((err) => {
//         setError("Failed to fetch weekly report.");
//         setLoading(false);
//       });
//   };

//   if (loading) {
//     return <p className="text-center text-gray-500">Loading...</p>;
//   }

//   if (error) {
//     return <p className="text-center text-red-500">{error}</p>;
//   }

//   return (
//     <div className="w-5/6 mx-auto">
//       <h1 className="text-2xl font-bold text-center">Summary Report</h1>
//       <div className="pb-7 ps-5">
//       <h1 className="py-3">
//     Animal Type: <span>{animalDetails.animal_type?.name || 'N/A'}</span>
//   </h1>
//   <h1>
//     Breed: <span>{Array.isArray(animalDetails.breeds) ? animalDetails.breeds.join(', ') : 'N/A'}</span>
//   </h1>
//       </div>

//       <div className="mb-10">
//         <h2 className="text-xl font-bold mb-5">Weekly Health Report</h2>
//         <div className="flex flex-wrap gap-4 justify-center">
//           <DataCard
//             title="Temperature"
//             value={reportData?.avgTemperature || 'N/A'}
//             isAbnormal={isAbnormal(reportData?.avgTemperature, thresholds.temperature)}
//           />
//           <DataCard
//             title="Weight"
//             value={reportData?.avgWeight || 'N/A'}
//             isAbnormal={isAbnormal(reportData?.avgWeight, thresholds.weight)}
//           />
//           <DataCard
//             title="Milk Production"
//             value={reportData?.avgProduction || 'N/A'}
//             isAbnormal={isAbnormal(reportData?.avgProduction, thresholds.milkProduction)}
//           />
//         </div>
//         <div className="mt-5">
//           <h3 className="text-lg font-semibold">Conclusion:</h3>
//           <p
//             className={`text-lg font-medium ${
//               isAbnormal(reportData?.avgTemperature, thresholds.temperature) ||
//               isAbnormal(reportData?.avgWeight, thresholds.weight) ||
//               isAbnormal(reportData?.avgProduction, thresholds.milkProduction)
//                 ? 'text-red-500'
//                 : 'text-green-500'
//             }`}
//           >
//             {isAbnormal(reportData?.avgTemperature, thresholds.temperature) ||
//             isAbnormal(reportData?.avgWeight, thresholds.weight) ||
//             isAbnormal(reportData?.avgProduction, thresholds.milkProduction)
//               ? 'Abnormality found. Consult a vet immediately.'
//               : 'Your animal is healthy. Continue to monitor their health.'}
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Reports;

import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getUserAnimalById } from "../api/Add";
import { generateWeeklyReport } from "../api/healthreport";

const DataCard = ({ title, value }) => (
  <div className="bg-blue-200 shadow-md rounded-lg px-6 mb-4 w-full sm:w-1/3 md:w-1/4 lg:w-1/4 py-8">
    <h3 className="text-lg font-semibold mb-3 text-center tracking-wider">
      {title}
    </h3>
    <div className={`text-xl font-semibold text-center`}>{value}</div>
  </div>
);

const Reports = () => {
  const { id } = useParams();
  const [reportData, setReportData] = useState(null);
  const [animalDetails, setAnimalDetails] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // const thresholds = {
  //   temperature: { min: 37, max: 40 },
  //   weight: { min: 80, max: 150 },
  //   milkProduction: { min: 5, max: 10 },
  // };

  // const isAbnormal = (value, { min, max }) => value < min || value > max;

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const animalData = await getUserAnimalById(id);
        setAnimalDetails(animalData);

        const reportData = await generateWeeklyReport(id);
        setReportData(reportData.report);
      } catch (err) {
        setError("Failed to fetch data. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (loading) {
    return <p className="text-center text-gray-500">Loading...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500">{error}</p>;
  }

  // const { animal_type: animalType, breeds } = animalDetails;

  // console.log("reportData", reportData);
  return (
    <div className="w-5/6 mx-auto py-5">
      <h1 className="text-3xl font-bold text-center">Summary Report</h1>
      <div className="pb-7 ps-5">
        {/* Animal Details */}
        <h1 className="py-3 text-xl font-medium">
          Animal Type:{" "}
          <span className=" text-lg font-normal">
            {animalDetails.animal_type.animal_type || "Unknown Animal Type"}
          </span>
        </h1>
        <h1 className=" text-xl font-medium">
          Breed:{" "}
          <span className=" text-lg font-normal">
            {animalDetails.breed.breed_name}
          </span>
        </h1>
      </div>

      {/* {reportData ? ( */}
      {/* Weekly Health Report */}
      {reportData ? (
        <div className="mb-10">
          <h2 className="text-xl font-bold mb-5">Weekly Health Report</h2>
          <div className="flex flex-wrap gap-4 justify-center">
            <DataCard
              title="Temperature"
              value={reportData?.avgTemperature || "N/A"}
              // isAbnormal={isAbnormal(reportData?.avgTemperature, thresholds.temperature)}
            />
            <DataCard
              title="Weight"
              value={reportData?.avgWeight || "N/A"}
              // isAbnormal={isAbnormal(reportData?.avgWeight, thresholds.weight)}
            />
            {(animalDetails?.animal_type?.animal_type === "Cow" ||
              animalDetails?.animal_type?.animal_type === "Chicken") && (
              <DataCard
                title={`${
                  animalDetails?.animal_type?.animal_type === "Cow"
                    ? "Milk Production (litres)"
                    : "Egg Production"
                }`}
                value={reportData?.avgProduction || "N/A"}
                // isAbnormal={isAbnormal(reportData?.avgProduction, thresholds.milkProduction)}
              />
            )}
          </div>
          <div className="mt-5">
            <h3 className="text-xl font-semibold">Conclusion:</h3>
            {/* <p
     className={`text-lg font-medium`}
   >
     {isAbnormal(reportData?.avgTemperature, thresholds.temperature) ||
     isAbnormal(reportData?.avgWeight, thresholds.weight) ||
     isAbnormal(reportData?.avgProduction, thresholds.milkProduction)
       ? 'Abnormality found. Consult a vet immediately.'
       : 'Your animal is healthy. Continue to monitor their health.'}
   </p> */}
            {reportData?.healthStatus === "Healthy" ? (
              <p className="text-lg font-medium text-green-400">
                Your animal is healthy. Continue to monitor their health.
              </p>
            ) : (
              <p className="text-lg font-medium text-red-400">
                Abnormal Health Report. Consult a vet immediately.
              </p>
            )}
          </div>
        </div>
      ) : (
        <div className="text-center text-red-500 text-lg font-semibold mt-10">
          No records found for this animal this week.
        </div>
      )}
    </div>
  );
};

export default Reports;
