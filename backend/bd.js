const { Pool } = require('pg');

// Configuração da conexão com o PostgreSQL
const pool = new Pool({
    user: 'postgres',        // Usuário do PostgreSQL
    host: 'localhost',       // Endereço do servidor
    database: 'gerenciador_tarefas', // Nome do banco de dados
    password: 'hoot',   // Senha do PostgreSQL
    port: 5432,              // Porta padrão do PostgreSQL
});

module.exports = pool;