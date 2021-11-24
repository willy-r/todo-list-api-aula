const customExpress = require('./config/customExpress');

const app = customExpress(false);
const PORT = 3000;

// Iniciando o servidor na porta designada.
app.listen(PORT, () => console.log(`Servidor rodando: http://localhost:${PORT}/`));
