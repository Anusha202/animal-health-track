// ----------------------------------------------------------------------------------------------------------------------
import { UserAnimal } from "../models/userAnimal.model.js";
import { Vaccine } from "../models/vaccine.model.js";

// const calculateCosineSimilarity = (vectorA, vectorB) => {
//     const dotProduct = vectorA.reduce((sum, val, i) => sum + val * vectorB[i], 0);
//     const magnitudeA = Math.sqrt(vectorA.reduce((sum, val) => sum + val * val, 0));
//     const magnitudeB = Math.sqrt(vectorB.reduce((sum, val) => sum + val * val, 0));

//     return magnitudeA && magnitudeB ? dotProduct / (magnitudeA * magnitudeB) : 0;
//   };

//   export const recommendVaccines = async (req, res) => {
//     try {
//       const { userAnimalId } = req.params;

//       // Find the user's animal profile
//       const userAnimal = await UserAnimal.findById(userAnimalId)
//         .populate("animal_type")
//         .populate("breed");

//       if (!userAnimal) {
//         return res.status(404).json({ message: "User animal not found" });
//       }

//       // Extract user animal's properties
//       const { age, animal_type, breed, acceptedVaccines, rejectedVaccines } = userAnimal;

//       // Fetch vaccines matching the user's animal type and breed
//       const vaccines = await Vaccine.find({
//         animal_type: animal_type._id,
//         breed: breed._id,
//         _id: { $nin: [...acceptedVaccines, ...rejectedVaccines] }, // Exclude previously accepted/rejected
//       });

//       // Calculate similarity scores
//       const vaccineScores = vaccines.map((vaccine) => {
//         const effectivenessVector = Object.keys(vaccine.effectiveness).map((range) => {
//           const [minAge, maxAge] = range.split("-").map(Number);
//           return age >= minAge && age <= maxAge ? vaccine.effectiveness[range] : 0;
//         });

//         // Normalize user age effectiveness vector (same length as vaccine effectiveness)
//         const userEffectivenessVector = effectivenessVector.map(() => 1);

//         // Compute cosine similarity
//         const similarity = calculateCosineSimilarity(effectivenessVector, userEffectivenessVector);

//         return { vaccine, similarity };
//       });

//       // Sort vaccines by highest similarity
//       vaccineScores.sort((a, b) => b.similarity - a.similarity);

//       res.status(200).json({ recommendedVaccines: vaccineScores.map((v) => v.vaccine) });
//     } catch (error) {
//       res.status(500).json({ message: "Error recommending vaccines", error: error.message });
//     }
//   };

// const calculateCosineSimilarity = (vectorA, vectorB) => {
//     const dotProduct = vectorA.reduce((sum, val, i) => sum + val * vectorB[i], 0);
//     const magnitudeA = Math.sqrt(vectorA.reduce((sum, val) => sum + val * val, 0));
//     const magnitudeB = Math.sqrt(vectorB.reduce((sum, val) => sum + val * val, 0));

//     return magnitudeA && magnitudeB ? dotProduct / (magnitudeA * magnitudeB) : 0;
// };

// export const recommendVaccines = async (req, res) => {
//   try {
//     const { userAnimalId } = req.params;

//     // Find the user's animal profile
//     const userAnimal = await UserAnimal.findById(userAnimalId)
//       .populate("animal_type")
//       .populate("breed");

//     if (!userAnimal) {
//       return res.status(404).json({ message: "User animal not found" });
//     }

//     // Extract user animal's properties
//     const { age, animal_type, breed, acceptedVaccines, rejectedVaccines } = userAnimal;

//     // Fetch vaccines matching the user's animal type and breed
//     const vaccines = await Vaccine.find({
//       animal_type: animal_type._id,
//       breeds: breed._id,  // Modify to match breeds as an array
//       _id: { $nin: [...acceptedVaccines, ...rejectedVaccines] }, // Exclude previously accepted/rejected
//     });

//     // Calculate similarity scores
//     const vaccineScores = vaccines.map((vaccine) => {
//       // Create the effectiveness vector for the vaccine based on the user's age
//       const effectivenessVector = vaccine.effectiveness.map((effect) => {
//         // Check if the user's age falls within the min/max range for this effectiveness
//         if (age >= effect.minAge && age <= effect.maxAge) {
//           return effect.effectivenessPercentage;  // Use the effectiveness percentage for this age range
//         }
//         return 0;  // If not in range, set to 0
//       });

