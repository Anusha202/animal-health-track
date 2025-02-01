import { UserAnimal } from "../models/userAnimal.model.js";
import { User } from "../models/user.model.js";
import { AnimalCategory } from "../models/animal.model.js";

export const addUsersAnimal = async (req, res) => {
  const { animal_type, breed, age, gender } = req.body;
  const userId = req.userId;
  try {
    const animalCategory = await AnimalCategory.findById(animal_type)
    .populate("breeds");
    if (!animalCategory) {
      return res.status(400).json({ error: "Invalid animal type" });
    }
    // Check if the breed exists within the selected animal type
    // const breedData = animalCategory?.breeds.find(
    //     (breedItem) => breedItem.breed_name.toString() === breed.toString()
    // );
    if (!breed) {
      return res
        .status(400)
        .json({ error: "Invalid breed for this animal type" });
    }
    const newUserAnimal = await UserAnimal.create({
      user: userId, // verifyToken
      animal_type: animalCategory._id,
      breed:breed,
      age,
      gender,
    });
    res.status(201).json(newUserAnimal);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error adding user animal" });
  }
};

//get all user

//get all userAnimal 
export const getUserAnimals = async (req, res) => {
  try {
    const userId = req.userId; // Retrieved from token in the middleware
    const userAnimals = await UserAnimal.find({ user: userId })
      .populate("breed")
      .populate("animal_type");
    
    if (userAnimals.length === 0) {
      return res.status(404).json({ success: false, message: "No animals found for this user" });
      // return res.status(200).json({ success: true, data: [] });
    }

    // res.status(200).json( userAnimals );
    res.send(userAnimals)
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

//get by id

//get all userAnimal 
export const getUserAnimalById = async (req, res) => {
  const { id } = req.params;
  try {
    const userAnimals = await UserAnimal.findById(id)
    .populate("breed")
    .populate("animal_type");
    if(!userAnimals){
      return res.status(404).json({ success: false, message: "No animals found for this user" });
    }
    // res.status(200).json( userAnimals );
    res.send(userAnimals)
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};