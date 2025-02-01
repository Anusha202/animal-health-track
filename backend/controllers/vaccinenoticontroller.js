// // models/vaccineEmail.js

import { sendVaccineReminderEmail } from "../mailtrap/vaccine.js";

// import VaccineEmail from "../models/notificationsmodel.js";

// // Replace with your actual model

// // Get a single vaccine email by ID
// export const getVaccineEmailById = async (id) => {
//   try {
//       // Your database query logic to fetch the vaccine email by ID
//       const vaccineEmail = await VaccineEmailModel.findById(id); // Assuming you're using Mongoose or similar
//       if (!vaccineEmail) {
//           throw new Error("Vaccine email not found");
//       }
//       return vaccineEmail;
//   } catch (error) {
//       throw new Error("Error fetching vaccine email by ID: " + error.message);
//   }
// };


// // Get all vaccine emails
// // Import the correct model

// export const getAllVaccineEmails = async () => {
//     try {
//         const vaccineEmails = await VaccineEmail.find();  // MongoDB query to find all records
//         return vaccineEmails;
//     } catch (error) {
//         console.error("Error fetching all vaccine emails:", error); // Log the error for debugging
//         throw new Error("Error fetching all vaccine emails: " + error.message); // Include the original error message
//     }
// };

// controllers/vaccineController.js
 // Adjust path to your Notification model
// Adjust the path as necessary

 export const sendVaccineReminder = async (req, res) => {
     const { email, animalName, vaccineName, dueDate } = req.body; // Assuming the data is sent in the request body
 
     try {
         // Call the service to send the email and save the notification
         await sendVaccineReminderEmail(email, animalName, vaccineName, dueDate);
         
         // Respond with a success message
         res.status(200).json({ message: "Vaccine reminder email sent successfully!" });
     } catch (error) {
         console.error("Error in sending vaccine reminder:", error);
         res.status(500).json({ message: "Failed to send vaccine reminder email", error: error.message });
     }
 };
 