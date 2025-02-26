import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Login } from './components/Login';
import { Controle } from './components/Controle';
import { Notificacoes } from './components/Notificacao';
import { Criacao } from './components/Criacao';
import { Desafio } from './components/Desafios';
import { Visao } from './components/Visao';
import { Cadastro } from './components/Cadastro';
function App() {
    return (
        <Router>
            <Routes>
                {/* Rota para a tela de Login */}
                <Route path="/" element={<Login/>} />

                {/* Tava Login no element */}
                <Route path="/cadastro" element={<Cadastro/>} />

                {/* Rota para a tela de Controle */}
                <Route path="/controle" element={<Controle />} />

                {/* Rota para a tela de Notificações */}
                <Route path="/notificacoes" element={<Notificacoes />} />

                {/* Rota para a tela de Criação */}
                <Route path="/criacao" element={<Criacao />} />

                {/* Rota para a tela de Desafios */}
                <Route path="/desafio" element={<Desafio />} />

                {/* Rota para a tela de Visão */}
                <Route path="/visao/:id" element={<Visao />} />
            </Routes>
        </Router>
    );
}

export default App;