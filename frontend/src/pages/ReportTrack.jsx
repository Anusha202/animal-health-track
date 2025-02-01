// import React, { useState } from 'react';

// import axios from 'axios';

// let API = "http://localhost:5000/api";
// const ReportTrack = () => {

//    const [formData, setFormData] = useState({

//     weight: '',
//     temperature: '',
//     milkProduction: '',
//   });

//   const [error, setError] = useState('');
//   const [success, setSuccess] = useState(false);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     // Validate the form
//     if (!formData.weight || !formData.temperature || !formData.milkProduction) {
//       setError("All fields are required!");
//       return;
//     }

//     setError('');

//     try {
//       // Make POST request with Axios
//       const response = await axios.post(`${API}/daily/dailyrecord`, formData, {
//         // headers: {
//         //   Authorization: `Bearer ${token}`,
//         //   'Content-Type': 'application/json',

//         // },
//         // credentials: "include",
//       });

//       // Handle successful response
//       setSuccess(true);
//       setFormData({ weight: '', temperature: '', milkProduction: '' });  // Reset form data
//     } catch (err) {
//       // Log full error response
//       console.error("API Error:", err);

//       if (err.response) {

//         setError(err.response.data?.error || err.response.data?.message || "An error occurred.");
//       } else if (err.request) {

//         setError("No response received from the server.");
//       } else {

//         setError(`Error: ${err.message}`);
//       }

//       setSuccess(false);
//     }
//   };

//   // const [formData, setFormData] = useState({
//   //   weight: '',
//   //   temperature: '',
//   //   milkProduction: '',
//   // });

//   // const [error, setError] = useState('');
//   // const [success, setSuccess] = useState(false);

//   // const handleChange = (e) => {
//   //   const { name, value } = e.target;
//   //   setFormData({ ...formData, [name]: value });
//   // };

//   // const handleSubmit = async (e) => {
//   //   e.preventDefault();

//   //   if (!formData.weight || !formData.temperature || !formData.milkProduction) {
//   //     setError("All fields are required!");
//   //     return;
//   //   }

//   //   setError('');
//   //   try {
//   //     const response =
//   //     await axios.post(
//   //       `${API}/daily/dailyrecord`,
//   //       formData,
//   //       {
//   //         headers: {
//   //           Authorization: `Bearer ${token}`,
//   //           'Content-Type': 'application/json',
//   //         },
//   //       }
//   //     );

//   //     setSuccess(true); // Show success message if the request is successful
//   //     setFormData({ weight: '', temperature: '', milkProduction: '' }); // Clear form data
//   //   } catch (err) {
//   //     setError(err.response?.data?.error || "An error occurred while submitting the report.");
//   //     setSuccess(false);
//   //   } // Reset loading state after the request is finished

//   // };
//   return (
//     <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-blue-50 to-blue-100">
//       <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md border border-blue-300">
//       {error && <div className="error">{typeof error === 'object' ? JSON.stringify(error) : error}</div>}
//          {success && <div className="success">Report submitted successfully!</div>}

//         <h2 className="text-3xl font-bold text-blue-900 mb-6">Daily Report</h2>

//         <form onSubmit={handleSubmit}>

//           <div className="mb-4">
//             <label htmlFor="weight" className="block text-gray-700 font-medium mb-2">
//               Weight
//             </label>
//             <input
//               type="text"
//               id="weight"
//               name="weight"
//               value={formData.weight}
//               onChange={handleChange}
//               placeholder="Enter weight in kg"
//               className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500"
//               required
//             />
//           </div>

//           <div className="mb-4">
//             <label htmlFor="temperature" className="block text-gray-700 font-medium mb-2">
//               Temperature
//             </label>
//             <input
//               type="text"
//               id="temperature"
//               name="temperature"
//               value={formData.temperature}
//               onChange={handleChange}
//               placeholder="Enter temperature in °C"
//               className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500"
//               required
//             />
//           </div>

