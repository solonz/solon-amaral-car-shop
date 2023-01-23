import { NextFunction, Request, Response } from 'express';
import ICar from '../Interfaces/ICar';
import CarService from '../Services/CarService';

export default class CarController {
  private req: Request;
  private res: Response;
  private next: NextFunction;
  private carService: CarService;

  constructor(req: Request, res: Response, next: NextFunction) {
    this.req = req;
    this.res = res;
    this.next = next;
    this.carService = new CarService();
  }

  public async create() {
    const car: ICar = this.req.body;
    // console.log('CAR-------------', car);
    const createCar = await this.carService.create(car);
    // console.log('CREATECAR---------', createCar);
    return this.res.status(201).json(createCar);
  }

  public async findAll() {
    try {
      const result = await this.carService.findAll();
      return this.res.status(result.status).json(result.response);
    } catch (error) {
      this.next(error);
    }
  }

  public async findById() {
    try {
      const { id } = this.req.params;
      const result = await this.carService.findById(id);
      return this.res.status(result.status).json(result.response);
    } catch (error) {
      this.next(error);
    }
  }
}
