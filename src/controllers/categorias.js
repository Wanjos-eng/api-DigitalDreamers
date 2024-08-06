const knex = require('../conexao');

const listarCategoria = async (req, res) => {
    try {
        const categorias = await knex('categorias');
        return res.status(200).json(categorias);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Erro na listagem de categorias" });
    }
};

module.exports = {
    listarCategoria
}