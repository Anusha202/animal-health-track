// import express from "express";
// import { sendVaccineConfirmationEmail, sendVaccineFollowUpEmail, sendVaccineReminderEmail } from "../mailtrap/vaccine.js";


// const router = express.Router();

// router.post("/send-vaccine-email", async (req, res) => {
//     const { type, email, animalName, vaccineName, date } = req.body;

//     try {
//         if (type === "reminder") {
//             await sendVaccineReminderEmail(email, animalName, vaccineName, date);
//             res.status(200).json({ message: "Vaccine reminder email sent successfully" });
//         } else if (type === "confirmation") {
//             await sendVaccineConfirmationEmail(email, animalName, vaccineName, date);
//             res.status(200).json({ message: "Vaccine confirmation email sent successfully" });
//         } else if (type === "follow-up") {
//             await sendVaccineFollowUpEmail(email, animalName, vaccineName, date);
//             res.status(200).json({ message: "Vaccine follow-up email sent successfully" });
//         } else {
//             res.status(400).json({ error: "Invalid email type" });
//         }
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// });


// export default router;




import express from "express";
import {
    sendVaccineConfirmationEmail,
    sendVaccineFollowUpEmail,
    sendVaccineReminderEmail
} from "../mailtrap/vaccine.js";
// import { getAllVaccineEmails, getVaccineEmailById } from "../controllers/vaccinenoticontroller.js";
// import Notifications from "../models/notificationsmodel.js";

// Assuming you have a function to get vaccine email dat
 // Update with your actual file path

const router = express.Router();

// POST endpoint to send vaccine email
router.post("/send-vaccine-email", async (req, res) => {
    const { type, email, animalName, vaccineName, date } = req.body;

    try {
        if (type === "reminder") {
            await sendVaccineReminderEmail(email, animalName, vaccineName, date);
            res.status(200).json({ message: "Vaccine reminder email sent successfully" });
        } else if (type === "confirmation") {
            await sendVaccineConfirmationEmail(email, animalName, vaccineName, date);
            res.status(200).json({ message: "Vaccine confirmation email sent successfully" });
        } else if (type === "follow-up") {
            await sendVaccineFollowUpEmail(email, animalName, vaccineName, date);
            res.status(200).json({ message: "Vaccine follow-up email sent successfully" });
        } else {
            res.status(400).json({ error: "Invalid email type" });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// // GET route to get a single vaccine email by ID
// router.get("/get-vaccine-email/:id", getVaccineEmailById);

// // GET route to get all vaccine emails
// router.get("/get-all-vaccine-emails", getAllVaccineEmails);
// Endpoint to fetch notifications
// app.get('/api/notifications', async (req, res) => {
//   try {
//       // Fetch the latest notifications from the database
//       const notifications = await Notifications.find().sort({ createdAt: -1 }).limit(10);
//       res.json({ notifications });
//   } catch (error) {
//       console.error('Error fetching notifications:', error);
//       res.status(500).send('Error fetching notifications');
//   }
// });

export default router;

