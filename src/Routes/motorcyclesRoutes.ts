import { Router } from 'express';
import MotorcycleController from '../Controllers/MotorcycleController';

const motorcycleRoutes = Router();

motorcycleRoutes.post('/', (req, res, next) => new MotorcycleController(req, res, next).create());

export default motorcycleRoutes;