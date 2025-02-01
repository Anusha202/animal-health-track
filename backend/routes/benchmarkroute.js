// routes/animalBenchmarkRoutes.js
import express from 'express';
import multer from 'multer';
import { uploadCSV, getAllBenchmarks } from '../controllers/benchmark.controller.js';

const router = express.Router();

// Configure multer for file upload
const upload = multer({ dest: 'uploads/' });

// Routes
router.post('/upload', upload.single('file'), uploadCSV);  // Upload CSV file
router.get('/', getAllBenchmarks);  // Get all stored benchmark data

export default router;
