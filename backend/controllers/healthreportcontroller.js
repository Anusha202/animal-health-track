// import chickenData from '../data/chicken_data.js';
// import dogData from '../data/dog_data.js';
// import cowData from '../data/cows_data.js';
// import HealthReport from './healthReportModel.js'; // MongoDB model for saving health reports

// const getBenchmarkData = (animalType, breed) => {
//     let benchmarkData;

//     switch (animalType) {
//       case 'Chicken':
//         benchmarkData = chickenData.find(data => data.breed === breed && data.animalType === animalType);
//         break;
//       case 'Cow':
//         benchmarkData = cowData.find(data => data.breed === breed && data.animalType === animalType);
//         break;
//       case 'Dog':
//         benchmarkData = dogData.find(data => data.breed === breed && data.animalType === animalType);
//         break;
//       default:
//         throw new Error('Unknown animal type');
//     }

//     return benchmarkData;
//   };

//   // Main business logic to generate a health report
//   const generateHealthReport = (userData) => {
//     const { animalType, breed, age, weight, milkProduction, temperature } = userData;

//     // Get the correct benchmark data for the animal
//     const benchmark = getBenchmarkData(animalType, breed);

//     if (!benchmark) {
//       throw new Error('No benchmark data found for the given animal type and breed');
//     }

//     // Finding the relevant age data from the benchmark dataset
//     const ageData = benchmark.age_data.find(data => age >= data.age_range.min && age <= data.age_range.max);

//     if (!ageData) {
//       throw new Error('No benchmark data found for the given age range');
//     }

//     // Default health status
//     let healthStatus = 'Healthy';

//     // Compare weight with benchmark data
//     if (weight < ageData.weight_range.min || weight > ageData.weight_range.max) {
//       healthStatus = 'Underweight or Overweight';
//     }

//     // // Compare weight with benchmark data
//     // if (weight < ageData.weight_range.min) {
//     //   healthStatus = 'Underweight';
//     // } else if (weight > ageData.weight_range.max) {
//     //   healthStatus = 'Overweight';
//     // }

//     // Compare milk production with benchmark data (only for cows)
//     if (milkProduction && animalType === 'Cow') {
//       if (milkProduction < ageData.milk_production_per_week.min || milkProduction > ageData.milk_production_per_week.max) {
//         healthStatus = 'Milk Production Abnormal';
//       }
//     }

//     // Compare temperature with benchmark data
//     if (temperature && (temperature < 37 || temperature > 40)) {
//       healthStatus = 'Temperature Abnormal';
//     }

//     // Create and return a new health report object
//     const newReport = new HealthReport({
//       animalType,
//       breed,
//       age,
//       weight,
//       milkProduction,
//       temperature,
//       healthStatus,
//     });

//     return newReport;
//   };

// export { generateHealthReport };

import { Dailyrecord } from "../models/dailyrecords.model.js";
import chickenData from "../data/chicken_data.js";
import dogData from "../data/dog_data.js";
import cowData from "../data/cows_data.js";
import WeeklyReport from "../models/weeklyreport.model.js";

// Helper function to get the benchmark data for the animal
const getBenchmarkData = (animalType, breed, age) => {
  let benchmarkData;

  switch (animalType) {
    case "Chicken":
      benchmarkData = chickenData.find(
        (data) =>
          data.breed.toLowerCase() === breed.toLowerCase() &&
          data.animalType === animalType
      );
      break;
    case "Cow":
      benchmarkData = cowData.find(
        (data) =>
          data.breed.toLowerCase() === breed.toLowerCase() &&
          data.animalType === animalType
      );
      break;
    case "Dog":
      benchmarkData = dogData.find(
        (data) =>
          data.breed.toLowerCase() === breed.toLowerCase() &&
          data.animalType === animalType
      );
      break;
    default:
      throw new Error("Unknown animal type");
  }
  if (benchmarkData) {
    // Finding appropriate age range in the benchmark data
    const ageRange = benchmarkData.age_data.find(
      (ageGroup) =>
        age >= ageGroup.age_range.min && age <= ageGroup.age_range.max
    );

    if (ageRange) {
      // Returns the benchmark data based on animal type
      if (animalType === "Cow") {
        return {
          milk_per_day: ageRange.milk_per_day, // For cows
          weight_range: ageRange.weight_range,
        };
      } else if (animalType === "Chicken") {
        return {
          egg_production_per_week: ageRange.egg_production_per_week, // For chickens
          weight_range: ageRange.weight_range,
        };
      } else if (animalType === "Dog") {
        return {
          weight_range: ageRange.weight_range, // For dogs (no production)
        };
      }
    } else {
      throw new Error("No benchmark data found for the specified age range");
    }
  } else {
    throw new Error("No benchmark data found for this breed");
  }
};

