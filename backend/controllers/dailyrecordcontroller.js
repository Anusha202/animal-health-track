import { Dailyrecord } from "../models/dailyrecords.model.js";
import animalsData from "../data/animal_data.js";
import { UserAnimal } from "../models/userAnimal.model.js";

//add a new daily record
export const createDailyRecord = async (req, res) => {
  const { id } = req.params;
  const { weight, production, temperature } = req.body;
  try {
    const userAnimal = await UserAnimal.findById(id).populate("animal_type");
    if (!userAnimal) {
      return res.status(404).json({ error: "Animal not found" });
    }
    const { animal_type } = userAnimal;
    // Check if a daily record already exists for today
    const today = new Date();
    const startOfDay = new Date(today.setUTCHours(0, 0, 0, 0)); // Set UTC start of the day
    const endOfDay = new Date(today.setUTCHours(23, 59, 59, 999)); 
    const existingRecord = await Dailyrecord.findOne({
      useranimal: id,
      createdAt: { $gte: startOfDay, $lte: endOfDay },
    });
    if (existingRecord) {
      return res.status(400).json({ error: "You have already entered data for today." });
    }
    // Validate production field for cow and chicken
    if (
      (animal_type?.animal_type === "Cow" ||
        animal_type?.animal_type === "Chicken") &&
      !production
    ) {
      return res
        .status(400)
        .json({ error: `Production data is required for ${type}.` });
    }
    const newDailyRecord = new Dailyrecord({
      useranimal: id,
      weight,
      production: animal_type?.animal_type === "Dog" ? null : production,
      temperature,
    });
    const savedRecord = await newDailyRecord.save();
    return res
      .status(201)
      .json({ message: "Daily record created", data: savedRecord });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error ctrating daily record", error });
  }
};

// const dailyRecords = await Dailyrecord.find({ useranimal: animalId })

// get all daily records
export const getAllDailyRecords = async (req, res) => {
  try {
    // Fetch all daily records and populate the 'useranimal' field
    const dailyRecords = await Dailyrecord.find().populate("useranimal");
    return res.status(200).json(dailyRecords);
  } catch (error) {
    console.error("Error fetching daily records:", error);
    return res
      .status(500)
      .json({ message: "Error fetching daily record", error });
  }
};
//get a daily record by id
// export const getDailyRecordById = async (req, res) => {
//     const { id } = req.params;

//     try {
//       const dailyRecord = await Dailyrecord.findById(id).populate("useranimal");

//       if (!dailyRecord) {
//         return res.status(404).json({ message: "Daily record not found" });
//       }

//       return res.status(200).json(dailyRecord);
//     } catch (error) {
//       return res.status(500).json({ message: "Error fetching daily record", error });
//     }
//   };

export const getAllDailyRecordsByUserAnimalId = async (req, res) => {
  const { id } = req.params;

  try {
    const dailyRecords = await Dailyrecord.find({ useranimal: id }).populate(
      "useranimal"
    );

    return res.status(200).json(dailyRecords);
  } catch (error) {
    console.error("Error fetching daily records:", error);
    return res.status(500).json({
      message: "An error occurred while retrieving the daily records.",
      error,
    });
  }
};
export const getDailyRecordsByUserAnimalId = async (req, res) => {
  const { id } = req.params;

  try {
    // Get today's date
    const today = new Date();

    // Get the current day (0 is Sunday, 1 is Monday, etc.)
    const currentDay = today.getDay();

    // Calculate the start of the week (Sunday)
    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - currentDay); // Set to Sunday

    // Set time to midnight for the start of the week
    startOfWeek.setHours(0, 0, 0, 0);

    // Calculate the end of the week (Saturday)
    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6); // Set to Saturday

    // Set time to just before midnight for the end of the week
    endOfWeek.setHours(23, 59, 59, 999);

    // Fetch records for the current week (from Sunday to Saturday)
    const dailyRecords = await Dailyrecord.find({
      useranimal: id,
      // createdAt: { $gte: startOfWeek, $lte: endOfWeek },
    }).populate("useranimal");

    if (dailyRecords.length === 0) {
      return res
        .status(404)
        .json({ error: "No records found for the current week" });
    }

    return res.status(200).json( dailyRecords );
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error fetching weekly data", error });
  }
};

