import { ProgressBar } from 'react-bootstrap';
import { Footer_D } from '../Fragments/Footer_D';
import { Header } from '../Fragments/Header';
import '../static/Desafio.css';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export const Desafio = () => {
    const [tarefasAtrasadas, setTarefasAtrasadas] = useState([]); // Tarefas não concluídas e atrasadas
    const [tarefasConcluidas, setTarefasConcluidas] = useState([]); // Tarefas concluídas
    const [tarefasAFazer, setTarefasAFazer] = useState([]); // Tarefas não concluídas e não atrasadas
    const [erro, setErro] = useState(''); // Mensagens de erro
    const navigate = useNavigate();

    // Recupera o nível e os pontos do localStorage
    const [level, setLevel] = useState(() => {
        const savedLevel = localStorage.getItem('level');
        return savedLevel ? parseInt(savedLevel, 10) : 1;
    });
    const [pontos, setPontos] = useState(() => {
        const savedPontos = localStorage.getItem('pontos');
        return savedPontos ? parseInt(savedPontos, 10) : 0;
    });

    // Array de ranks (deve ser o mesmo da tela de Controle)
    const ranks = [
        "Recruta", "Soldado", "Cabo", "Sargento", "Sargento-Mor",
        "Subtenente", "Tenente", "Capitão", "Major", "Tenente-Coronel",
        "Coronel", "General de Brigada", "General de Divisão", "General de Exército", "Marechal",
        "Aspirante a Oficial", "Segundo-Tenente", "Primeiro-Tenente", "Capitão-Tenente", "Major-Brigadeiro",
        "Tenente-Brigadeiro", "General-Brigadeiro", "Comodoro", "Contra-Almirante", "Vice-Almirante",
        "Almirante", "Almirante de Esquadra", "Marechal do Ar", "Marechal-General", "Comandante Supremo",
        "Líder Máximo"
    ];

    // Rank atual
    const currentRank = ranks[Math.min(level - 1, 30)];

    // Busca as tarefas do usuário ao carregar o componente
    useEffect(() => {
        fetchTarefas();
    }, []);

    // Função para buscar as tarefas do usuário
    const fetchTarefas = async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                setErro('Token de autenticação não encontrado. Faça login novamente.');
                navigate('/login');
                return;
            }

            const response = await axios.get('http://localhost:8000/api/tarefas', {
                headers: { 'Authorization': token }
            });

            // Separa as tarefas em concluídas, atrasadas e a fazer
            const hoje = new Date();
            const hojeDateOnly = new Date(hoje.getFullYear(), hoje.getMonth(), hoje.getDate());

            const tarefasConcluidas = response.data.filter(tarefa => tarefa.concluida);
            const tarefasAtrasadas = response.data.filter(tarefa => {
                const dataPrazo = new Date(tarefa.data_prazo);
                const dataPrazoDateOnly = new Date(dataPrazo.getFullYear(), dataPrazo.getMonth(), dataPrazo.getDate());
                return !tarefa.concluida && hojeDateOnly > dataPrazoDateOnly;
            });
            const tarefasAFazer = response.data.filter(tarefa => {
                const dataPrazo = new Date(tarefa.data_prazo);
                const dataPrazoDateOnly = new Date(dataPrazo.getFullYear(), dataPrazo.getMonth(), dataPrazo.getDate());
                return !tarefa.concluida && hojeDateOnly <= dataPrazoDateOnly;
            });

            setTarefasConcluidas(tarefasConcluidas);
            setTarefasAtrasadas(tarefasAtrasadas);
            setTarefasAFazer(tarefasAFazer);
            setErro('');
        } catch (error) {
            console.error('Erro ao buscar tarefas:', error);
            setErro('Erro ao buscar tarefas. Tente novamente.');
        }
    };

    // Função para calcular o progresso do nível
    const getLevel = (points) => {
        let level = 1;
        let requiredPoints = 100;
        while (points >= requiredPoints) {
            points -= requiredPoints; // Subtrai os pontos necessários ao passar de nível
            level++;
            requiredPoints += 100;
        }
        return { level, remainingPoints: points, nextLevelPoints: requiredPoints };
    };

    const { level: calculatedLevel, remainingPoints, nextLevelPoints } = getLevel(pontos);
    const progress = (remainingPoints / nextLevelPoints) * 100;

    // Função para obter a cor do nível
    const getLevelColor = (lvl) => {
        if (lvl === 1) return '#d3d3d3'; // Cinza inicial
        if (lvl <= 5) return '#ffffff'; // Branco
        if (lvl <= 10) return '#ffd700'; // Ouro
        if (lvl <= 15) return '#ffa500'; // Laranja
        if (lvl <= 20) return '#28a745'; // Verde
        if (lvl <= 25) return '#4a90e2'; // Azul
        if (lvl <= 30) return '#8b4513'; // Marrom
        return '#000000'; // Preto
    };

    // Função para calcular o progresso das tarefas concluídas e a fazer
    const calculateTaskProgress = () => {
        const totalTasks = tarefasConcluidas.length + tarefasAtrasadas.length + tarefasAFazer.length;
        const concluidas = tarefasConcluidas.length;
        const aFazer = tarefasAtrasadas.length + tarefasAFazer.length;

        const progressConcluidas = totalTasks > 0 ? (concluidas / totalTasks) * 100 : 0;
        const progressAFazer = totalTasks > 0 ? (aFazer / totalTasks) * 100 : 0;

        return { progressConcluidas, progressAFazer };
    };

    const { progressConcluidas, progressAFazer } = calculateTaskProgress();

    // Função para formatar a data no formato dd/MM/yyyy
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('pt-BR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
        });
    };

    return (
        <div className="container-fluid main-container">
            <Header />

            <div className="headerteste"></div>
            

            <div className="content p-3" style={{ backgroundColor: '#ffffff' }}>
                <div className="profile-section d-flex justify-content-between align-items-center">
                    <div className="profile-info d-flex align-items-center">
            {/* Foto do perfil alterado */}
            <img src="/icons_imagem/perfil_usuario.png" alt="Perfil" className="profile-pic mr-2" />

                {/* Rodrigo- O nome de usuario deveria parar aqui */}
                        <span className="profile-name">[Nome de usuario]👑</span>
                    </div>
                </div>

                <div className="level-card p-3" style={{ borderColor: getLevelColor(level) }}>
                    <div className="level-header d-flex justify-content-between">
                        <span className="level-title">Rank</span> {/* Alterado de LEVEL para RANK */}
                        <span className="level-badge" style={{ backgroundColor: getLevelColor(level) }}>
                            {currentRank} <span style={{ color: '#fff' }}>⭐</span> {/* Exibe o rank atual */}
                        </span>
                    </div>
                    <ProgressBar now={progress} className="progress-custom">
                        <div
                            className="progress-bar"
                            style={{
                                width: `${progress}%`,
                                backgroundColor: getLevelColor(level),
                                transition: 'width 0.3s ease-in-out',
                            }}
                        ></div>
                    </ProgressBar>
                </div>

                <div className="stats-card p-3">
                    <div className="stat-item">
                        CONCLUÍDAS
                        <ProgressBar now={progressConcluidas} className="progress-custom bg-success" />
                    </div>
                    <div className="stat-item">
                        A FAZER
                        <ProgressBar now={progressAFazer} className="progress-custom bg-danger" />
                    </div>
                </div>

                <div className="tasks-section p-3">
                    <h3 className="tasks-title">Tarefas Atrasadas</h3>
                    <table className="table">
                        <tbody>
                            {tarefasAtrasadas.map((tarefa, index) => (
                                <tr key={index}>
                                    <td>
                                        <span style={{ color: 'red' }}> {/* Tarefas atrasadas sempre em vermelho */}
                                            ⭐ {tarefa.nome}
                                        </span>
                                    </td>
                                    <td>{tarefa.prioridade}</td>
                                    <td>{formatDate(tarefa.data_prazo)}</td> {/* Exibe a data do banco */}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <Footer_D />
        </div>
    );
};