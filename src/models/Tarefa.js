const dayjs = require('dayjs');

const db = require('../infra/dbMockado');

class Tarefa {
  static id = 1;

  constructor(titulo, descricao, status, idUsuario) {
    this._verificaDados(titulo, status, idUsuario);
    
    this.id = Tarefa.id++;
    this.titulo = titulo;
    this.descricao = this._validaDescricao(descricao);
    this.dataCriacao = this._defineDataCriacao();
    this.status = status;
    this.idUsuario = idUsuario;
  }

  _verificaDados(titulo, status, idUsuario) {
    if (!titulo || titulo.length > 255) {
      throw new Error('O título é obrigatório e precisa ter no máximo 255 caracteres');
    }

    if (typeof status === 'undefined') {
      throw new Error('O status é obrigatório');
    } else {
      // 0 = fazendo, 1 = feito, 2 = a fazer
      const statusValidos = [0, 1, 2];

      if (!statusValidos.includes(status)) {
        throw new Error('O status dever ser igual a: 0, 1 ou 2, consulte a documentação');
      }
    }

    if (!idUsuario) {
      throw new Error('O ID do usuário é obrigatório');
    } else {
      const usuarioExiste = db.usuario.some((usuario) => usuario.id === idUsuario);

      if (!usuarioExiste) {
        throw new Error(`Usuário com ID ${idUsuario} não encontrado`);
      }
    }
  }

  _validaDescricao(descricao) {
    return descricao ? descricao : '';
  }

  _defineDataCriacao() {
    return dayjs().format('YYYY-DD-MM HH:mm:ss');
  }
}

module.exports = Tarefa;