//       // User's effectiveness vector will have a 1 for each effectiveness value
//       const userEffectivenessVector = effectivenessVector.map(() => 1);

//       // Compute cosine similarity
//       const similarity = calculateCosineSimilarity(effectivenessVector, userEffectivenessVector);

//       return { vaccine, similarity };
//     });

//     // Sort vaccines by highest similarity
//     vaccineScores.sort((a, b) => b.similarity - a.similarity);

//     res.status(200).json({ recommendedVaccines: vaccineScores.map((v) => v.vaccine) });
//   } catch (error) {
//     res.status(500).json({ message: "Error recommending vaccines", error: error.message });
//   }
// };

const calculateCosineSimilarity = (vectorA, vectorB) => {
  const dotProduct = vectorA.reduce((sum, val, i) => sum + val * vectorB[i], 0);
  const magnitudeA = Math.sqrt(
    vectorA.reduce((sum, val) => sum + val * val, 0)
  );
  const magnitudeB = Math.sqrt(
    vectorB.reduce((sum, val) => sum + val * val, 0)
  );

  return magnitudeA && magnitudeB ? dotProduct / (magnitudeA * magnitudeB) : 0;
};

export const recommendVaccines = async (req, res) => {
  try {
    const { userAnimalId } = req.params;
    // Fetch the user's animal profile
    const userAnimal = await UserAnimal.findById(userAnimalId)
      .populate("animal_type")
      .populate("breed");
    if (!userAnimal) {
      return res.status(404).json({ message: "User animal not found" });
    }
    const { age, animal_type, breed, acceptedVaccines, rejectedVaccines } =
      userAnimal;
    // Convert user age from years to months
    const userAgeInMonths = age * 12;
    console.log("user animal age", userAgeInMonths);
    console.log("user animal type", animal_type._id);
    // Fetch vaccines matching the animal type
    const vaccinesByTpe = await Vaccine.find({
      animal_type: animal_type._id,
      _id: { $nin: [...acceptedVaccines, ...rejectedVaccines] }, // Exclude accepted/rejected
    });
    // Filter by breed
    const vaccines = vaccinesByTpe.filter((vaccine) =>
      vaccine.breeds.some((vaccineBreed) => vaccineBreed._id.equals(breed._id))
    );
    console.log("Filtered vaccines:", vaccines);
    // // Normalize age
    const normalizedUserAge = userAgeInMonths / (15 * 12);
    const vaccineScores = vaccines.map((vaccine) => {
      let ageMatch = 0,
        effectivenessScore = 0;
      // Convert vaccine attributes into a vector
      vaccine.effectiveness.forEach((effect) => {
        if (
          userAgeInMonths >= effect.minAge &&
          userAgeInMonths <= effect.maxAge
        ) {
          const normalizedVaccineAge =
            (effect.minAge + effect.maxAge) / 2 / (15 * 12);
          ageMatch = 1 - Math.abs(normalizedUserAge - normalizedVaccineAge);
          effectivenessScore = effect.effectivenessPercentage / 100;
        }
      });
      // If no effectiveness score is found, use a default
      if (effectivenessScore === 0) {
        effectivenessScore = 0.2; 
      }
      // Assign weights
      const ageWeight = 0.5;
      const effectivenessWeight = 0.5;
      // Create vectors
      const userVector = [normalizedUserAge * ageWeight,
        1 * effectivenessWeight, // User effectiveness is always 100%
      ];
      const vaccineVector = [ageMatch * ageWeight,
        effectivenessScore * effectivenessWeight
      ];
      // Compute cosine similarity
      const similarity = calculateCosineSimilarity(userVector, vaccineVector);
      console.log(`Vaccine: ${vaccine.vaccine_name}`);
      console.log(`User Vector:`, userVector);
      console.log(`Vaccine Vector:`, vaccineVector);
      console.log(`Cosine Similarity:`, similarity);
      return { vaccine, similarity };
    });
    // Sort vaccines by highest similarity
    vaccineScores.sort((a, b) => b.similarity - a.similarity);
    // Applying threshold filtering to exclude vaccines with low similarity
    const threshold = 0.7;
    const recommendedVaccines = vaccineScores.filter(
      (v) => v.similarity > threshold
    );
    res.status(200)
      .json({ recommendedVaccines: recommendedVaccines.map((v) => v.vaccine) });
  } catch (error) {
    res.status(500)
      .json({ message: "Error recommending vaccines", error: error.message });
  }
};

