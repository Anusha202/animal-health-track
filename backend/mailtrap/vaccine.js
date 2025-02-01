import { 
    VACCINE_REMINDER_TEMPLATE, 
    VACCINE_CONFIRMATION_TEMPLATE, 
    VACCINE_FOLLOWUP_TEMPLATE 
} from "./emailTemplates.js";
import { transporter, sender } from "./mailtrap.config.js";

export const sendVaccineReminderEmail = async (email, animalName, vaccineName, dueDate) => {
    try {
        const response = await transporter.sendMail({
            from: sender,
            to: email,
            subject: `Vaccination Reminder for ${animalName}`,
            html: VACCINE_REMINDER_TEMPLATE
                .replace("{animalType}", animalName)
                .replace("{vaccineName}", vaccineName)
                .replace("{dueDate}", dueDate),
            category: "Vaccine Reminder",
        });
        console.log("Vaccine reminder email sent successfully", response);
    } catch (error) {
        console.error("Error sending vaccine reminder email", error);
        throw new Error(`Error sending vaccine reminder email: ${error}`);
    }
};

export const sendVaccineConfirmationEmail = async (email, animalName, vaccineName, dateGiven) => {
    try {
        const response = await transporter.sendMail({
            from: sender,
            to: email,
            subject: `Vaccination Confirmation for ${animalName}`,
            html: VACCINE_CONFIRMATION_TEMPLATE
                .replace("{animalType}", animalName)
                .replace("{vaccineName}", vaccineName)
                .replace("{dateGiven}", dateGiven),
            category: "Vaccine Confirmation",
        });
        console.log("Vaccine confirmation email sent successfully", response);
    } catch (error) {
        console.error("Error sending vaccine confirmation email", error);
        throw new Error(`Error sending vaccine confirmation email: ${error}`);
    }
};

export const sendVaccineFollowUpEmail = async (email, animalName, vaccineName, followUpDate) => {
    try {
        const response = await transporter.sendMail({
            from: sender,
            to: email,
            subject: `Follow-up Reminder for ${animalName}`,
            html: VACCINE_FOLLOWUP_TEMPLATE
                .replace("{animalType}", animalName)
                .replace("{vaccineName}", vaccineName)
                .replace("{followUpDate}", followUpDate),
            category: "Vaccine Follow-Up",
        });
        console.log("Vaccine follow-up email sent successfully", response);
    } catch (error) {
        console.error("Error sending vaccine follow-up email", error);
        throw new Error(`Error sending vaccine follow-up email: ${error}`);
    }
};
