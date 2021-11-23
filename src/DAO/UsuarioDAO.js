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
          reject(`Erro ao adicionar usuário no banco de dados: ${err.message}`);
          return;
        }

        resolve({ idUsuario: this.lastID });
      });
    });  
  }
}

module.exports = UsuarioDAO;