//update
export const updateDailyRecord = async (req, res) => {
  const { id } = req.params;
  const { weight, production, temperature } = req.body;

  try {
    const updatedRecord = await Dailyrecord.findByIdAndUpdate(
      id,
      { weight, production, temperature },
      { new: true }
    );

    if (!updatedRecord) {
      return res.status(404).json({ message: "Daily record not found" });
    }

    return res
      .status(200)
      .json({ message: "Daily record updated", data: updatedRecord });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error updating daily record", error });
  }
};
//delete record
export const deleteDailyRecord = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedRecord = await Dailyrecord.findByIdAndDelete(id);

    if (!deletedRecord) {
      return res.status(404).json({ message: "Daily record not found" });
    }

    return res
      .status(200)
      .json({ message: "Daily record deleted", data: deletedRecord });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error deleting daily record", error });
  }
};

// Function to fetch the user-entered data and compare with the dataset
// export const getComparisonReport = async (req, res) => {
//   const { userId, animalId } = req.params;

//   try {
//     // Fetch the daily records for a specific user and animal
//     const dailyRecords = await Dailyrecord.find({
//       useranimal: animalId,
//     }).populate("useranimal");

//     if (!dailyRecords || dailyRecords.length === 0) {
//       return res
//         .status(404)
//         .json({ message: "No records found for this animal." });
//     }

//     const dataset = animalsData;

//     const comparisonResults = dailyRecords
//       .map((record) => {
//         const userAnimal = record.useranimal;
//         const breed = userAnimal.breed;
//         const animalType = userAnimal.animalType;
//         const age = userAnimal.age;

//         // const breedDataset = dataset.find(item => item.breed === breed && item.animalType === animalType);

//         const breedDataset = dataset.find((item) =>
//           item.breeds.some(
//             (breedObj) =>
//               breedObj.breed === breed && breedObj.animalType === animalType
//           )
//         );

//         if (breedDataset) {
//           const matchedAgeRange = breedDataset.ageRanges.find(
//             (range) => age >= range.minAge && age <= range.maxAge
//           );
//           if (matchedAgeRange) {
//             return {
//               breed,
//               animalType,
//               age,
//               weight: record.weight,
//               production: record.production,
//               temp: record.temperature,
//               comparison: {
//                 weightMatch:
//                   record.weight >= matchedAgeRange.minWeight &&
//                   record.weight <= matchedAgeRange.maxWeight,
//                 productionMatch:
//                   record.production >= matchedAgeRange.minProduction &&
//                   record.production <= matchedAgeRange.maxProduction,
//               },
//             };
//           }
//         }

//         return null;
//       })
//       .filter((result) => result !== null);

//     return res.status(200).json(comparisonResults);
//   } catch (error) {
//     console.error("Error fetching or comparing records:", error);
//     return res.status(500).json({ message: "Server error." });
//   }
// };

// // // // Function to fetch the user-entered data and compare it with the dataset
// // export const getComparisonReport = async (req, res) => {
// //   const { userId, animalId } = req.params;

// //   try {
// //       // Fetch the daily records for a specific user and animal
// //       const dailyRecords = await Dailyrecord.find({ useranimal: animalId }).populate('useranimal');

// //       if (!dailyRecords || dailyRecords.length === 0) {
// //           return res.status(404).json({ message: "No records found for this animal." });
// //       }

// //       // Dataset to compare against
// //       const dataset = animalsData;

// //       // Perform the comparison
// //       const comparisonResults = dailyRecords.map(record => {
// //           const userAnimal = record.useranimal;
// //           const breed = userAnimal?.breed;
// //           const animalType = userAnimal?.animalType;
// //           const age = userAnimal?.age;

// //           if (!breed || !animalType || !age) {
// //               console.warn("Missing breed, animalType, or age in userAnimal:", userAnimal);
// //               return null; // Skip if essential data is missing
// //           }

// //           // Find breed-specific dataset
// //           const breedDataset = dataset.find(item =>
// //               item.breeds.some(breedObj =>
// //                   breedObj.breed === breed && breedObj.animalType === animalType
// //               )
// //           );

// //           if (!breedDataset) {
// //               console.warn(`No dataset found for breed: ${breed}, animalType: ${animalType}`);
// //               return null; // Skip if no matching dataset is found
// //           }

