import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Footer } from '../Fragments/Footer';
import { Footer_C } from '../Fragments/Footer_C';
import { Header_C } from '../Fragments/Header_C';
import '../static/Controle.css';

export const Controle = () => {
    const [tarefas, setTarefas] = useState([]); // Estado para armazenar as tarefas
    const [feitoTasks, setFeitoTasks] = useState([]);
    const [level, setLevel] = useState(1);
    const navigate = useNavigate();

    // Função para buscar as tarefas do usuário
    const fetchTarefas = async () => {
        try {
            const token = localStorage.getItem('token'); // Recupera o token do localStorage
            const response = await axios.get('http://localhost:8000/api/tarefas', {
                headers: {
                    'Authorization': token // Envia o token no cabeçalho
                }
            });

            console.log('Tarefas carregadas:', response.data);
            setTarefas(response.data); // Atualiza o estado com as tarefas obtidas
        } catch (error) {
            console.error('Erro ao buscar tarefas:', error.response?.data);
            alert('Erro ao buscar tarefas. Tente novamente.');
        }
    };

    // Busca as tarefas ao carregar o componente
    useEffect(() => {
        fetchTarefas();
    }, []);

    const getStarColor = (lvl) => {
        if (lvl === 1) return '#d3d3d3'; // Cinza inicial
        if (lvl <= 5) return '#ffffff'; // Branco
        if (lvl <= 10) return '#ffd700'; // Ouro
        if (lvl <= 15) return '#ffa500'; // Laranja
        if (lvl <= 20) return '#28a745'; // Verde
        if (lvl <= 25) return '#4a90e2'; // Azul
        if (lvl <= 30) return '#8b4513'; // Marrom
        return '#000000'; // Preto
    };

    const ranks = [
        "Recruta", "Soldado", "Cabo", "Sargento", "Sargento-Mor",
        "Subtenente", "Tenente", "Capitão", "Major", "Tenente-Coronel",
        "Coronel", "General de Brigada", "General de Divisão", "General de Exército", "Marechal",
        "Aspirante a Oficial", "Segundo-Tenente", "Primeiro-Tenente", "Capitão-Tenente", "Major-Brigadeiro",
        "Tenente-Brigadeiro", "General-Brigadeiro", "Comodoro", "Contra-Almirante", "Vice-Almirante",
        "Almirante", "Almirante de Esquadra", "Marechal do Ar", "Marechal-General", "Comandante Supremo",
        "Líder Máximo"
    ];

    const moveTask = (task, fromFazer) => {
        if (fromFazer) {
            setTarefas(tarefas.filter(t => t.id !== task.id)); // Remove a tarefa do quadro "Fazer"
            setFeitoTasks([...feitoTasks, task]); // Adiciona a tarefa ao quadro "Feito"
        } else {
            setFeitoTasks(feitoTasks.filter(t => t.id !== task.id)); // Remove a tarefa do quadro "Feito"
            setTarefas([...tarefas, task]); // Adiciona a tarefa ao quadro "Fazer"
        }
    };

    const deleteTask = (task, isFazer) => {
        if (isFazer) {
            setTarefas(tarefas.filter(t => t.id !== task.id)); // Remove a tarefa do quadro "Fazer"
        } else {
            setFeitoTasks(feitoTasks.filter(t => t.id !== task.id)); // Remove a tarefa do quadro "Feito"
        }
    };

    const handleTaskClick = (task) => {
        // Redireciona para uma tela de detalhes da tarefa
        navigate(`/visao/${task.id}`); // Usando o ID da tarefa como identificador
    };

    const TaskItem = ({ task, isFazer }) => (
        <div className={`task-item ${!isFazer ? 'done' : ''}`}>
            <label className="d-flex align-items-center justify-content-between w-100">
                <div className="d-flex align-items-center">
                    <input
                        type="checkbox"
                        checked={!isFazer}
                        onChange={() => moveTask(task, isFazer)}
                        className="me-2"
                    />
                    <span
                        onClick={() => handleTaskClick(task)}
                        className="task-title"
                    >
                        {task.nome} {/* Exibe o nome da tarefa */}
                    </span>
                </div>
                <span
                    className="trash-icon"
                    onClick={() => deleteTask(task, isFazer)}
                ></span>
            </label>
        </div>
    );

    const handleCriarProjeto = () => {
        navigate('/criacao');
    };

    const advanceLevel = () => {
        if (level < 31) setLevel(level + 1);
    };

    const currentRank = ranks[Math.min(level - 1, 30)];

    return (
        <>
            <Header_C />
            <div className="container d-flex flex-column justify-content-center align-items-center p-2" style={{ height: '100vh', width: '100vw' }}>
                <div className="p-2 shadow-sm" style={{ width: '100%', height: '100%' }}>
                    <main className="container mt-4">
                        <section className="mb-4">
                            <h2>Lista de Tarefas</h2>
                            <div className="list-group">
                                <div className="list-group-item d-flex justify-content-between align-items-center">
                                    {currentRank}
                                    <span
                                        className="badge"
                                        style={{
                                            backgroundColor: getStarColor(level),
                                            color: level > 25 ? '#ffffff' : '#000000'
                                        }}
                                    >
                                        ⭐
                                    </span>
                                </div>
                                <div className="list-group-item d-flex justify-content-between align-items-center">
                                    Tarefas Novas{' '}
                                    <button className="btn btn-primary btn-sm botao-ver" onClick={handleCriarProjeto}>Add</button>
                                </div>
                                <div className="list-group-item d-flex justify-content-between align-items-center">
                                    Listas Tarefas{' '}
                                    <button className="btn btn-primary btn-sm botao-ver">Ver</button>
                                </div>
                            </div>
                        </section>

                        <section className="mb-2">
                            <h2>Quadro</h2>
                            <div className="row">
                                <div className="col-md-4 mb-3">
                                    <div className="card">
                                        <div className="card-header botao-quadro">Fazer</div>
                                        <div className="card-body text-custom">
                                            {tarefas.map((tarefa, index) => (
                                                <TaskItem key={index} task={tarefa} isFazer={true} />
                                            ))}
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-4 mb-3">
                                    <div className="card">
                                        <div className="card-header botao-quadro">Feito</div>
                                        <div className="card-body text-custom1">
                                            {feitoTasks.map((tarefa, index) => (
                                                <TaskItem key={index} task={tarefa} isFazer={false} />
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>

                        <button className="btn btn-secondary mb-4" onClick={advanceLevel}>Avançar Nível (+1)</button>

                        <section className="mb-4">
                            <h2>Calendário</h2>
                            <div className="card">
                                <div className="card-header d-flex justify-content-between align-items-center">
                                    Janeiro 2025 <i className="bi bi-calendar"></i>
                                </div>
                                <div className="card-body">
                                    <div className="d-flex justify-content-between">
                                        <span>Seg</span><span>Ter</span><span>Qua</span><span>Qui</span><span>Sex</span><span>Sab</span><span>Dom</span>
                                    </div>
                                    <div className="d-flex justify-content-between">
                                        <span className="text-primary">1</span><span>2</span><span>3</span><span>4</span><span>5</span><span>6</span><span>7</span>
                                    </div>
                                </div>
                            </div>
                            <div className="espaca"></div>
                        </section>
                    </main>
                    <Footer_C />
                </div>
            </div>
        </>
    );
};