import express from "express";
import { generateWeeklyHealthReport } from "../controllers/healthreportcontroller.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

// Route to generate a health report
router.get("/getWeeklyReport/:animalId", verifyToken, generateWeeklyHealthReport);

export default router;
