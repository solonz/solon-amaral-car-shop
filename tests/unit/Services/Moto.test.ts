import { expect } from 'chai';
import { Model } from 'mongoose';
import sinon from 'sinon';

import IMotorcycle from '../../../src/Interfaces/IMotorcycle';
import MotorcycleService from '../../../src/Services/MotorcycleService';

const mockMoto: IMotorcycle = {
  model: 'Yahama Ninja',
  year: 2020,
  color: 'Green',
  buyValue: 90.000,
  category: 'Sport',
  engineCapacity: 1800,
};
  
const mockRegisteredMoto = {
  id: '63c447122a23bfb21569a044',
  model: 'Yahama Ninja',
  year: 2020,
  color: 'Green',
  buyValue: 90.000,
  category: 'Sport',
  engineCapacity: 1800,
  status: false,
};

// const mockUpdateMoto = {
//   model: 'Mia Marra Ninja',
//   year: 2240,
//   color: 'Green',
//   buyValue: 90,
//   category: 'Fighter',
//   engineCapacity: 11800,
// };

// const mockUpdatedMoto = {
//   id: '63c447122a23bfb21569a044',
//   model: 'Mia Marra Ninja',
//   year: 2240,
//   color: 'Green',
//   buyValue: 90,
//   category: 'Fighter',
//   engineCapacity: 11800,
//   status: false,
// };

describe('Car.Motorcycle', function () {
  it('should create new moto', async function () {
    const input: IMotorcycle = mockMoto;
    const output: IMotorcycle = mockRegisteredMoto;
  
    sinon.stub(Model, 'create').resolves(output);
    const motorcycleService = new MotorcycleService();
    const createdMoto = await motorcycleService.create(input);
    expect(createdMoto).to.be.deep.equal(output);
  });

  it('should find specific moto', async function () {
    const output: IMotorcycle = mockRegisteredMoto;
    sinon.stub(Model, 'findById').resolves(output);
    const motorcycleService = new MotorcycleService();
    const motoById = await motorcycleService.findById('63c447122a23bfb21569a044');
    expect(motoById).to.be.deep.equal({ status: 200, response: output });
  });

  it('should find all motos', async function () {
    const output: IMotorcycle = mockRegisteredMoto;
    sinon.stub(Model, 'find').resolves([output]);
    const motorcycleService = new MotorcycleService();
    const allMotos = await motorcycleService.findAll();
    expect(allMotos).to.be.deep.equal({ status: 200, response: [output] });
  });

  it('should NOT update specific moto when id is invalid', async function () {
    const output: IMotorcycle = mockRegisteredMoto;

    const motorcycleService = new MotorcycleService();
    const updatedMoto = await motorcycleService.findAndUpdate('', output);
    expect(updatedMoto)
      .to.be.deep.equal({ status: 422, response: { message: 'Invalid mongo id' } });
  });

  it('Retornar um erro de objeto não encontrado no findOne', async function () {
    sinon.stub(Model, 'findById').resolves(null);
    
    try {
      const service = new MotorcycleService();
      await service.findById('634852326b35b59438fbea2f');
    } catch (error) {
      expect((error as Error).message).equal('Motorcycle not found');
    }
  });

  afterEach(function () {
    sinon.restore();
  });
});