//           <div className="mb-4">
//             <label htmlFor="milkProduction" className="block text-gray-700 font-medium mb-2">
//               Milk Production
//             </label>
//             <input
//               type="text"
//               id="milkProduction"
//               name="milkProduction"
//               value={formData.milkProduction}
//               onChange={handleChange}
//               placeholder="Enter amount of milk production in litres"
//               className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500"
//               required
//             />
//           </div>

//           <button
//             type="submit"
//             className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-200 shadow-md"
//           >
//             Add Report
//                   </button>
//         </form>

//       </div>
//     </div>
//   );
// };

// export default ReportTrack;

import React, { useEffect, useState } from "react";
import { addDaily } from "../api/dailyRecord";
import { useNavigate, useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getUserAnimalById } from "../api/Add";

const ReportTrack = () => {
  let { id } = useParams();
  const navigate = useNavigate(); // Initialize navigate
  const [newFrom, setNewFrom] = useState({
    weight: "",
    production: "",
    temperature: "",
  });
  const [animalType, setAnimalType] = useState("");
  const [dailyData, setDailyData] = useState([]);

  useEffect(() => {
    // Fetch the animal details using the provided API function
    getUserAnimalById(id)
      .then((data) => {
        if (data?.error) {
          toast.error(data.error);
        } else {
          setAnimalType(data); // Assuming `data.type` contains the type of the animal
        }
      })
      .catch((err) => {
        console.error("Error fetching animal data:", err);
        toast.error("Failed to fetch animal data.");
      });
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewFrom((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddFrom = (e) => {
    e.preventDefault();

    if (!newFrom.weight || !newFrom.temperature) {
      toast.error("Please fill all required fields.");
      return;
    }

    // Validate production field only for cow and chicken
    if (
      (animalType?.animal_type?.animal_type === "Cow" ||
        animalType?.animal_type?.animal_type === "Chicken") &&
      !newFrom.production
    ) {
      toast.error(
        `Please provide ${animalType?.animal_type?.animal_type === "Cow" ? "milk" : "egg"} production.`
      );
      return;
    }
    addDaily(newFrom, id)
      .then((data) => {
        if (data?.error) {
          toast.error(
            typeof data.error === "object"
              ? JSON.stringify(data.error)
              : data.error
          );
        } else {
          setDailyData((prevData) => [data, ...prevData]);
          setNewFrom({ weight: "", production: "", temperature: "" });
          toast.success("Daily report added successfully!", {
            onClose: () => navigate(`/healthtrack/${id}`), // Navigate to HealthTrack after success
          });
        }
      })
      .catch((err) => {
        console.error("Error while adding daily record:", err);
        toast.error("Failed to add the daily record.");
      });
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-blue-50 to-blue-100">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md border border-blue-300">
        <h2 className="text-3xl font-bold text-blue-900 mb-6">Daily Report</h2>
        <form onSubmit={handleAddFrom}>
          <div className="mb-4">
            <label
              htmlFor="weight"
              className="block text-gray-700 font-medium mb-2"
            >
              Weight
            </label>
            <input
              type="number"
              id="weight"
              name="weight"
              value={newFrom.weight}
              onChange={handleInputChange}
              placeholder="Enter weight in kg"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="temperature"
              className="block text-gray-700 font-medium mb-2"
            >
              Temperature
            </label>
            <input
              type="number"
              id="temperature"
              name="temperature"
              value={newFrom.temperature}
              onChange={handleInputChange}
              placeholder="Enter temperature in °C"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500"
              required
            />
          </div>
          {(animalType?.animal_type?.animal_type === "Cow" || animalType?.animal_type?.animal_type === "Chicken") && (
            <div className="mb-4">
              <label htmlFor="production" className="block text-gray-700 font-medium mb-2">
                {animalType?.animal_type?.animal_type === "Cow" ? "Milk Production (litres)" : "Egg Production"}
              </label>
              <input
                type="number"
                id="production"
                name="production"
                value={newFrom.production}
                onChange={handleInputChange}
                placeholder={`Enter ${animalType?.animal_type?.animal_type === "Cow" ? "milk" : "egg"} production`}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500"
                required
              />
            </div>
          )}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-200 shadow-md"
          >
            Add Report
          </button>
        </form>
      </div>
      {/* Toastify Container */}
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default ReportTrack;

