const express = require("express");
const { listarCategoria } = require("./controllers/categorias");
const { cadastrarUsuario, login, redefinirSenha, obterPerfil, atualizarPerfil } = require("./controllers/usuario");
const verificaLogin = require("./middlewares/verificaLogin");

const rotas = express()

rotas.get('/categorias', listarCategoria)
rotas.post('/usuario', cadastrarUsuario)
rotas.post('/login', login)
rotas.patch('/usuario/redefinir', redefinirSenha);
rotas.use(verificaLogin);
rotas.get('/usuario/perfil', obterPerfil)
rotas.put('/usuario/perfil', atualizarPerfil)


module.exports = rotas;