import { expect } from 'chai';
import { Model } from 'mongoose';
import Sinon from 'sinon';

import IMotorcycle from '../../../src/Interfaces/IMotorcycle';
import MotorcycleService from '../../../src/Services/MotorcycleService';

const mock: IMotorcycle = {
  model: 'Honda Biz',
  year: 2002,
  color: 'yellow',
  status: true,
  buyValue: 2.350,
  category: 'Custom',
  engineCapacity: 1,
};

describe('Teste rota Car', function () {
  it('Cria nova moto', async function () {
    const input: IMotorcycle = mock;
    const output: IMotorcycle = { ...mock, id: '1' };

    Sinon.stub(Model, 'create').resolves(output);
    const motoService = new MotorcycleService();
    const createdMoto = await motoService.create(input);
    expect(createdMoto).to.be.deep.equal(output);

    Sinon.stub(Model, 'find').resolves([output]);
    const motosService = new MotorcycleService();
    const allMotos = await motosService.findAll();
    expect(allMotos).to.be.deep.equal({ status: 200, message: [output] });
  });
});