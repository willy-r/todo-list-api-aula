const express = require('express');
const consign = require('consign');

const db = require('../infra/dbMockado');

const customExpress = () => {
  const app = express();
  
  // Middlewares.
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Rotas.
  consign().include('./src/controllers').into(app, db);

  return app;
}

module.exports = customExpress;