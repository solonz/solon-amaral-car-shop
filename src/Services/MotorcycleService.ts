import Motorcycle from '../Domains/Motorcycle';
import IMotorcycle from '../Interfaces/IMotorcycle';
import MotorcycleODM from '../Models/MotorcycleODM';

export default class MotorcycleService {
  private MotorcycleODM: MotorcycleODM;

  constructor() {
    this.MotorcycleODM = new MotorcycleODM();
  }

  register(moto: IMotorcycle): Motorcycle | null {
    return new Motorcycle(moto);
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
}