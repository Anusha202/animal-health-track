const API = "http://localhost:5001/api";

// Add a new benchmark
export const addBenchmark = (benchmarkData) => {
  return fetch(`${API}/benchmark/addbenchmark`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(benchmarkData),
    credentials: "include", // Include cookies in the request
  })
    .then((response) => response.json())
    .catch((error) => console.error("Error adding benchmark:", error));
};

// Get all benchmarks
export const getAllBenchmarks = async () => {
  try {
    const response = await fetch(`${API}/benchmark/getallbenchmark`, {
      credentials: "include", // Include cookies in the request
    });

    const data = await response.json();

    if (!response.ok) {
      return { success: false, message: data.message || "Failed to fetch benchmarks" };
    }

    return data; // Return data if the request is successful
  } catch (error) {
    console.error("Error fetching all benchmarks:", error);
    return { success: false, message: error.message };
  }
};

// Get a benchmark by ID
export const getBenchmarkById = (id) => {
  return fetch(`${API}/benchmark/getbenchmark/${id}`, {
    credentials: "include", // Include cookies in the request
  })
    .then((response) => response.json())
    .catch((error) => console.error("Error fetching benchmark by ID:", error));
};

// Update a benchmark by ID
export const updateBenchmark = (id, benchmarkData) => {
  return fetch(`${API}/benchmark/updatebenchmark/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(benchmarkData),
    credentials: "include", // Include cookies in the request
  })
    .then((response) => response.json())
    .catch((error) => console.error("Error updating benchmark:", error));
};

// Delete a benchmark by ID
export const deleteBenchmark = (id) => {
  return fetch(`${API}/benchmark/deletebenchmark/${id}`, {
    method: "DELETE",
    credentials: "include", // Include cookies in the request
  })
    .then((response) => response.json())
    .catch((error) => console.error("Error deleting benchmark:", error));
};
