const md5 = require('md5');

class Usuario {
  static id = 1;

  constructor(nome, email, senha) {
    this._verificaDados(nome, email, senha);

    this.id = Usuario.id++;
    this.nome = nome;
    this.email = email;
    this.senha = this._criptografaSenha(senha);
  }

  _verificaDados(nome, email, senha) {
    if (!nome || nome.length > 100) {
      throw new Error('O nome é obrigatório e precisa ter no máximo 100 caracteres');
    }

    if (!email || email.length > 100) {
      throw new Error('O email é obrigatório e precisa ter no máximo 100 caracteres');
    }

    if (!senha || senha.length < 6) {
      throw new Error('A senha é obrigatória e precisa ter pelo menos 6 caracteres');
    }
  }

  _criptografaSenha(senha) {
    return md5(senha);
  }
}

module.exports = Usuario;
