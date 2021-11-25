class UsuarioDAO {
  constructor(db) {
    this._db = db;
  }

  listaUsuarios() {
    return new Promise((resolve, reject) => {
      const query = 'SELECT * FROM usuario';

      this._db.all(query, (err, linhas) => {
        if (err) {
          reject(`Erro ao consultar banco de dados: ${err.message}`);
          return;
        }

        resolve(linhas);
      });
    });
  }

  buscaUsuarioPorId(id) {
    return new Promise((resolve, reject) => {
      const query = `
        SELECT * FROM usuario
        WHERE id_usuario = ?;
      `;

      this._db.get(query, id, (err, linha) => {
        if (err) {
          reject(`Erro ao consultar banco de dados: ${err.messsage}`);
          return;
        }

        if (!linha) {
          reject(`Usuário com ID ${id} não encontrado`);
          return;
        }

        resolve(linha);
      });
    });
  }

  criaUsuario(usuario) {
    return new Promise((resolve, reject) => {
      const query = `
        INSERT INTO usuario (nome, email, senha)
        VALUES
          (?, ?, ?)
        ;
      `;
      const params = [usuario.nome, usuario.email, usuario.senha];

      this._db.run(query, params, function(err) {
        if (err) {
          reject(err.errno === 19
                 ? 'Email já está cadastrado'
                 : `Erro ao adicionar usuário no banco de dados: ${err.message}`);
          return;
        }

        resolve({ idUsuario: this.lastID });
      });
    });  
  }

  deletaUsuario(id) {
    return new Promise((resolve, reject) => {
      const query = `
        DELETE FROM usuario
        WHERE id_usuario = ?;
      `;

      this._db.run(query, id, function(err) {
        if (err) {
          reject({
            statusCode: 500,
            message: `Erro ao deletar usuário: ${err.message}`,
          });
          return;
        }

        if (!this.changes) {
          reject({
            statusCode: 404,
            message: `Usuário com ID ${id} não encontrado`,
          });
          return;
        }

        resolve({
          deletou: this.changes,
          idUsuario: id,
        });
      });
    });
  }
}

module.exports = UsuarioDAO;
