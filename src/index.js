const {port} = require('./config');
const express = require('express');
const knex = require('./conexao');
const rotas = require('./rotas');

const app = express();

app.use(express.json());
app.use(rotas);

app.listen(port, () => {
    console.log('Servidor rodando em ' + port)
});