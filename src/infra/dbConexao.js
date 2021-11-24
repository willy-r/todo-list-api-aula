const path = require('path');

const sqlite3 = require('sqlite3').verbose();

const { criaTabelaUsr, criaTabelaTarefa } = require('./criaTabelas');

const criaDB = (teste) => {
  let caminhoArq = 'db.sqlite3';
  
  if (teste) {
    caminhoArq = 'test.db.sqlite3';
  }
  
  const caminhoArqAbs = path.resolve(caminhoArq);
  const db = new sqlite3.Database(caminhoArqAbs, (err) => {
    if (err) {
      console.log('Deu erro ao criar banco de dados');
      return;
    }

    console.log('Cria banco de dados SQLite em ' + caminhoArqAbs);
  });

  // Cria as tabelas se não existirem.
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

  return db;
}

module.exports = criaDB;
