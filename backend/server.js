const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Usuário fixo para teste
const fakeUser = {
    email: 'teste@exemplo.com',
    password: '123456'
};

// Rota principal
app.get('/', (req, res) => res.send('Servidor rodando! 🚀'));

// Rota de Login
app.post('/api/login', (req, res) => {
    const { email, password } = req.body;

    if (email === fakeUser.email && password === fakeUser.password) {
        return res.status(200).json({
            message: 'Login bem-sucedido!',
            user: { email }
        });
    } else {
        return res.status(401).json({ message: 'Credenciais inválidas' });
    }
});

// Inicialização do servidor
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
