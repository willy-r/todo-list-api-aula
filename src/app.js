const customExpress = require('./config/customExpress');
const criaDB = require('./infra/dbConexao');

const caminhoArqRel = 'db.sqlite3';
const db = criaDB(caminhoArqRel);

const app = customExpress(db);
const PORT = 3000;

// Iniciando o servidor na porta designada.
app.listen(PORT, () => console.log(`Servidor rodando: http://localhost:${PORT}/`));