// //           // Find the matching age range
// //           const matchedAgeRange = breedDataset.ageRanges?.find(range =>
// //               age >= range.minAge && age <= range.maxAge
// //           );

// //           if (!matchedAgeRange) {
// //               console.warn(`No matching age range found for breed: ${breed}, age: ${age}`);
// //               return null; // Skip if no age range matches
// //           }

// //           // Return comparison results
// //           return {
// //               breed,
// //               animalType,
// //               age,
// //               weight: record.weight,
// //               production: record.production,
// //               temp: record.temperature,
// //               comparison: {
// //                   weightMatch: record.weight >= matchedAgeRange.minWeight && record.weight <= matchedAgeRange.maxWeight,
// //                   productionMatch: record.production >= matchedAgeRange.minProduction && record.production <= matchedAgeRange.maxProduction,
// //               }
// //           };
// //       }).filter(result => result !== null); // Filter out skipped results

// //       if (comparisonResults.length === 0) {
// //           return res.status(404).json({ message: "No matching records found in the dataset." });
// //       }

// //       return res.status(200).json(comparisonResults);
// //   } catch (error) {
// //       console.error("Error fetching or comparing records:", error);
// //       return res.status(500).json({ message: "Server error." });
// //   }
// // };
// // Function to fetch the user-entered data and compare it with the dataset
// export const getComparisonReport = async (req, res) => {
//   const { userId, animalId } = req.params;

//   try {
//       // Fetch the daily records for a specific user and animal
//       const dailyRecords = await Dailyrecord.find({ useranimal: animalId })
//           .populate({
//               path: 'useranimal',
//               populate: { path: 'animal' } // Populate the 'animal' field inside 'useranimal'
//           });

//       if (!dailyRecords || dailyRecords.length === 0) {
//           return res.status(404).json({ message: "No records found for this animal." });
//       }

//       // Dataset to compare against
//       const dataset = animalsData;

//       // Perform the comparison
//       const comparisonResults = dailyRecords.map(record => {
//           const userAnimal = record.useranimal;
//           const animalData = userAnimal?.animal;

//           if (!animalData) {
//               console.warn("Missing animal data in userAnimal:", userAnimal);
//               return null; // Skip if animal data is not available
//           }

//           const breed = animalData.breed;
//           const animalType = animalData.animalType;
//           const age = userAnimal.age; // Assuming 'age' is still on the 'useranimal' object

//           if (!breed || !animalType || !age) {
//               console.warn("Missing breed, animalType, or age in animalData:", animalData);
//               return null; // Skip if essential data is missing
//           }

//           // Find breed-specific dataset
//           const breedDataset = dataset.find(item =>
//               item.breeds.some(breedObj =>
//                   breedObj.breed === breed && breedObj.animalType === animalType
//               )
//           );

//           if (!breedDataset) {
//               console.warn(`No dataset found for breed: ${breed}, animalType: ${animalType}`);
//               return null; // Skip if no matching dataset is found
//           }

//           // Find the matching age range
//           const matchedAgeRange = breedDataset.ageRanges?.find(range =>
//               age >= range.minAge && age <= range.maxAge
//           );

//           if (!matchedAgeRange) {
//               console.warn(`No matching age range found for breed: ${breed}, age: ${age}`);
//               return null; // Skip if no age range matches
//           }

//           // Return comparison results
//           return {
//               breed,
//               animalType,
//               age,
//               weight: record.weight,
//               production: record.production,
//               temp: record.temperature,
//               comparison: {
//                   weightMatch: record.weight >= matchedAgeRange.minWeight && record.weight <= matchedAgeRange.maxWeight,
//                   productionMatch: record.production >= matchedAgeRange.minProduction && record.production <= matchedAgeRange.maxProduction,
//               }
//           };
//       }).filter(result => result !== null); // Filter out skipped results

//       if (comparisonResults.length === 0) {
//           return res.status(404).json({ message: "No matching records found in the dataset." });
//       }

//       return res.status(200).json(comparisonResults);
//   } catch (error) {
//       console.error("Error fetching or comparing records:", error);
//       return res.status(500).json({ message: "Server error." });
//   }
// };
