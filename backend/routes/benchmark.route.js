import { Router } from 'express';
import { createBenchmark, getAllBenchmarks, getBenchmarkById, updateBenchmark, deleteBenchmark } from '../controllers/benchmark.controller.js';
import { verifyToken } from '../middleware/verifyToken.js';

const router = Router();
router.post('/addbenchmark', createBenchmark);
router.get('/getallbenchmark', getAllBenchmarks);

router.get('/getbenchmark/:id',verifyToken, getBenchmarkById);
router.put('/updatebenchmark/:id', updateBenchmark);
router.delete('/deletebenchmark/:id', deleteBenchmark);

export default router;
