const schemas = require('./schemas');

function criaTabelaUsr(db) {
  db.run(schemas.USUARIO_SCHEMA, (err) => {
    if (err) {
      console.log('Erro ao criar tabela de usuários');
      return;
    }

    console.log('Tabela de usuários criada (ou já existe) com sucesso!');
  });
}

function criaTabelaTarefa(db) {
  db.run(schemas.TAREFA_SCHEMA, (err) => {
    if (err) {
      console.log("Erro ao criar tabela de Tarefas");
      return;
    }

    console.log('Tabela de tarefas criada (ou já existe) com sucesso!');
  });
}

module.exports = {
  criaTabelaUsr,
  criaTabelaTarefa,
}
