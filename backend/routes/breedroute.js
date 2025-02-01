import express from "express";
import { createBreed, getAllBreeds } from "../controllers/breedcontroller.js";

const router = express.Router();

router.post("/addbreed", createBreed);
router.get("/getbreed", getAllBreeds);

export default router;