// Helper function to get the start and end of the current week
const getStartAndEndOfCurrentWeek = () => {
  const currentDate = new Date();
  const currentDay = currentDate.getDay(); // Sunday is 0, Monday is 1, ..., Saturday is 6
  const startOfWeek = new Date(currentDate);
  startOfWeek.setDate(currentDate.getDate() - currentDay);
  startOfWeek.setUTCHours(0, 0, 0, 0); // Reset to the start of the day in UTC
  const endOfWeek = new Date(startOfWeek);
  endOfWeek.setDate(startOfWeek.getDate() + 6);
  endOfWeek.setUTCHours(23, 59, 59, 999);
  return { start: startOfWeek, end: endOfWeek };
};

// Function to generate the weekly health report (rule-based)
const generateWeeklyReport = (dailyRecords, benchmarkData) => {
  let abnormalCount = 0;
  let totalWeight = 0;
  let totalTemperature = 0;
  let totalProduction = 0;
  let productionCount = 0;

  // Check each day's data against the benchmark
  dailyRecords.forEach((record) => {
    // Calculate the totals for weight and temperature
    totalWeight += record.weight || 0; // If no weight data, add 0
    totalTemperature += record.temperature || 0; // If no temperature data, add 0
    const animalType = record?.useranimal?.animal_type?.animal_type; // Accessing animal type
    if (record.production) {
      totalProduction += record.production;
      productionCount++;
      if (animalType === "Cow") {
        // Check milk production for cows
        if (
          record.production < benchmarkData.milk_production_per_week?.min ||
          record.production > benchmarkData.milk_production_per_week?.max
        ) {
          abnormalCount++;
        }
      } else if (animalType === "Chicken") {
        // Check egg production for chickens
        if (
          record.production < benchmarkData.eggs_per_week?.min ||
          record.production > benchmarkData.eggs_per_week?.max
        ) {
          abnormalCount++;
        }
      }
    }
    // Check weight range
    if (
      record.weight < benchmarkData.weight_range?.min ||
      record.weight > benchmarkData.weight_range?.max
    ) {
      abnormalCount++;
    }
    // Check for temperature abnormalities
    if (record.temperature < 37 || record.temperature > 40) {
      abnormalCount++;
    }
  });

  const avgWeight = totalWeight / dailyRecords.length;
  const avgTemperature = totalTemperature / dailyRecords.length;
  const avgProduction =
    productionCount > 0 ? totalProduction / productionCount : 0;

  // Health status: If any abnormalities found, mark as "Abnormal"
  const healthStatus = abnormalCount > 0 ? "Abnormal" : "Healthy";

  return {
    healthStatus,
    abnormalCount,
    avgWeight,
    avgTemperature,
    avgProduction,
  };
};

// Function to generate weekly health reports for the current week
export const generateWeeklyHealthReport = async (req, res) => {
  const { animalId } = req.params; // User Animal ID
  try {
    // Calculates the start and end of the current week
    const { start: startOfWeek, end: endOfWeek } =
      getStartAndEndOfCurrentWeek();
    console.log("Start of Week:", startOfWeek.toISOString());
    console.log("End of Week:", endOfWeek.toISOString());
    // Fetch records for the current week
    const dailyRecords = await Dailyrecord.find({
      useranimal: animalId,
      createdAt: { $gte: startOfWeek, $lte: endOfWeek },
    }).populate({
      path: "useranimal",
      populate: [
        {
          path: "animal_type",
          select: "animal_type",
        },
        {
          path: "breed",
          select: "breed_name",
        },
      ],
    });

    if (dailyRecords.length === 0) {
      return res.status(200).json({
        message: "No records found for this animal this week.",
      });
    }

    /// Extract animal details from the first record
    // const { useranimal } = dailyRecords[0];
    const animalType = dailyRecords[0]?.useranimal?.animal_type?.animal_type; // Get the animal type name
    const breedName = dailyRecords[0]?.useranimal?.breed?.breed_name;
    const age = dailyRecords[0]?.useranimal?.age;

    console.log("Animal Type:", animalType);
    console.log("Breed:", breedName);
    console.log("Age:", age);

    const benchmarkData = getBenchmarkData(animalType, breedName, age);

    console.log("Benchmark Data:", benchmarkData);

    if (!benchmarkData) {
      return res.status(200).json({
        message: "No benchmark data found for this animal.",
      });
    }

    // Generate the report for the week
    const weeklyReport = generateWeeklyReport(dailyRecords, benchmarkData);

    // Save the generated report to the database
    const newWeeklyReport = new WeeklyReport({
      animal: animalId,
      weekStart: startOfWeek,
      weekEnd: endOfWeek,
      reportData: {
        healthStatus: weeklyReport.healthStatus,
        abnormalCount: weeklyReport.abnormalCount,
        avgTemperature: weeklyReport.avgTemperature,
        avgProduction: weeklyReport.avgProduction,
        avgWeight: weeklyReport.avgWeight,
      },
    });
    await newWeeklyReport.save();

    return res.status(200).json({
      message: "Weekly report generated successfully",
      report: weeklyReport,
    });
  } catch (error) {
    console.error("Error generating weekly report:", error);
    return res
      .status(500)
      .json({ message: "Error generating weekly report", error });
  }
};
