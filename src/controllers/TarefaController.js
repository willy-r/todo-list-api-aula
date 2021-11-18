const Tarefa = require('../models/Tarefa');

const TarefaController = (app, db) => {
  app.get('/api/tarefas', (_, res) => {
    res.status(200).json({ tarefas: db.tarefa });
  });

  app.get('/api/tarefa/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const tarefa = db.tarefa.filter((tarefa) => tarefa.id === id);
    
    if (!tarefa.length) {
      res.status(404).json({
        erro: true,
        msg: 'Tarefa não encontrada',
      });
      return;
    }

    res.status(200).json({
      erro: false,
      tarefa: tarefa[0],
    });
  });

  app.post('/api/tarefa', (req, res) => {
    const body = req.body;

    try {
      const tarefa = new Tarefa(body.titulo, body.descricao, body.status, body.id_usuario);

      // Adiciona tarefa no banco de dados.
      db.tarefa.push(tarefa);
      
      res.json({
        erro: false,
        tarefa: tarefa,
      });
    } catch (err) {
      res.json({
        erro: true,
        msg: err.message,
      });
    }
  });
}

module.exports = TarefaController;
