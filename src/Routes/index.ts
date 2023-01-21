import { Router } from 'express';
import carsRoutes from './carsRoutes';

const router = Router();

router.use('/cars', carsRoutes);

export default router;