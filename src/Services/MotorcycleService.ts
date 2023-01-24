import { isValidObjectId } from 'mongoose';
import Motorcycle from '../Domains/Motorcycle';
import IMotorcycle from '../Interfaces/IMotorcycle';
import MotorcycleODM from '../Models/MotorcycleODM';

export default class MotorcycleService {
  private MotorcycleODM: MotorcycleODM;

  constructor() {
    this.MotorcycleODM = new MotorcycleODM();
  }

  private register(moto: IMotorcycle | null) {
    if (moto) {
      return new Motorcycle(moto);
    }
    return null;
  }

  public async create(moto: IMotorcycle) {
    const motorcycle = await this.MotorcycleODM.create(moto);
    console.log('MOTORCYCLE SERVICE--------', motorcycle);
    
    return this.register(motorcycle);
    // if (!criar) {
    //   return { 
    //     status: 404,
    //     response: 'faio',
    //   };
    //   return {
    //     status: 201,
    //     response: criar,
    //   };
    // }
  }

  public async findAll() {
    const getMoto = await this.MotorcycleODM.findAll();
    console.log('GET MOTOSSSS ------', getMoto);
    
    const motos = getMoto.map((moto) => this.register(moto));
    console.log('MOTOSSSSSS------', motos);
    
    return { status: 200, response: motos };
  }

  public async findById(id: string) {
    if (!isValidObjectId(id)) {
      return {
        status: 422,
        response: { message: 'Invalid mongo id' },
      };
    }
    const getMoto = await this.MotorcycleODM.findById(id);
    const moto = this.register(getMoto);
    // console.log('GET CAR-------------', car);

    if (moto === null || getMoto === null) {
      return {
        status: 404,
        response: { message: 'Motorcycle not found' },
      };
    }
    return {
      status: 200,
      response: moto,
    };
  }
}