import express from "express";
import {
  addAnimal,
  deleteAnimal,
  getAllAnimals,
  getAnimalBreeds,
  getAnimalById,
  updateAnimal,
} from "../controllers/animalcontroller.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();


// router.post("/addanimal", addanimal);
router.post("/addanimal", addAnimal)
router.get("/getallanimal",getAllAnimals);
// router.get("/getanimals/:id", verifyToken,getAnimalById);
router.get("/getanimals/:id", getAnimalById);
// router.put("/update/:id",verifyToken, updateAnimal);
// router.put("/update/:id", updateAnimal);
router.put("/update/:id", updateAnimal);
router.delete("/delete/:id", deleteAnimal);
router.get("/getanimalbreeds", getAnimalBreeds);

export default router;
