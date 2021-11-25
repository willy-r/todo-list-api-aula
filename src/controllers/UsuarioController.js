const md5 = require('md5');

const Usuario = require('../models/Usuario');
const UsuarioDAO = require('../DAO/UsuarioDAO');

const UsuarioController = (app, db) => {
  const DAO = new UsuarioDAO(db);

  app.get('/api/usuarios', async (_, res) => {
    try {
      const usuarios = await DAO.listaUsuarios();
      
      res.json({
        erro: false,
        usuarios: usuarios,
      });
    } catch (err) {
      res.json({
        erro: true,
        msg: err,
      });
    }
  });
  
  app.get('/api/usuario/:id', async (req, res) => {
    const id = parseInt(req.params.id);

    try {
      const usuario = await DAO.buscaUsuarioPorId(id);

      res.json({
        erro: false,
        usuario: usuario,
      });
    } catch (err) {
      res.json({
        erro: true,
        msg: err,
      });
    }
  });

  app.post('/api/usuario', async (req, res) => {
    const body = req.body;

    try {
      const usuario = new Usuario(body.nome, body.email, body.senha);
      const infoUsuarioCriado = await DAO.criaUsuario(usuario);
      
      res.json({
        erro: false,
        info: infoUsuarioCriado,
      });
    } catch (err) {
      res.json({
        erro: true,
        msg: err,
      });
    }
  });

  app.patch('/api/usuario/:email', (req, res) => {
    const email = req.params.email;
    const indexUsuario = db.usuario.findIndex((usuario) => usuario.email === email);

    if (indexUsuario === -1) {
      res.json({
        erro: true,
        msg: 'Usuário não encontrado',
      });
      return;
    }

    // Atualiza dados do usuário, pois ele existe.
    const body = req.body;
    const usuario = db.usuario[indexUsuario];
    const usuarioAtualizado = {
      nome: body.nome ? body.nome : usuario.nome,
      email: body.email ? body.email : usuario.email,
      senha: body.senha ? md5(body.senha) : usuario.senha,
    };

    db.usuario[indexUsuario] = usuarioAtualizado;

    res.json({
      erro: false,
      dadosAtualizados: usuarioAtualizado,
    });
  });

  app.delete('/api/usuario/:id', async (req, res) => {
    const id = parseInt(req.params.id);

    try {
      const infoUsuarioDeletado = await DAO.deletaUsuario(id);

      res.status(200).json({
        erro: false,
        info: infoUsuarioDeletado,
      });
    } catch (err) {
      res.status(err.statusCode).json({
        erro: true,
        msg: err.message,
      });
    }
  });
}

module.exports = UsuarioController;
