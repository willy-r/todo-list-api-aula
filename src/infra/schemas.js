// Usuários
const USUARIO_SCHEMA = `
  CREATE TABLE IF NOT EXISTS usuario (
    id_usuario INTEGER PRIMARY KEY AUTOINCREMENT,
    nome varchar(100),
    email varchar(100) UNIQUE,
    senha varchar(255)
  );
`;

// Tarefas
const TAREFA_SCHEMA = `
  CREATE TABLE IF NOT EXISTS tarefa (
    id_tarefa INTEGER PRIMARY KEY AUTOINCREMENT, 
    titulo VARCHAR(64),
    descricao TEXT,
    status VARCHAR(32),
    data_criacao VARCHAR(32),
    id_usuario INTEGER,
    FOREIGN KEY (id_usuario) REFERENCES usuario (id_usuario)
  );
`;

module.exports = {
  USUARIO_SCHEMA,
  TAREFA_SCHEMA,
};
