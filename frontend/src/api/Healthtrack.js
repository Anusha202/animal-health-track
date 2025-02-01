// let API = "http://localhost:5000/api";

// // Add a health record
// export const addHealth = (add) => {
//     return fetch(`${API}/daily/dailyrecord`, {
//         method: "POST",
//         headers: {
//             "Content-Type": "application/json"
//         },
//         body: JSON.stringify(add),
//         credentials: "include", // Ensure credentials like cookies are included
//     })
//     .then(response => response.json())
//     .then(data => {
//         if (data.errors) {
//             return { error: data.errors.message || "An error occurred" };
//         }
//         return data;
//     })
//     .catch(error => {
//         return { error: "An error occurred while communicating with the server." };
//     });
// };

// // Get all daily records
// export const dailyrecords = () => {
//     return fetch(`${API}/daily/dailyrecords`, {
//         method: "GET",
//         credentials: "include", // Include credentials for GET requests
//     })
//     .then(res => res.json())
//     .catch(error => console.log("Error fetching daily records:", error));
// };

// // Get a daily record by ID
// export const dailyrecord = (id) => {
//     return fetch(`${API}/daily/dailyrecord/${id}`, {
//         method: "GET",
//         credentials: "include", // Include credentials for GET requests
//     })
//     .then(res => res.json())
//     .catch(error => console.log("Error fetching daily record by ID:", error));
// };
