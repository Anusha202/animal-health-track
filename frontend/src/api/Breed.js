const API = "http://localhost:5001/api";

// Add a new breed
export const addBreed = (breedData) => {
  return fetch(`${API}/breed/addbreed`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(breedData),
  })
    .then((response) => response.json())
    .catch((error) => {
      console.error("Error adding breed:", error);
      return { error: "Error adding breed" };
    });
};

// Get all breeds
export const getAllBreeds = () => {
  return fetch(`${API}/breed/getallbreeds`, {
    credentials: "include", // Include cookies if needed
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Failed to fetch breeds");
      }
      return response.json();
    })
    .catch((error) => {
      console.error("Error fetching all breeds:", error);
      return { error: error.message };
    });
};

// Get a specific breed by ID
export const getBreedByAnimalAndId = (animalType, id) => {
  return fetch(`${API}/breed/getbreed/${animalType}/${id}`, {
    credentials: "include", // Include cookies if needed
  })
    .then((response) => response.json())
    .catch((error) => {
      console.error("Error fetching breed by animal type and ID:", error);
      return { error: "Error fetching breed by animal type and ID" };
    });
};
