// Usuários
const USUARIOS_SCHEMA = `
  CREATE TABLE IF NOT EXISTS USUARIOS (
    ID INTEGER PRIMARY KEY AUTOINCREMENT,
    NOME varchar(64),
    EMAIL varchar(64),
    SENHA varchar(64)
  );
`;

// Tarefas
const TAREFAS_SCHEMA = `
  CREATE TABLE IF NOT EXISTS TAREFAS (
    ID INTEGER PRIMARY KEY AUTOINCREMENT, 
    TITULO VARCHAR(64),
    DESCRICAO TEXT,
    STATUS VARCHAR(32),
    DATACRIACAO VARCHAR(32),
    ID_USUARIO INTEGER,
    FOREIGN KEY(ID_USUARIO) REFERENCES USUARIOD(ID)
  );
`;

module.exports = {
  USUARIOS_SCHEMA,
  TAREFAS_SCHEMA,
};