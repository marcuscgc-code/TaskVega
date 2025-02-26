const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { Pool } = require('pg');
const jwt = require('jsonwebtoken'); // Adicionado para JWT

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

// Rota de Cadastro
app.post('/api/cadastro', async (req, res) => {
    const { nome, email, password } = req.body;

    try {
        // Verifica se o email já está cadastrado
        const checkEmail = await pool.query(
            'SELECT * FROM usuarios WHERE email = $1',
            [email]
        );

        if (checkEmail.rows.length > 0) {
            return res.status(400).json({ message: 'Email já cadastrado' });
        }

        // Insere o novo usuário no banco de dados
        const result = await pool.query(
            'INSERT INTO usuarios (nome, email, senha) VALUES ($1, $2, $3) RETURNING *',
            [nome, email, password]
        );

        res.status(201).json({
            message: 'Cadastro bem-sucedido!',
            user: result.rows[0]
        });
    } catch (err) {
        console.error('Erro ao cadastrar usuário:', err);
        res.status(500).json({ message: 'Erro no servidor' });
    }
});

// Rota de Login
app.post('/api/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const result = await pool.query(
            'SELECT * FROM usuarios WHERE email = $1 AND senha = $2',
            [email, password]
        );

        if (result.rows.length > 0) {
            const user = result.rows[0];

            // Gera um token JWT
            const token = jwt.sign(
                { id: user.id, email: user.email }, // Dados do usuário
                'suaChaveSecreta', // Chave secreta (use uma variável de ambiente em produção)
                { expiresIn: '1h' } // Tempo de expiração do token
            );

            return res.status(200).json({
                message: 'Login bem-sucedido!',
                token, // Envia o token para o frontend
                user: { id: user.id, nome: user.nome, email: user.email } // Dados do usuário
            });
        } else {
            return res.status(401).json({ message: 'Credenciais inválidas' });
        }
    } catch (err) {
        console.error('Erro ao consultar o banco de dados:', err);
        return res.status(500).json({ message: 'Erro no servidor' });
    }
});

// Middleware para verificar o token JWT
const verificarToken = (req, res, next) => {
    const token = req.headers['authorization'];

    if (!token) {
        return res.status(403).json({ message: 'Token não fornecido' });
    }

    jwt.verify(token, 'suaChaveSecreta', (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'Token inválido' });
        }

        req.userId = decoded.id; // Adiciona o ID do usuário à requisição
        next();
    });
};

// Rota para criar uma tarefa (protegida pelo middleware)
app.post('/api/tarefas', verificarToken, async (req, res) => {
    const { nome, descricao, data_prazo, prioridade } = req.body;
    const usuario_id = req.userId; // ID do usuário extraído do token

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

// Rota para listar todas as tarefas de um usuário (protegida pelo middleware)
app.get('/api/tarefas', verificarToken, async (req, res) => {
    const usuario_id = req.userId; // ID do usuário extraído do token

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

// Inicialização do servidor
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));