const API = "http://localhost:5000/api";

// Add a new breed
export const addBreed = (breedData) => {
  return fetch(`${API}/breed/createbreed`, {
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
export const getBreedById = (id) => {
  return fetch(`${API}/breed/getbreed/${id}`, {
    credentials: "include", // Include cookies if needed
  })
    .then((response) => response.json())
    .catch((error) => {
      console.error("Error fetching breed by ID:", error);
      return { error: "Error fetching breed by ID" };
    });
};
