const Usuario = require('../models/Usuario');

describe('Criando novos usuários', () => {
  test('Senha de usuário menor que 6 caracteres dá erro', () => {
    expect(() => new Usuario('will', 'will@gmail.com', '12345'))
    .toThrow();
  });

  test('Cria usuário com valores que passam', () => {
    expect(new Usuario('will', 'will@gmail.com', '123456'))
    .toBeInstanceOf(Usuario);
  });
});
