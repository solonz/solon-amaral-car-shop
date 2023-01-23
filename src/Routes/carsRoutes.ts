import { Router } from 'express';
import CarController from '../Controllers/CarController';

const carsRoutes = Router();

carsRoutes.get('/', (req, res, next) => new CarController(req, res, next).findAll());
carsRoutes.get('/:id', (req, res, next) => new CarController(req, res, next).findById());
carsRoutes.post('/', (req, res, next) => new CarController(req, res, next).create());

export default carsRoutes;