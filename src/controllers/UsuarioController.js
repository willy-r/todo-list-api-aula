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
  
  app.get('/api/usuario/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const usuario = db.usuario.filter((usuario) => usuario.id === id);
    
    if (!usuario.length) {
      res.json({
        erro: true,
        msg: 'Usuário não encontrado',
      });
      return;
    }

    res.json({
      erro: false,
      usuario: usuario[0],
    });
  });

  app.get('/api/usuario/email/:email', (req, res) => {
    const email = req.params.email;
    const usuario = db.usuario.filter((usuario) => usuario.email === email);
    
    if (!usuario.length) {
      res.json({
        erro: true,
        msg: 'Usuário não encontrado',
      });
      return;
    }

    res.json({
      erro: false,
      usuario: usuario[0],
    });
  });

  app.post('/api/usuario', (req, res) => {
    const body = req.body;

    try {
      const usuario = new Usuario(body.nome, body.email, body.senha);
      
      // Adiciona no banco de dados.
      db.usuario.push(usuario);
      
      res.json({
        erro: false,
        usuarioCadastrado: usuario,
      });
    } catch (err) {
      res.json({
        erro: true,
        msg: err.message,
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

  app.delete('/api/usuario/:email', (req, res) => {
    const email = req.params.email;

    // Pega o index do usuário no banco de dados.
    // https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Array/findIndex
    const indexUsuario = db.usuario.findIndex((usuario) => usuario.email === email);
    
    if (indexUsuario === -1) {
      res.json({
        erro: true,
        msg: 'Usuário não encontrado',
      });
      return;
    }

    // Remove usuário do banco de dados.
    // https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Array/splice
    const usuarioRemovido = db.usuario.splice(indexUsuario, 1);
    
    res.json({
      erro: false,
      usuarioRemovido: usuarioRemovido[0],
    });
  });
}

module.exports = UsuarioController;
