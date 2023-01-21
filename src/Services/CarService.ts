import Car from '../Domains/Car';
import ICar from '../Interfaces/ICar';
import CarODM from '../Models/CarODM';

export default class CarService {
  async register(car: ICar) {
    return new Car(car); 
  }

  public async create(car: ICar) {
    const carODM = new CarODM();
    console.log('CARODM-----------', carODM);
    
    const newCar = await carODM.create(car);
    console.log('NEWCAR-----------', newCar);
    
    return this.register(newCar);
  }
}
