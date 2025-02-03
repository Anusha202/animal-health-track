// import mongoose from 'mongoose';
// import Benchmark from './models/benchmarkModel.js'; // Adjust path if needed
// import { benchmarkData } from './benchmarkData.js'; // Import data
// import dotenv from "dotenv";
// dotenv.config();
// // MongoDB Connection
// const MONGO_URI = process.env.MONGO_URI;

// const seedDatabase = async () => {
//   try {
//     await mongoose.connect(MONGO_URI, {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     });

//     console.log('Connected to MongoDB');

//     await Benchmark.deleteMany(); // Clear old data
//     await Benchmark.insertMany(benchmarkData); // Insert new data

//     console.log('Seeding successful!');
//     mongoose.connection.close(); // Close connection
//   } catch (error) {
//     console.error('Seeding failed:', error);
//     mongoose.connection.close();
//   }
// };

// // Run Seeder
// seedDatabase();


import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js'; // Import your existing connection function
import Benchmark from './models/benchmarkModel.js'; // Adjust path if needed
import { benchmarkData } from './benchmarkData.js'; // Import benchmark data

dotenv.config(); // Load environment variables

const seedDatabase = async () => {
  try {
    await connectDB(); // Use your existing connection function

    await Benchmark.deleteMany(); // Clear old data
    await Benchmark.insertMany(benchmarkData); // Insert new benchmark data

    console.log('Seeding successful!');
    mongoose.connection.close(); // Close DB connection after seeding
  } catch (error) {
    console.error('Seeding failed:', error);
    mongoose.connection.close();
  }
};

// Run Seeder
seedDatabase();
