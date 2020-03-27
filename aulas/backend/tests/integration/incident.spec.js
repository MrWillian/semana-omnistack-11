const request = require('supertest');
const app = require('../../src/app');
const connection = require('../../src/database/connection');
const generateUniqueId = require('../../src/utils/generateUniqueId');

describe('Incident', () => {
  
  beforeEach(async () => {
    await connection.migrate.rollback();
    await connection.migrate.latest();
  });

  afterAll(async () => {
    await connection.destroy();
  });

  it('should be able to create a new Incident', async () => {
    const id = generateUniqueId();

    const ong = {
      id: id,
      name: 'ONG de Teste',
      email: 'teste@ong.com.br',
      whatsapp: '77977995994',
      city: 'Rio de Janeiro',
      uf: 'RJ'
    };

    await connection('ongs').insert(ong);

    const response = await request(app).post('/incidents').set('Authorization', id).send({
      title: "test",
      description: "Case of test",
      value: "190",
    });

    expect(response.body).toHaveProperty('id');
  });
});
