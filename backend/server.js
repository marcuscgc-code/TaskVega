const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { Pool } = require('pg');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Configuração do pool de conexões
const pool = new Pool({
    user: 'postgres', // Usuário do PostgreSQL
    host: 'localhost', // Endereço do servidor
    database: 'gerenciador_tarefas', // Nome do banco de dados
    password: 'hoot', // Senha do PostgreSQL
    port: 5432, // Porta padrão do PostgreSQL
});

// Rota principal
app.get('/', (req, res) => res.send('Servidor rodando! 🚀'));

// Rota de Login
app.post('/api/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const result = await pool.query(
            'SELECT * FROM usuarios WHERE email = $1 AND senha = $2',
            [email, password]
        );

        if (result.rows.length > 0) {
            return res.status(200).json({
                message: 'Login bem-sucedido!',
                user: result.rows[0]
            });
        } else {
            return res.status(401).json({ message: 'Credenciais inválidas' });
        }
    } catch (err) {
        console.error('Erro ao consultar o banco de dados:', err);
        return res.status(500).json({ message: 'Erro no servidor' });
    }
});

// Rota para listar todas as tarefas de um usuário
app.get('/api/tarefas/:usuario_id', async (req, res) => {
    const { usuario_id } = req.params;

    try {
        const result = await pool.query(
            'SELECT * FROM tarefas WHERE usuario_id = $1',
            [usuario_id]
        );
        res.status(200).json(result.rows);
    } catch (err) {
        console.error('Erro ao listar tarefas:', err);
        res.status(500).json({ message: 'Erro no servidor' });
    }
});

// Rota para criar uma tarefa
app.post('/api/tarefas', async (req, res) => {
    const { usuario_id, nome, descricao, data_prazo, prioridade } = req.body;

    try {
        const result = await pool.query(
            'INSERT INTO tarefas (usuario_id, nome, descricao, data_prazo, prioridade) VALUES ($1, $2, $3, $4, $5) RETURNING *',
            [usuario_id, nome, descricao, data_prazo, prioridade]
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        console.error('Erro ao criar tarefa:', err);
        res.status(500).json({ message: 'Erro no servidor' });
    }
});

// Rota para listar todas as mini tarefas de uma tarefa
app.get('/api/mini-tarefas/:tarefa_id', async (req, res) => {
    const { tarefa_id } = req.params;

    try {
        const result = await pool.query(
            'SELECT * FROM mini_tarefas WHERE tarefa_id = $1',
            [tarefa_id]
        );
        res.status(200).json(result.rows);
    } catch (err) {
        console.error('Erro ao listar mini tarefas:', err);
        res.status(500).json({ message: 'Erro no servidor' });
    }
});

// Rota para criar uma mini tarefa
app.post('/api/mini-tarefas', async (req, res) => {
    const { tarefa_id, descricao } = req.body;

    try {
        const result = await pool.query(
            'INSERT INTO mini_tarefas (tarefa_id, descricao) VALUES ($1, $2) RETURNING *',
            [tarefa_id, descricao]
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        console.error('Erro ao criar mini tarefa:', err);
        res.status(500).json({ message: 'Erro no servidor' });
    }
});

// Rota para listar todos os anexos de uma tarefa
app.get('/api/anexos/:tarefa_id', async (req, res) => {
    const { tarefa_id } = req.params;

    try {
        const result = await pool.query(
            'SELECT * FROM anexos WHERE tarefa_id = $1',
            [tarefa_id]
        );
        res.status(200).json(result.rows);
    } catch (err) {
        console.error('Erro ao listar anexos:', err);
        res.status(500).json({ message: 'Erro no servidor' });
    }
});

// Rota para criar um anexo
app.post('/api/anexos', async (req, res) => {
    const { tarefa_id, caminho_arquivo, url_arquivo } = req.body;

    try {
        const result = await pool.query(
            'INSERT INTO anexos (tarefa_id, caminho_arquivo, url_arquivo) VALUES ($1, $2, $3) RETURNING *',
            [tarefa_id, caminho_arquivo, url_arquivo]
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        console.error('Erro ao criar anexo:', err);
        res.status(500).json({ message: 'Erro no servidor' });
    }
});

// Inicialização do servidor
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));