export const acceptVaccine = async (req, res) => {
  try {
    const { userAnimalId, vaccineId } = req.body;

    // Update user animal record
    const updatedAnimal = await UserAnimal.findByIdAndUpdate(
      userAnimalId,
      {
        $addToSet: { acceptedVaccines: vaccineId }, // Prevent duplicates
        $pull: { rejectedVaccines: vaccineId, missedVaccines: vaccineId }, // Remove if previously rejected/missed
      },
      { new: true }
    );

    res
      .status(200)
      .json({ message: "Vaccine accepted", animal: updatedAnimal });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error accepting vaccine", error: error.message });
  }
};

export const rejectVaccine = async (req, res) => {
  try {
    const { userAnimalId, vaccineId } = req.body;

    // Update user animal record
    const updatedAnimal = await UserAnimal.findByIdAndUpdate(
      userAnimalId,
      {
        $addToSet: { rejectedVaccines: vaccineId }, // Prevent duplicates
        $pull: { acceptedVaccines: vaccineId, missedVaccines: vaccineId }, // Remove if previously accepted/missed
      },
      { new: true }
    );

    res
      .status(200)
      .json({ message: "Vaccine rejected", animal: updatedAnimal });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error rejecting vaccine", error: error.message });
  }
};

export const markMissedVaccine = async (userAnimalId, vaccineId) => {
  try {
    await UserAnimal.findByIdAndUpdate(userAnimalId, {
      $addToSet: { missedVaccines: vaccineId },
    });
  } catch (error) {
    console.error("Error marking vaccine as missed:", error);
  }
};

//   ----------------------------------------------

export const createVaccine = async (req, res) => {
  try {
    const { vaccine_name, animal_type, breeds, effectiveness } = req.body;

    if (!vaccine_name || !animal_type || !breeds || !effectiveness) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newVaccine = new Vaccine({
      vaccine_name,
      animal_type,
      breeds,
      effectiveness,
    });

    const savedVaccine = await newVaccine.save();
    res.status(201).json(savedVaccine);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

/**
 * @desc Get all vaccines
 * @route GET /api/vaccines
 */
export const getAllVaccines = async (req, res) => {
  try {
    const vaccines = await Vaccine.find()
      .populate("animal_type", "animal_type") // Populate animal type
      .populate("breeds", "breed_name"); // Populate breed name

    res.status(200).json(vaccines);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

/**
 * @desc Get a single vaccine by ID
 * @route GET /api/vaccines/:id
 */
export const getVaccineById = async (req, res) => {
  try {
    const vaccine = await Vaccine.findById(req.params.id)
      .populate("animal_type", "animal_type")
      .populate("breeds", "breed_name");

    if (!vaccine) {
      return res.status(404).json({ message: "Vaccine not found" });
    }

    res.status(200).json(vaccine);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

/**
 * @desc Update a vaccine
 * @route PUT /api/vaccines/:id
 */
export const updateVaccine = async (req, res) => {
  try {
    const { vaccine_name, animal_type, breeds, effectiveness } = req.body;

    const updatedVaccine = await Vaccine.findByIdAndUpdate(
      req.params.id,
      { vaccine_name, animal_type, breeds, effectiveness },
      { new: true, runValidators: true }
    );

    if (!updatedVaccine) {
      return res.status(404).json({ message: "Vaccine not found" });
    }

    res.status(200).json(updatedVaccine);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

/**
 * @desc Delete a vaccine
 * @route DELETE /api/vaccines/:id
 */
export const deleteVaccine = async (req, res) => {
  try {
    const deletedVaccine = await Vaccine.findByIdAndDelete(req.params.id);

    if (!deletedVaccine) {
      return res.status(404).json({ message: "Vaccine not found" });
    }

    res.status(200).json({ message: "Vaccine deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};
