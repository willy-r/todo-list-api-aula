const schemas = require('./schemas');

function criaTabelaUsr(db) {
  db.run(schemas.USUARIOS_SCHEMA, (err) => {
    if (err) {
      console.log('Erro ao criar tabela de usuários');
      return;
    }

    console.log('Tabela de usuários criada (ou já existe) com sucesso!');
  });
}

function criaTabelaTarefas(db) {
  db.run(schemas.TAREFAS_SCHEMA, (err) => {
    if (err) {
      console.log("Erro ao criar tabela de Tarefas");
      return;
    }

    console.log('Tabela de tarefas criada (ou já existe) com sucesso!');
  });
}

module.exports = {
  criaTabelaUsr,
  criaTabelaTarefas,
}
