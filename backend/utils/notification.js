import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    auth: {
        user: process.env.SMTP_USERNAME,
        pass: process.env.SMTP_PASSWORD,
    },
});

async function sendNotification(notificationOptions) {
    try {
        const info = await transporter.sendMail({
            from: notificationOptions.from,
            to: notificationOptions.to,
            subject: notificationOptions.subject,
            text: notificationOptions.text,
            html: notificationOptions.html,
        });

        console.log("Notification sent: %s", info.messageId);
        return info; // Optionally return the info object for further processing
    } catch (error) {
        console.error("Error sending notification: %s", error.message);
        throw new Error(`Failed to send notification: ${error.message}`);
    }
}

//     await transporter.sendMail(mailOptions);
//     console.log("Notification sent to:", email);
//   } catch (error) {
//     console.error("Error sending notification:", error);
//   }
// };


// // Sample endpoint to trigger email notifications (could be scheduled as well)
// app.get('/send-reminder', async (req, res) => {
//     const { message, email } = req.query;
//     await sendAlertNotification({ message, email });
//     res.send('Email sent');
//   });
  
//   // Example of a cron job to send email notifications daily at 9 AM
//   cron.schedule('0 9 * * *', async () => {
//     // Here, you'd fetch users from your database and send a reminder for vaccines
//     const users = [
//       { email: 'user1@example.com' },
//       { email: 'user2@example.com' },
//     ];
  
//     users.forEach(user => {
//       sendAlertNotification({
//         message: "Reminder: Time for your pet's vaccine!",
//         email: user.email,
//       });
//     });
//   });
  
export default sendNotification;
