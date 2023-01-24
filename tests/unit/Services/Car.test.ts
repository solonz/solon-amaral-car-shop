import { expect } from 'chai';
import { Model } from 'mongoose';
import Sinon from 'sinon';

import ICar from '../../../src/Interfaces/ICar';
import CarService from '../../../src/Services/CarService';

const mock: ICar = {
  model: 'x1',
  year: 2023,
  color: 'red velvet',
  status: true,
  buyValue: 300.000,
  doorsQty: 4,
  seatsQty: 5,
};

describe('Teste rota Car', function () {
  it('Cria novo carro', async function () {
    const input: ICar = mock;
    const output: ICar = { ...mock, id: '1' };

    Sinon.stub(Model, 'create').resolves(output);
    const carService = new CarService();
    const createdCar = await carService.create(input);
    expect(createdCar).to.be.deep.equal(output);

    Sinon.stub(Model, 'find').resolves([output]);
    const carsService = new CarService();
    const allCars = await carsService.findAll();
    expect(allCars).to.be.deep.equal({ status: 200, message: [output] });
  });
});