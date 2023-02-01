import { expect } from 'chai';
import { Model } from 'mongoose';
import sinon from 'sinon';

import ICar from '../../../src/Interfaces/ICar';
import CarService from '../../../src/Services/CarService';

const mock: ICar = {
  id: '63c3016f5c14236ed6cfa1c2',
  model: 'x1',
  year: 2023,
  color: 'red velvet',
  status: true,
  buyValue: 300.000,
  doorsQty: 4,
  seatsQty: 5,
};

const updatedCarMock: ICar = {
  model: 'x6',
  year: 2023,
  color: 'blue ocean',
  status: true,
  buyValue: 700.000,
  doorsQty: 4,
  seatsQty: 5,
};

describe('Car.Service', function () {
  it('should create new car', async function () {
    const input: ICar = mock;
    const output: ICar = { ...mock, id: '1' };

    sinon.stub(Model, 'create').resolves(output);
    const carService = new CarService();
    const createdCar = await carService.create(input);
    expect(createdCar).to.be.deep.equal(output);
  });

  it('should find specific car', async function () {
    const output: ICar = { ...mock, id: '63c3016f5c14236ed6cfa1c2' };
    sinon.stub(Model, 'findById').resolves(output);
    const carsService = new CarService();
    const carById = await carsService.findById('63c3016f5c14236ed6cfa1c2');
    expect(carById).to.be.deep.equal({ status: 200, response: output });
  });

  it('should find all cars', async function () {
    const output: ICar = { ...mock, id: '63c3016f5c14236ed6cfa1c2' };
    sinon.stub(Model, 'find').resolves([output]);
    const carsService = new CarService();
    const allCars = await carsService.findAll();
    expect(allCars).to.be.deep.equal({ status: 200, response: [output] });
  });

  it('should update specific car', async function () {
    const output: ICar = { ...updatedCarMock, id: '63c3016f5c14236ed6cfa1c2' };

    sinon.stub(Model, 'findByIdAndUpdate').resolves(output);
    const carsService = new CarService();
    const updatedCar = await carsService.findAndUpdate('63c3016f5c14236ed6cfa1c2', output);
    expect(updatedCar).to.be.deep.equal({ status: 200, response: output });
  });

  it('should NOT update specific car when id is invalid', async function () {
    const output: ICar = { ...updatedCarMock, id: '63c3016f5c14236ed6cfa1c2' };

    const carsService = new CarService();
    const updatedCar = await carsService.findAndUpdate('', output);
    expect(updatedCar).to.be.deep.equal({ status: 422, response: { message: 'Invalid mongo id' } });
  });

  it('should not update when id is invalid', async function () {
    const input: ICar = mock;

    sinon.stub(Model, 'findByIdAndUpdate').resolves({ message: 'Car not found' });
    const carsService = new CarService();
    const invalidId = await carsService.findAndUpdate('63c3013f5c14236s24cfa1c2', input);
    expect(invalidId).to.be.deep.equal({ status: 422, response: { message: 'Invalid mongo id' } });
  });

  it('register must fail', async function () {
    const carsService = new CarService();
    const register = await carsService.register(null);
    expect(register).to.be.deep.equal(null);
  });

  // it('register must fail and car must not be found', async function () {
  //   // const output: ICar = { ...updatedCarMock, id: '63c3016f5c14236ed6cfa1c2' };

  //   sinon.stub(Model, 'findById').resolves({ message: 'Car not found' });
  //   const carsService = new CarService();
  //   await carsService.register(null);
  //   const notFoundCar = await carsService.findById('63c3016f5c14236ed6cfa1c2');
  //   expect(notFoundCar).to.be.deep.equal({ status: 404, response: { message: 'Car not found' } });
  // });

  afterEach(function () {
    sinon.restore();
  });
});