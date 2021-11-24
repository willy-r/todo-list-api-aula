const express = require('express');
const consign = require('consign');
const cors = require('cors');

// Banco de dados mockado usado para atividades em aula.
// const db = require('../infra/dbMockado');

const criaDB = require('../infra/dbConexao');

const customExpress = (caminhoDB) => {
  const app = express();
  
  // Middlewares.
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Banco de dados.
  const db = criaDB(caminhoDB);

  // Rotas.
  consign().include('./src/controllers').into(app, db);

  return app;
}

module.exports = customExpress;
