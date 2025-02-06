import express from "express";
import { addBreed,  getAllBreeds } from "../controllers/breedcontroller.js";

const router = express.Router();

router.post("/addbreed", addBreed);
router.get("/getbreed", getAllBreeds);

export default router;
