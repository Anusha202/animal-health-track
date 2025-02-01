import express from "express"
import { addUsersAnimal, getUserAnimalById, getUserAnimals } from "../controllers/userAnimal.controller.js"
import { verifyToken } from "../middleware/verifyToken.js"

const router = express.Router()

router.post("/newuseranimal", verifyToken,addUsersAnimal)
router.get("/alluseranimals", verifyToken, getUserAnimals);
router.get("/getanimal/:id", verifyToken, getUserAnimalById)
export default router