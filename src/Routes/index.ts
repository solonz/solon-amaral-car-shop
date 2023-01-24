import { Router } from 'express';
import carsRoutes from './carsRoutes';
import motorcyclesRoutes from './motorcyclesRoutes';

const router = Router();

router.use('/cars', carsRoutes);
router.use('/motorcycles', motorcyclesRoutes);

export default router;