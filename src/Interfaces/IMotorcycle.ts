import { IVehicle } from './IVehicle';

export interface IMotorcycle extends IVehicle {
  category: string, 
  engineCapacity: number, 
}