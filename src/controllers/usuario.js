const knex = require('../conexao');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');

const cadastrarUsuario = async (req, res) => {
    const { nome, email, senha } = req.body;

    if (!nome || !email || !senha) {
        return res.status(400).json({ mensagem: 'Os campos nome, email e senha são obrigatórios' });
    }

    try {
        const emailExiste = await knex('usuarios').where({ email }).first();
        if (emailExiste) {
            return res.status(400).json({ mensagem: 'Email já existe' });
        }

        const senhaCriptografada = await bcrypt.hash(senha, 10);
        const [novoUsuario] = await knex('usuarios')
            .insert({ nome, email, senha: senhaCriptografada })
            .returning(['id', 'nome', 'email']);

        return res.status(201).json(novoUsuario);

    } catch (error) {
        console.error('Erro interno do servidor:', error);
        return res.status(500).json({ mensagem: 'Erro interno do Servidor' });
    }
};

const login = async (req, res) => {
    const { email, senha } = req.body;

    if (!email || !senha) {
        return res.status(400).json({ mensagem: 'Os campos email e senha são obrigatórios' });
    }

    try {
        const usuario = await knex('usuarios').where({ email }).first();
        if (!usuario) {
            return res.status(400).json({ mensagem: 'Email ou senha inválido' });
        }

        const senhaCorreta = await bcrypt.compare(senha, usuario.senha);
        if (!senhaCorreta) {
            return res.status(400).json({ mensagem: 'Email ou senha inválido' });
        }

        const token = jwt.sign({ id: usuario.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        return res.status(200).json({ token });

    } catch (error) {
        console.error('Erro interno do servidor:', error);
        return res.status(500).json({ mensagem: 'Erro interno do Servidor' });
    }
};

const redefinirSenha = async (req, res) => {
    const { email, senhaAntiga, senhaNova } = req.body;

    if (!email || !senhaAntiga || !senhaNova) {
        return res.status(400).json({ mensagem: 'Os campos email, senha_antiga e senha_nova são obrigatórios' });
    }

    if (senhaAntiga === senhaNova) {
        return res.status(400).json({ mensagem: 'A nova senha não pode ser igual à senha antiga.' });
    }

    try {
        const usuario = await knex('usuarios').where({ email }).first();
        if (!usuario) {
            return res.status(400).json({ mensagem: 'Email ou senha antiga inválidos.' });
        }

        const senhaCorreta = await bcrypt.compare(senhaAntiga, usuario.senha);
        if (!senhaCorreta) {
            return res.status(400).json({ mensagem: 'Email ou senha antiga inválidos.' });
        }

        const senhaCriptografada = await bcrypt.hash(senhaNova, 10);
        await knex('usuarios').where({ email }).update({ senha: senhaCriptografada });

        // Enviar email notificando a alteração de senha
        const transportador = nodemailer.createTransport({
            host: process.env.MAIL_HOST,
            port: process.env.MAIL_PORT,
            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASS,
            },
        });

        const envioEmailConfig = {
            from: process.env.MAIL_FROM,
            to: email,
            subject: 'Senha alterada',
            text: 'Sua senha foi alterada com sucesso.',
        };

        transportador.sendMail(envioEmailConfig, (error, info) => {
            if (error) {
                console.error('Erro ao enviar email:', error);
            } else {
                console.log('Email enviado:', info.response);
            }
        });

        return res.status(200).json({ mensagem: 'Senha alterada com sucesso.' });
    } catch (error) {
        console.error('Erro interno do servidor:', error);
        return res.status(500).json({ mensagem: 'Erro interno do Servidor' });
    }
};

const obterPerfil = async (req, res) => {
    return res.status(200).json(req.usuario);
};

const atualizarPerfil = async (req, res) => {
    const { nome, email, senha } = req.body;

    if (!nome || !email || !senha) {
        return res.status(400).json({ mensagem: 'Os campos nome, email e senha são obrigatórios.' });
    }

    if (senha && senha.length < 6) {
        return res.status(400).json({ mensagem: 'A senha deve ter no mínimo 6 caracteres.' });
    }

    try {
        const usuarioAtualizado = {
            nome,
            email,
        };

        //Faz a criptografia antes de atualizar. Não tenho certeza se seria necessario um if para que isso funcione adequadamente
        const senhaCriptografada = await bcrypt.hash(senha, 10);
        usuarioAtualizado.senha = senhaCriptografada;

        const emailExiste = await knex('usuarios').where({ email }).andWhere('id', '!=', req.usuario.id).first();
        if (emailExiste) {
            return res.status(400).json({ mensagem: 'Email já existe' });
        }

        // Atualiza o usuário no banco de dados
        await knex('usuarios').where({ id: req.usuario.id }).update(usuarioAtualizado);

        return res.status(200).json({ mensagem: 'Usuário atualizado com sucesso.' });
    } catch (error) {
        console.error('Erro interno do servidor:', error);
        return res.status(500).json({ mensagem: 'Erro interno do Servidor' });
    }
};

module.exports = {
    cadastrarUsuario,
    login,
    redefinirSenha,
    obterPerfil,
    atualizarPerfil
};