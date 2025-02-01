const API = "http://localhost:5000/api";

// Fetch all vaccines
export const getAllVaccines = async () => {
  try {
    const response = await fetch(`${API}/vaccine/getallvaccines`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error("Failed to fetch vaccines");
    }
    const data = await response.json();
    return data.vaccines;
  } catch (error) {
    console.error("Error fetching vaccines:", error);
    throw error;
  }
};


export const addVaccine = async (newVaccine) => {
  try {
    console.log("Sending vaccine data:", newVaccine); // Debugging: Log the payload being sent

    const response = await fetch(`${API}/vaccine/addvaccine`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newVaccine), // Send the new vaccine data as JSON
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Failed to add vaccine");
    }

    const data = await response.json();
    return data; // Return the newly added vaccine data
  } catch (error) {
    console.error("Error adding vaccine:", error.message); // Log the error message
    throw error;
  }
};

