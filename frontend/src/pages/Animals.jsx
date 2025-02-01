import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAllUserAnimals } from "../api/Add";

const Animals = () => {
  const [animals, setAnimals] = useState([]);
  const [error, setError] = useState(null); // Added state
  // const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAllUserAnimals().then((res) => {
      console.log("out",res)
      
    if (Array.isArray(res) && res.length > 0) {
      setAnimals(res); // Set animals with the API data
      console.log("Updated Animals:", res); // Log the updated data here
      setError(null); // Clear error
    } else {
      setError(res.message);
    }
  });
  }, []);
  // const fetchAnimals = async () => {
  //   const result = await getAllUserAnimals();

  //   console.log("result",result)
  //   if (!result.success) {
  //     // Set the error message from the API response
  //     setError(result.message);
  //   } else {
  //     // Set animals if the API call is successful
  //     setAnimals(result);
  //     setError(null);
  //   }
  // };

  // console.log(animals)

  // if (error) {
  //   return (
  //     <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
  //       <p className="text-red-500 font-semibold">{error}</p>
  //     </div>
  //   );
  // }

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100 p-4">
      <Link to="/animal-detail">
        <button className="bg-blue-400 text-white px-4 py-2 rounded flex items-center mb-4 hover:bg-blue-500 transition duration-200">
          <i className="fas fa-plus mr-2"></i>
          Add new animal
        </button>
      </Link>
      {error ? (
        <p className="text-red-600 text-lg">{error}</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-5xl">
          {animals.map((animal, index) => (
            <div
              key={animal._id || index}
              className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center border border-gray-200 hover:shadow-xl transition duration-300 hover:bg-blue-300"
            >
              <div className="w-24 h-24 flex justify-center items-center bg-blue-100 rounded-full mb-4">
                <i
                  className={`fas ${
                    animal.animal_type?.animal_type === "Dog"
                      ? "fa-dog"
                      : animal.animal_type?.animal_type === "Cow"
                      ? "fa-cow"
                      : "fa-kiwi-bird"
                  } text-4xl text-blue-500`}
                ></i>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-800">
                {animal.animal_type?.animal_type || "Unknown"}
              </h3>
              <p className="text-gray-700 mb-1 font-medium">
                Breed:{" "}
                <span className="font-normal">
                  {animal.breed?.breed_name || "Unknown"}
                </span>
              </p>
              <p className="text-gray-700 mb-1 font-medium">
                Age:{" "}
                <span className="font-normal">
                  {animal?.age || "Unknown"} years
                </span>
              </p>
              <p className="text-gray-700 font-medium">
                Gender:{" "}
                <span className="font-normal">
                  {animal?.gender || "Unknown"}
                </span>
              </p>
              <Link
                to={`/healthtrack/${animal?._id}`}
                className="mt-4 text-blue-500 hover:underline"
              >
                Data Track
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Animals;
