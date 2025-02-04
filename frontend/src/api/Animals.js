let API = "http://localhost:5000/api";

// Create a new animal
// export const addAnimal = (animal) => {
//   return fetch(`${API}/animal/addanimal`, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(animal),
//     credentials: "include", // Send cookies with the request if needed
//   })
//     .then((response) => response.json())
//     .then((data) => {
//       if (data.errors) {
//         // Handle server-side errors in response
//         return { error: data.errors.message || "An error occurred" };
//       }
//       return data; // Return the successful response data
//     })
//     .catch((error) => {
//       console.error("Error during addAnimal request:", error);
//       // Return a generic error message if network error or any other issue
//       return { error: "An error occurred while communicating with the server." };
//     });
// };







// In your API utility file (e.g., `src/api/Animals.js`)
export const addAnimal = (animal) => {
  return fetch(`${API}/animal/addanimal`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(animal),
    credentials: "include", // Send cookies with the request if needed
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.errors) {
        // Handle server-side errors in response
        return { error: data.errors.message || "An error occurred" };
      }
      return data; // Return the successful response data
    })
    .catch((error) => {
      console.error("Error during addAnimal request:", error);
      // Return a generic error message if network error or any other issue
      return { error: "An error occurred while communicating with the server." };
    });
};


// Get all animals
export const getAllAnimals = () => {
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

// Get an animal by ID
export const getAnimalById = (id) => {
  return fetch(`${API}/animal/getanimals/${id}`)
    .then((res) => {
      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }
      return res.json();
    })
    .catch((error) => {
      console.error("Error during getAnimalById request:", error);
      return { error: "An error occurred while retrieving the animal." };
    });
};

// Update an animal by ID
// export const updateAnimal = (id, updatedData) => {
//   return fetch(`${API}/animal/update/${id}`, {
//     method: "PUT",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(updatedData),
//     credentials: "include", // Send cookies with the request if needed
//   })
//     .then((response) => response.json())
//     .then((data) => {
//       if (data.errors) {
//         // Handle server-side errors in response
//         return { error: data.errors.message || "An error occurred" };
//       }
//       return data; // Return the successful response data
//     })
//     .catch((error) => {
//       console.error("Error during updateAnimal request:", error);
//       // Return a generic error message if network error or any other issue
//       return { error: "An error occurred while communicating with the server." };
//     });
// };



// export const updateAnimal = async (id, updatedData) => {
//   try {
//     const response = await fetch(`http://localhost:5001/api/animal/update/${id}`, {
//       method: "PUT",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(updatedData),
//       credentials: "include", // If needed for cookie-based authentication
//     });

//     if (!response.ok) {
//       const errorData = await response.json();
//       throw new Error(errorData.error || "Failed to update animal.");
//     }

//     return await response.json();
//   } catch (err) {
//     console.error("Error during updateAnimal request:", err);
//     return { error: err.message || "Failed to update animal." };
//   }
// };






export const updateAnimal = async (id, updatedData) => {
  try {
    const response = await fetch(`http://localhost:5001/api/animal/update/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedData), // Send the updated animal data
      credentials: "include", // If needed for cookie-based authentication
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Failed to update animal.");
    }

    return await response.json();
  } catch (err) {
    console.error("Error during updateAnimal request:", err);
    return { error: err.message || "Failed to update animal." };
  }
};


// Delete an animal by ID
export const deleteAnimal = (id) => {
  return fetch(`${API}/animal/delete/${id}`, {
    method: "DELETE",
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .catch((error) => {
      console.error("Error during deleteAnimal request:", error);
      return { error: "An error occurred while deleting the animal." };
    });
};