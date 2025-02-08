import { AnimalCategory } from "../models/animal.model.js";
import { Breed } from "../models/breed.model.js";

// Create a new animal
// export const addAnimal = async (req, res) => {
//   const { animal_type, breed_ids } = req.body;

//   // Check if animal type already exists
//   let animal = await AnimalCategory.findOne({ animal_type });
//   if (animal) {
//     return res.status(400).json({ error: "Animal already exists" });
//   }

 
//   if (breed_ids) {
//     const validBreeds = await Promise.all(
//       breed_ids.map(async (breedId) => {
//         let breed = await Breed.findById(breedId);
//         if (!breed) {
//           breed = await Breed.create({ breed_name: breedId });  
//         }
//         return breed;
//       })
//     );
//   }

//   // Create the animal
//   animal = await AnimalCategory.create({
//     animal_type,
//     breeds: breed_ids,
//   });

//   if (!animal) {
//     return res.status(400).json({ error: "Something went wrong" });
//   }

//   res.status(201).json(animal); // Respond with the newly created animal
// };


// In your backend controller file (e.g., `controllers/animalController.js`)
export const addAnimal = async (req, res) => {
  const { animal_type } = req.body;

  try {
    // Check if the animal already exists (case insensitive)
    let existingAnimal = await AnimalCategory.findOne({
      animal_type: { $regex: new RegExp(`^${animal_type}$`, "i") },
    });

    if (existingAnimal) {
      return res.status(400).json({ success: false, message: "Animal already exists" });
    }

    const newAnimal = new AnimalCategory({ animal_type });
    await newAnimal.save();

    res.status(201).json({ success: true, data: newAnimal });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


// Get all animals
export const getAllAnimals = async (req, res) => {
  try {
    const animals = await AnimalCategory.find().populate("breeds");
    // const category = await AnimalCategory.find().populate("breeds", "breed_name");
    res.status(200).json({ success: true, data: animals });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get a single animal by id
export const getAnimalById = async (req, res) => {
  try {
    const { id } = req.params;
    const animal = await AnimalCategory.findById(id).populate("breeds");

    if (!animal) {
      return res.status(404).json({ success: false, message: "Animal not found" });
    }

    res.status(200).json({ success: true, data: animal });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Update an animal
// export const updateAnimal = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { animal_type, breed_ids } = req.body;

//     // Validate input
//     if (!animal_type || !breed_ids) {
//       return res.status(400).json({ error: "All fields are required." });
//     }

//     // Find and update the animal
//     const updatedAnimal = await AnimalCategory.findByIdAndUpdate(
//       id,
//       { animal_type, breeds: breed_ids },
//       { new: true }
//     );

//     if (!updatedAnimal) {
//       return res.status(404).json({ error: "Animal not found." });
//     }

//     res.status(200).json(updatedAnimal);
//   } catch (err) {
//     console.error("Error updating animal:", err);
//     res.status(500).json({ error: "Internal server error." });
//   }
// };





// export const updateAnimal = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { animal_type } = req.body;

//     // Validate input
//     // if (!animal_type || !breed_ids) {
//     //   return res.status(400).json({ error: "All fields are required." });
//     // }

//     // Find and update the animal
//     const updatedAnimal = await AnimalCategory.findByIdAndUpdate(
//       id,
//       { animal_type},
//       { new: true }
//     );

//     if (!updatedAnimal) {
//       return res.status(404).json({ error: "Animal not found." });
//     }

//     res.status(200).json(updatedAnimal);
//   } catch (err) {
//     console.error("Error updating animal:", err);
//     res.status(500).json({ error: "Internal server error." });
//   }
// };


// export const updateAnimal = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { animal_type, breeds } = req.body;

//     // Validate input
//     if (!animal_type || !breeds || breeds.length === 0) {
//       return res.status(400).json({ error: "Animal type and breeds are required." });
//     }

//     // Find and update the animal category
//     const updatedAnimal = await AnimalCategory.findByIdAndUpdate(
//       id,
//       { animal_type, breeds },
//       { new: true }
//     );

//     if (!updatedAnimal) {
//       return res.status(404).json({ error: "Animal not found." });
//     }

//     res.status(200).json(updatedAnimal); // Return the updated animal data
//   } catch (err) {
//     console.error("Error updating animal:", err);
//     res.status(500).json({ error: "Internal server error." });
//   }
// };
export const updateAnimal = async (req, res) => {
  try {
    const { id } = req.params;
    const { animal_type, breeds } = req.body;

    if (!animal_type || !breeds || breeds.length === 0) {
      return res.status(400).json({ error: "Animal type and breeds are required." });
    }

    const updatedAnimal = await AnimalCategory.findByIdAndUpdate(
      id,
      { animal_type, breeds },
      { new: true }
    );

    if (!updatedAnimal) {
      return res.status(404).json({ error: "Animal not found." });
    }

    res.status(200).json({ success: true, data: updatedAnimal }); // ✅ FIX: Return `success: true`
  } catch (err) {
    console.error("Error updating animal:", err);
    res.status(500).json({ error: "Internal server error." });
  }
};


// module.exports = { updateAnimal };


// Delete an animal
export const deleteAnimal = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedAnimal = await AnimalCategory.findByIdAndDelete(id);

    if (!deletedAnimal) {
      return res.status(404).json({ success: false, message: "Animal not found" });
    }

    res.status(200).json({ success: true, message: "Animal deleted successfully" });
  } catch (error) {
    console.error("Error deleting animal:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};






// Fetch available breeds for each animal type
export const getAnimalBreeds = async (req, res) => {
  try {
    const animals = await AnimalCategory.find().populate('breeds', 'breed_name'); // Populate breeds for each animal

    // Format the response
    const breedOptions = animals.reduce((acc, animal) => {
      acc[animal.animal_type.toLowerCase()] = animal.breeds.map(breed => ({
        label: breed.breed_name,
        value: breed.breed_name.toLowerCase(),
      }));
      return acc;
    }, {});

    res.status(200).json({ breedOptions });
  } catch (error) {
    console.error("Error fetching breeds:", error);
    res.status(500).json({ error: "Failed to fetch animal breeds" });
  }
};

