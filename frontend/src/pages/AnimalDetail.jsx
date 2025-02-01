import axios from "axios";
import React, { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import Toastify styles
import { useUserStore } from "../store/userStore";
import { useNavigate } from "react-router-dom";

let API = "http://localhost:5000/api";

const AnimalDetailForm = () => {
  const [filteredBreeds, setFilteredBreeds] = useState([]);
  const [formData, setFormData] = useState({
    animal_type: "",
    breed: "",
    gender: "",
    age: "",
  });
  const [animalTypes, setAnimalTypes] = useState([]);
  const [breeds, setBreeds] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // const { isAuthenticated } = useUserStore();
  // const navigate = useNavigate();
  // if (!isAuthenticated) {
  //   navigate("/login");
  //   return <p>Please log in to add an animal.</p>;
  // }

  useEffect(() => {
    const fetchAnimalTypes = async () => {
      try {
        const response = await axios.get(`${API}/animal/getallanimal`);
        if (Array.isArray(response.data.data)) {
          setAnimalTypes(response.data.data);
        } else {
          console.error(
            "Expected an array of animal types, but received:",
            response.data
          );
        }
      } catch (error) {
        console.error("Error fetching animal types:", error);
      }
    };
    fetchAnimalTypes();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "age" && (value < 1 || isNaN(value))) {
      return;
    }
    setFormData({ ...formData, [name]: value });
  };

  const handleRadioChange = (e) => {
    const selectedAnimalTypeId = e.target.value;
    setFormData({ ...formData, animal_type: selectedAnimalTypeId });
    // Filter the breeds based on the selected animal type
    const selectedAnimal = animalTypes.find(
      (animal) => animal._id === selectedAnimalTypeId
    );
    if (selectedAnimal && Array.isArray(selectedAnimal.breeds)) {
      setFilteredBreeds(selectedAnimal.breeds); // Assuming breeds are part of the animal type
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch(`${API}/useranimal/newuseranimal`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
        credentials: "include",
      });

      if (!response.ok) {
        const errorDetails = await response.text();
        throw new Error(`Error: ${response.status}, Details: ${errorDetails}`);
      }

      const result = await response.json();
      toast.success("Animal details added successfully!");
    } catch (error) {
      console.error("Error submitting animal details:", error);
      toast.error(`Error: ${error.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-blue-50 to-blue-100">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md border border-blue-300">
        <h2 className="text-3xl font-bold text-blue-900 mb-6">
          Add Animal Details
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">
              Animal Type
            </label>
            <div className="flex gap-4">
              {animalTypes?.map((animal) => (
                <label key={animal._id} className="inline-flex items-center">
                  <input
                    type="radio"
                    name="animal_type"
                    value={animal._id}
                    checked={formData.animal_type === animal._id}
                    onChange={handleRadioChange}
                    className="mr-2"
                  />
                  {animal.animal_type}
                </label>
              ))}
            </div>
          </div>

          <div className="mb-4">
            <label
              htmlFor="breed"
              className="block text-gray-700 font-medium mb-2"
            >
              Breed
            </label>
            <select
              id="breed"
              name="breed"
              value={formData.breed}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500"
              required
            >
              <option value="" disabled>
                Select breed
              </option>
              {filteredBreeds?.map((breed) => (
                <option key={breed._id} value={breed._id}>
                  {breed.breed_name}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-4">
            <label
              htmlFor="gender"
              className="block text-gray-700 font-medium mb-2"
            >
              Gender
            </label>
            <select
              id="gender"
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500"
              required
            >
              <option value="" disabled>
                Select gender
              </option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>

          <div className="mb-4">
            <label
              htmlFor="age"
              className="block text-gray-700 font-medium mb-2"
            >
              Age
            </label>
            <input
              type="number"
              id="age"
              name="age"
              value={formData.age}
              onChange={handleChange}
              placeholder="Enter age in years"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500"
              required
              min="1"
            />
          </div>

          <button
            type="submit"
            className={`w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-200 shadow-md ${
              isSubmitting ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Submitting..." : "Add Animal"}
          </button>
        </form>
      </div>
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default AnimalDetailForm;

// import axios from 'axios';
// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';

// let API = "http://localhost:5000/api";

// const AnimalDetailForm = () => {
//   const { token } = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NzQ4YjI1ODAyNWZmMzg2Y2M1ODU1ZGUiLCJpYXQiOjE3MzI5MjE3OTMsImV4cCI6MTczMzUyNjU5M30.aIlywn3d0AW-IZcV3wbxs3xkPGPaNgSKdbjh_lRg1f4";

//   const [filteredBreeds, setFilteredBreeds] = useState([]);
//   // Form data state
//   const [formData, setFormData] = useState({
//     animal_type: '',  // This will store the selected ObjectId
//     breed: '',
//     gender: '',
//     age: '',
//   });

//   // State to store the fetched animal types
//   const [animalTypes, setAnimalTypes] = useState([]);
//   const navigate = useNavigate(); // Hook for navigation

//   const handleChange = (e) => {
//     const { name, value } = e.target;

//   const [breeds, setBreeds] = useState([]);

//   // State to manage form submission status
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   // Fetch animal types on component mount
//   useEffect(() => {
//     const fetchAnimalTypes = async () => {
//       try {
//         const response = await axios.get(`${API}/animal/getallanimal`);
//         if (Array.isArray(response.data.data)) {
//           setAnimalTypes(response.data.data);
//         } else {
//           console.error("Expected an array of animal types, but received:", response.data);
//         }
//       } catch (error) {
//         console.error("Error fetching animal types:", error);
//       }
//     };

//     fetchAnimalTypes();
//   }, []);

//   // Fetch breeds when the animal type changes
//   const loadBreed = async (e) => {
//     try {
//       const response = await axios.get(`${API}/breed/getbreed`);
//       if (Array.isArray(response.data.data)) {
//         setBreeds(response.data.data);
//         const filtered = response.data.data.filter(breed => breed.animal_type._id === e);
//       setFilteredBreeds(filtered);
//       console.log(filtered);
//       } else {
//         console.error("Expected an array of breeds, but received:", response.data);
//       }
//     } catch (error) {
//       console.error("Error fetching breeds:", error);
//     }
//   };

//   // Handle changes in form fields
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     if (name === 'age' && (value < 1 || isNaN(value))) {
//       return;
//     }
//     setFormData({ ...formData, [name]: value });
//   };

//   // Handle animal type radio button change
//   const handleRadioChange = (e) => {
//     const selectedAnimalTypeId = e.target.value;
//     setFormData({ ...formData, animal_type: selectedAnimalTypeId });
//     loadBreed(selectedAnimalTypeId);  // Load breeds based on the selected animal type
//   };

//   // Handle form submission
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setIsSubmitting(true);

//     try {
//       const response = await fetch(`${API}/useranimal/newuseranimal`, {
//         method: 'POST',
//         headers: {
//           Authorization: `Bearer ${token}`,
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(formData),
//         credentials: "include",
//       });

//       if (!response.ok) {
//         const errorDetails = await response.text();
//         throw new Error(`Error: ${response.status}, Details: ${errorDetails}`);
//       }

//       const result = await response.json();
//       alert('Animal details added successfully!');
//     } catch (error) {
//       console.error('Error submitting animal details:', error);
//       alert(`Error: ${error.message}`);
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   return (
//     <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-blue-50 to-blue-100">
//       <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md border border-blue-300">
//         <h2 className="text-3xl font-bold text-blue-900 mb-6">Add Animal Details</h2>
//         <form onSubmit={handleSubmit}>
//           <div className="mb-4">
//             <label className="block text-gray-700 font-medium mb-2">Animal Type</label>
//             <div className="flex gap-4">
//               {animalTypes?.map((animal) => (
//                 <label key={animal._id} className="inline-flex items-center">
//                   <input
//                     type="radio"
//                     name="animal_type"
//                     value={animal._id}  // Set the value to the ObjectId
//                     checked={formData.animal_type === animal._id}
//                     onChange={handleRadioChange}
//                     className="mr-2"
//                   />
//                   {animal.animal_type} {/* Display the name of the animal */}
//                 </label>
//               ))}
//             </div>
//           </div>

//           <div className="mb-4">
//             <label htmlFor="breed" className="block text-gray-700 font-medium mb-2">Breed</label>
//             <select
//               id="breed"
//               name="breed"
//               value={formData.breed}
//               onChange={handleChange}
//               className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500"
//               required
//             >
//               <option value="" disabled>Select breed</option>
//               {filteredBreeds?.map((breed) => (
//                 <option key={breed._id} value={breed._id}>{breed.breed_name}</option>
//               ))}
//             </select>
//           </div>

//           <div className="mb-4">
//             <label htmlFor="gender" className="block text-gray-700 font-medium mb-2">Gender</label>
//             <select
//               id="gender"
//               name="gender"
//               value={formData.gender}
//               onChange={handleChange}
//               className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500"
//               required
//             >
//               <option value="" disabled>Select gender</option>
//               <option value="Male">Male</option>
//               <option value="Female">Female</option>
//             </select>
//           </div>

//           <div className="mb-4">
//             <label htmlFor="age" className="block text-gray-700 font-medium mb-2">Age</label>
//             <input
//               type="number"
//               id="age"
//               name="age"
//               value={formData.age}
//               onChange={handleChange}
//               placeholder="Enter age in years"
//               className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500"
//               required
//               min="1"
//             />
//           </div>

//           <button
//             type="submit"
//             className={`w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-200 shadow-md ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
//             disabled={isSubmitting}
//           >
//             {isSubmitting ? 'Submitting...' : 'Add Animal'}
//           </button>
//         </form>

//         {/* Add a sample card for demonstration */}
//         <Link to="/animal-detail" state={{ animal: formData }}>
//           <div className="mt-4 p-4 border border-blue-300 rounded cursor-pointer hover:bg-blue-50 transition">
//             <h3 className="text-xl font-bold">Sample Animal Card</h3>
//             <p>Type: {formData.type}</p>
//             <p>Breed: {formData.breed}</p>
//             <p>Gender: {formData.gender}</p>
//             <p>Age: {formData.age} years</p>
//           </div>
//         </Link>
//       </div>
//     </div>
//   );
// };
// }
// export default AnimalDetailForm
