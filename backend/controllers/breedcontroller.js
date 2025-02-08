import { AnimalCategory } from "../models/animal.model.js";
import { Breed } from "../models/breed.model.js";

// Create a new breed
// export const createBreed = async (req, res) => {
//   const { breed_name, animal_type } = req.body; 
  
//   try {
//     let animal = await AnimalCategory.findById(animal_type);
    
//     if (!animal) {
//       return res
//         .status(400)
//         .json({ success: false, message: "Animal type not found." });
//     }

//     let breed = await Breed.findOne({ breed_name, animal_type });

//     if (breed) {
//       return res
//         .status(400)
//         .json({ success: false, message: "Breed already exists" });
//     }

//     // Create new breed with the associated animal_type
//     breed = await Breed.create({ breed_name, animal_type });

//     animal.breeds.push(breed._id);  // Add breed ID to the animal's breeds list
//     await animal.save();
    
//     res.status(201).json({ success: true, data: breed });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };


// export const createBreed = async (req, res) => {
//   // const addBreed = async (breedName, animalTypeId) => {
//   const { breed_name, animal_type } = req.body;

//   try {
//     let animal = await AnimalCategory.findById(animal_type);
    
//     if (!animal) {
//       return res.status(400).json({ success: false, message: "Animal type not found." });
//     }

//     let breed = await Breed.findOne({ breed_name, animal_type });

//     if (breed) {
//       return res.status(400).json({ success: false, message: "Breed already exists" });
//     }

//     // Create new breed with reference to animal_type
//     breed = new Breed({ breed_name, animal_type });
//     await breed.save();

//     // Update the animal's breed list
//     animal.breeds.push(breed);
//     await animal.save(); 

//     res.status(201).json({ success: true, data: breed });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// export const addBreed = async (req, res) => {
//   const { breed_name, animal_type } = req.body; // animal_type is expected to be an ID

//   try {
//     let animal = await AnimalCategory.findById(animal_type);

//     if (!animal) {
//       return res.status(400).json({ success: false, message: "Animal type not found." });
//     }

//     let existingBreed = await Breed.findOne({ breed_name, animal_type });

//     if (existingBreed) {
//       return res.status(400).json({ success: false, message: "Breed already exists." });
//     }

//     // Create and save new breed
//     const breed = new Breed({ breed_name, animal_type });
//     await breed.save();

//     // Link the breed to the animal
//     animal.breeds.push(breed._id);
//     await animal.save();

//     res.status(201).json({ success: true, data: breed });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

export const addBreed = async (req, res) => {
  const { breed_name, animal_type } = req.body; // animal_type is expected to be an ID

  try {
    // Check if the animal_type ObjectId is valid
    if (!mongoose.Types.ObjectId.isValid(animal_type)) {
      return res.status(400).json({ success: false, message: "Invalid animal type ID." });
    }

    let animal = await AnimalCategory.findById(animal_type);

    if (!animal) {
      return res.status(400).json({ success: false, message: "Animal type not found." });
    }

    let existingBreed = await Breed.findOne({ breed_name, animal_type });

    if (existingBreed) {
      return res.status(400).json({ success: false, message: "Breed already exists." });
    }

    // Create and save new breed
    const breed = new Breed({ breed_name, animal_type });
    await breed.save();

    // Link the breed to the animal
    animal.breeds.push(breed._id);
    await animal.save();

    res.status(201).json({ success: true, data: breed });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};




// Get all breeds
export const getAllBreeds = async (req, res) => {
  try {
    const breeds = await Breed.find().populate("animal_type")
    res.status(200).json(breeds);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get Breed by ID
export const getBreedById = async (req, res) => {
  const breedId = req.params.id;

  try {
    // Find breed by ID
    const breed = await Breed.findById(breedId);

    if (!breed) {
      return res.status(404).json({ error: "Breed not found" });
    }

    res.json(breed); // Return the breed data
  } catch (error) {
    console.error("Error fetching breed by ID:", error);
    res.status(500).json({ error: "Error fetching breed by ID" });
  }
};


// breedcontroller.js

const getBreedsByAnimalType = async (req, res) => {
  const { animalType } = req.params; // Get animalType from the URL params

  try {
    const breeds = await Breed.find({ animalType: animalType }); // Fetch breeds for that animalType
    if (!breeds.length) {
      return res.status(404).json({ error: "No breeds found for this animal type" });
    }
    res.json(breeds); // Return the breeds list
  } catch (error) {
    console.error("Error fetching breeds:", error);
    res.status(500).json({ error: "Error fetching breeds" });
  }
};

export { getBreedsByAnimalType };




