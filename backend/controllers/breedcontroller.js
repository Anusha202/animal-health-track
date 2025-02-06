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

export const addBreed = async (req, res) => {
  const { breed_name, animal_type } = req.body; // animal_type is expected to be an ID

  try {
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


