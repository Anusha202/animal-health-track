// // // // VaccineReminderNotification.js (React Component)

// // // import { useEffect } from 'react';

// // // const VaccineReminderNotification = () => {
// // //   // Request notification permission when the component mounts
// // //   useEffect(() => {
// // //     if (Notification.permission !== "granted") {
// // //       Notification.requestPermission().then(permission => {
// // //         if (permission === "granted") {
// // //           console.log("Notification permission granted!");
// // //         }
// // //       });
// // //     }
// // //   }, []);

// // //   // Function to show the notification
// // //   const showVaccineReminderNotification = (message) => {
// // //     if (Notification.permission === "granted") {
// // //       new Notification("Vaccine Reminder", {
// // //         body: message,
// // //         icon: "/path/to/vaccine-icon.png", // Optional: Add an icon
// // //       });
// // //     } else {
// // //       console.log("Permission for notifications not granted");
// // //     }
// // //   };

// // //   // Button click handler to trigger notification
// // //   const handleNotification = () => {
// // //     showVaccineReminderNotification("Reminder: It's time for your pet's vaccine!");
// // //   };

// // //   return (
// // //     <div>
// // //       <h2>Vaccine Reminder</h2>
// // //       <button onClick={handleNotification}>
// // //         Show Vaccine Reminder
// // //       </button>
// // //     </div>
// // //   );
// // // };

// // // export default VaccineReminderNotification;


// // import { useEffect, useState } from "react";

// // const VaccineReminderNotification = () => {
// //   const [notifications, setNotifications] = useState([]);
// //   const [loading, setLoading] = useState(true);

// //   useEffect(() => {
// //     const fetchNotifications = async () => {
// //       try {
// //         // Replace this URL with your actual API endpoint
// //         const response = await fetch("/api/vaccine-notifications");
// //         const data = await response.json();
// //         setNotifications(data);
// //       } catch (error) {
// //         console.error("Error fetching notifications:", error);
// //       } finally {
// //         setLoading(false);
// //       }
// //     };

// //     fetchNotifications();
// //   }, []);

// //   if (loading) {
// //     return <div className="text-center mt-10">Loading notifications...</div>;
// //   }

// //   if (notifications.length === 0) {
// //     return <div className="text-center mt-10">No vaccine reminders available.</div>;
// //   }

// //   return (
// //     <div className="container mx-auto px-4 py-6">
// //       <h1 className="text-2xl font-bold text-center mb-6">Vaccine Reminders</h1>
// //       <ul className="list-disc list-inside">
// //         {notifications.map((notification, index) => (
// //           <li key={index} className="mb-4">
// //             <p>
// //               <strong>Animal:</strong> {notification.animalName}
// //             </p>
// //             <p>
// //               <strong>Vaccine:</strong> {notification.vaccineName}
// //             </p>
// //             <p>
// //               <strong>Due Date:</strong> {new Date(notification.dueDate).toLocaleDateString()}
// //             </p>
// //           </li>
// //         ))}
// //       </ul>
// //     </div>
// //   );
// // };

// // export default VaccineReminderNotification;
// import { useEffect, useState } from "react";

// const VaccineReminderNotification = () => {
//   const [notifications, setNotifications] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchNotifications = async () => {
//       try {
//         const response = await fetch("api/send-email/send-vaccine-email");
//         const data = await response.json();
//         setNotifications(data.data); // Set the notifications data
//       } catch (error) {
//         console.error("Error fetching notifications:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchNotifications();
//   }, []);

//   if (loading) {
//     return <div className="text-center mt-10">Loading notifications...</div>;
//   }

//   if (notifications.length === 0) {
//     return <div className="text-center mt-10">No vaccine reminders available.</div>;
//   }

//   return (
//     <div className="container mx-auto px-4 py-6">
//       <h1 className="text-2xl font-bold text-center mb-6">Vaccine Reminders</h1>
//       <ul className="list-disc list-inside">
//         {notifications.map((notification, index) => (
//           <li key={index} className="mb-4">
//             <p>
//               <strong>Animal:</strong> {notification.animalName}
//             </p>
//             <p>
//               <strong>Vaccine:</strong> {notification.vaccineName}
//             </p>
//             <p>
//               <strong>Due Date:</strong> {new Date(notification.dueDate).toLocaleDateString()}
//             </p>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default VaccineReminderNotification;
