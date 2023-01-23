import { isValidObjectId } from 'mongoose';
import Car from '../Domains/Car';
import ICar from '../Interfaces/ICar';
import CarODM from '../Models/CarODM';

export default class CarService {
  private carODM: CarODM;

  constructor() {
    this.carODM = new CarODM();
  }
  async register(car: ICar | null): Promise<Car | null> {
    if (car) {
      return new Car(car);
    }
    return null;
  }
  public async create(car: ICar) {
    const newCar = await this.carODM.create(car);
    return this.register(newCar);
  }

  public async findAll() {
    const getCar = await this.carODM.findAll();
    console.log('GET CAR ------', getCar);
    
    const cars = getCar.map((car) => new Car(car));
    console.log('CARSSSS------', cars);
    
    return { status: 200, response: cars };
  }

  public async findById(id: string) {
    if (!isValidObjectId(id)) {
      return {
        status: 422,
        response: { message: 'Invalid mongo id' },
      };
    }
    const getCar = await this.carODM.findById(id);
    const car = await this.register(getCar);
    // console.log('GET CAR-------------', car);

    if (car === null) {
      return {
        status: 404,
        response: { message: 'Car not found' },
      };
    }
    return {
      status: 200,
      response: car,
    };
  }
}