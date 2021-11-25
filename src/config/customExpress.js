const express = require('express');
const consign = require('consign');
const cors = require('cors');

// Banco de dados mockado usado para atividades em aula.
// const db = require('../infra/dbMockado');

const criaDB = require('../infra/dbConexao');

const customExpress = (taTestando) => {
  const app = express();
  
  // Middlewares.
  app.use(cors()); // Habilita CORS para todas as requisições de todas as origens.
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Banco de dados.
  const db = criaDB(taTestando);

  // Rotas.
  consign().include('./src/controllers').into(app, db);

  return app;
}

module.exports = customExpress;
