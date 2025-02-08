let API = "http://localhost:5001/api";

// Generate weekly health report
export const generateWeeklyReport = (id) => {
  return fetch(`${API}/report/getWeeklyReport/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      // "Authorization": `Bearer ${token}`, // Pass the token in the Authorization header
    },
    credentials: "include", // Include credentials for session handling (if required)
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.errors) {
        return { error: data.errors.message || "An error occurred" };
      }
      return data;
    })
    .catch((error) => {
      return { error:  error.message ||"An error occurred while communicating with the server." };
    });
};
