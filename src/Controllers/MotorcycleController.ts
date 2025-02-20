import { NextFunction, Request, Response } from 'express';
import IMotorcycle from '../Interfaces/IMotorcycle';
import MotorcycleService from '../Services/MotorcycleService';

export default class MotorcycleController {
  private req: Request;
  private res: Response;
  private next: NextFunction;
  private motorcycleService: MotorcycleService;

  constructor(req: Request, res: Response, next: NextFunction) {
    this.req = req;
    this.res = res;
    this.next = next;
    this.motorcycleService = new MotorcycleService();
  }

  public async create() {
    const moto: IMotorcycle = this.req.body;
    // console.log('MOTO CONTROLLER-------------', moto);
    const createMoto = await this.motorcycleService.create(moto);
    // console.log('CREATEMOTO CONTROLLER---------', createMoto);
    return this.res.status(201).json(createMoto);
  }

  public async findAll() {
    const result = await this.motorcycleService.findAll();
    return this.res.status(result.status).json(result.response);
  }

  public async findById() {
    const { id } = this.req.params;
    try {
      const result = await this.motorcycleService.findById(id);
      return this.res.status(result.status).json(result.response);
    } catch (error) {
      this.next(error);
    }
  }

  public async findAndUpdate() {
    try {
      const { id } = this.req.params;
      const motorcycle = { ...this.req.body };
      const result = await this.motorcycleService.findAndUpdate(id, motorcycle);
      return this.res.status(result.status).json(result.response);
    } catch (error) {
      this.next(error);
    }
  }
}
