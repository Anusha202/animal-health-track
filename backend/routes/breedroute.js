import express from "express";
import { addBreed,  getAllBreeds ,getBreedById,getBreedsByAnimalType} from "../controllers/breedcontroller.js";

const router = express.Router();

router.post("/addbreed", addBreed);
router.get("/getbreed", getAllBreeds);
// router.get("/getbreed/:id", getBreedById);
// router.get("/getbreed/:id",getBreedById);
router.get("/getbreed/:id", getBreedById);
router.get('/getbreedsbyanimal/:animalType', getBreedsByAnimalType);


export default router;
