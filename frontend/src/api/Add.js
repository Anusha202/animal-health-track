let API = "http://localhost:5001/api";


// Add a new user's animal
export const addUserAnimal = (animalData) => {
    return fetch(`${API}/useranimal/newuseranimal`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            // "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(animalData),
             credentials: "include",
    })
    .then(response => response.json())
    .catch(error => console.error("Error adding user animal:", error));
};



// export const getAllUserAnimals =  () => {
//     return fetch(`${API}/useranimal/alluseranimals`, {
//       credentials: "include", // Include cookies in the request
//     })
//       .then((response) =>{
//         const data = response.json();
//         if (!response.ok) {
//           // throw new Error("Failed to fetch user animals");
//             // Handle response with status codes other than 2xx
//       return { success: false, message: data.message || "Failed to fetch user animals" };
//         }
//         return data;
//       })
//       .catch((error) => {
//         console.error("Error fetching all user animals:", error);
//         return { error: error.message };
//       });
//   };
export const getAllUserAnimals = async () => {
  try {
    const response = await fetch(`${API}/useranimal/alluseranimals`, {
      credentials: "include", // Include cookies in the request
    });

    const data = await response.json();

    if (!response.ok) {
      // Handle response with status codes other than 2xx
      return { success: false, message: data.message || "Failed to fetch user animals" };
    }

    return data; // Return data if the request is successful
  } catch (error) {
    console.error("Error fetching all user animals:", error);
    return { success: false, message: error.message };
  }
};



// Get a specific user's animal by ID
export const getUserAnimalById = (id) => {
  return fetch(`${API}/useranimal/getanimal/${id}`, {
      credentials: "include"
  })
  .then(response => response.json())
  .catch(error => console.error("Error fetching user animal by ID:", error));
};