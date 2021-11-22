const path = require('path');

const sqlite3 = require('sqlite3').verbose();

const { criaTabelaUsr, criaTabelaTarefa } = require('./criaTabelas');

const caminhoArq = path.resolve('db.sqlite3');
const db = new sqlite3.Database(caminhoArq, (err) => {
  if (err) {
    console.log('Deu erro ao criar banco de dados');
    return;
  }

  console.log('Cria banco de dados SQLite em ' + caminhoArq)
});

db.serialize(() => {
  criaTabelaUsr(db);
  criaTabelaTarefa(db);
});

// Encerra conexão quando fecha o servidor.
process.on('SIGINT', () => {
  db.close(() => {
    console.log('Banco de dados encerrado!');
    process.exit(1);
  });
});

module.exports = db;
