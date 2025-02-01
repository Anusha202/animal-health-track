import { AnimalCategory } from "../models/animal.model.js";
import { Breed } from "../models/breed.model.js";

// Create a new animal
export const addAnimal = async (req, res) => {
  const { animal_type, breed_ids } = req.body;

  // Check if animal type already exists
  let animal = await AnimalCategory.findOne({ animal_type });
  if (animal) {
    return res.status(400).json({ error: "Animal already exists" });
  }

  // If breed_ids are provided, check if they are valid and create new breeds if necessary
  if (breed_ids) {
    const validBreeds = await Promise.all(
      breed_ids.map(async (breedId) => {
        let breed = await Breed.findById(breedId);
        if (!breed) {
          breed = await Breed.create({ breed_name: breedId });  // Create breed if it doesn't exist
        }
        return breed;
      })
    );
  }

  // Create the animal
  animal = await AnimalCategory.create({
    animal_type,
    breeds: breed_ids,
  });

  if (!animal) {
    return res.status(400).json({ error: "Something went wrong" });
  }

  res.status(201).json(animal); // Respond with the newly created animal
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
export const updateAnimal = async (req, res) => {
  try {
    const { id } = req.params;
    const { animal_type, breed_ids } = req.body;

    // Validate input
    if (!animal_type || !breed_ids) {
      return res.status(400).json({ error: "All fields are required." });
    }

    // Find and update the animal
    const updatedAnimal = await AnimalCategory.findByIdAndUpdate(
      id,
      { animal_type, breeds: breed_ids },
      { new: true }
    );

    if (!updatedAnimal) {
      return res.status(404).json({ error: "Animal not found." });
    }

    res.status(200).json(updatedAnimal);
  } catch (err) {
    console.error("Error updating animal:", err);
    res.status(500).json({ error: "Internal server error." });
  }
};

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
