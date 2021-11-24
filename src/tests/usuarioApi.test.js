const request = require('supertest');

const customExpress = require('../config/customExpress');
const app = customExpress();

describe('Testa rota para buscar todos usuários', () => {
  test('Retorna status 200', async () => {
    const res = await request(app).get('/api/usuarios');
    expect(res.statusCode).toBe(200);
  });
});
