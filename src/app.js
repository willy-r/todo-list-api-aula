const customExpress = require('./config/customExpress');
const criaDB = require('./infra/dbConexao');

const { criaTabelaUsr, criaTabelaTarefa } = require('./infra/criaTabelas');

const caminhoArqRel = 'db.sqlite3';
const db = criaDB(caminhoArqRel);

db.serialize(() => {
  criaTabelaUsr(db);
  criaTabelaTarefa(db);
});

const app = customExpress(db);
const PORT = 3000;

// Iniciando o servidor na porta designada.
app.listen(PORT, () => console.log(`Servidor rodando: http://localhost:${PORT}/`));
