class UsuarioDAO {
  constructor(db) {
    this._db = db;
  }

  listaUsuarios() {
    return new Promise((resolve, reject) => {
      const query = 'SELECT * FROM USUARIOS';

      this._db.all(query, (err, linhas) => {
        if (err) {
          reject('Erro ao consultar banco de dados');
          return;
        }

        resolve(linhas);
      });
    });
  }
}

module.exports = UsuarioDAO;
