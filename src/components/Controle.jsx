import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Footer_C } from '../Fragments/Footer_C';
import { Header_C } from '../Fragments/Header_C';
import '../static/Controle.css';

export const Controle = () => {
	const [tarefas, setTarefas] = useState([]); // Tarefas não concluídas
	const [feitoTasks, setFeitoTasks] = useState([]); // Tarefas concluídas
	const [level, setLevel] = useState(() => {
		const savedLevel = localStorage.getItem('level');
		return savedLevel ? parseInt(savedLevel, 10) : 1;
	});
	const [pontos, setPontos] = useState(() => {
		const savedPontos = localStorage.getItem('pontos');
		return savedPontos ? parseInt(savedPontos, 10) : 0;
	});
	const [erro, setErro] = useState(''); // Mensagens de erro
	const navigate = useNavigate();

	// Array de ranks
	const ranks = [
		'Recruta',
		'Soldado',
		'Cabo',
		'Sargento',
		'Sargento-Mor',
		'Subtenente',
		'Tenente',
		'Capitão',
		'Major',
		'Tenente-Coronel',
		'Coronel',
		'General de Brigada',
		'General de Divisão',
		'General de Exército',
		'Marechal',
		'Aspirante a Oficial',
		'Segundo-Tenente',
		'Primeiro-Tenente',
		'Capitão-Tenente',
		'Major-Brigadeiro',
		'Tenente-Brigadeiro',
		'General-Brigadeiro',
		'Comodoro',
		'Contra-Almirante',
		'Vice-Almirante',
		'Almirante',
		'Almirante de Esquadra',
		'Marechal do Ar',
		'Marechal-General',
		'Comandante Supremo',
		'Líder Máximo',
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

			const response = await axios.get('http://192.168.15.6:8000/api/tarefas', {
				headers: { Authorization: token },
			});

			// Separa tarefas concluídas e não concluídas
			const tarefasNaoConcluidas = response.data.filter((t) => !t.concluida);
			const tarefasConcluidas = response.data.filter((t) => t.concluida);

			setTarefas(tarefasNaoConcluidas);
			setFeitoTasks(tarefasConcluidas);

			// Recalcula o nível e os pontos com base nas tarefas concluídas
			calcularNivelEPontos(tarefasConcluidas);

			setErro('');
		} catch (error) {
			console.error('Erro ao buscar tarefas:', error);
			setErro('Erro ao buscar tarefas. Tente novamente.');
		}
	};

	// Função para calcular o nível e os pontos com base nas tarefas concluídas
	const calcularNivelEPontos = (tarefasConcluidas) => {
		let totalPontos = 0;
		tarefasConcluidas.forEach((tarefa) => {
			totalPontos += tarefa.pontuacao || 0; // Supondo que cada tarefa tenha um campo "pontuacao"
		});

		let novoLevel = 1;
		let pontosNecessarios = 100; // Pontos necessários para o próximo nível
		let pontosAcumulados = 0; // Pontos acumulados para o próximo nível

		while (totalPontos >= pontosNecessarios) {
			totalPontos -= pontosNecessarios;
			pontosAcumulados += pontosNecessarios;
			novoLevel++;
			pontosNecessarios += 100; // Aumenta a quantidade de pontos necessários para o próximo nível
		}

		setLevel(novoLevel);
		setPontos(totalPontos);

		// Salva no localStorage
		localStorage.setItem('level', novoLevel);
		localStorage.setItem('pontos', totalPontos);
	};

	// Função para mover tarefa para "Feito" e marcar como concluída
	const moveTask = async (task) => {
		try {
			const token = localStorage.getItem('token');
			if (!token) {
				setErro('Token de autenticação não encontrado. Faça login novamente.');
				navigate('/login');
				return;
			}

			// Marca a tarefa como concluída no backend
			const response = await axios.put(
				`http://192.168.15.6:8000/api/tarefas/${task.id}/concluir`,
				{},
				{ headers: { Authorization: token } }
			);

			// Atualiza os pontos e verifica se o nível deve subir
			const novosPontos = pontos + response.data.pontuacao;
			setPontos(novosPontos);

			// Verifica se o usuário pode subir de nível
			const pontosNecessarios = level * 100;
			if (novosPontos >= pontosNecessarios) {
				setLevel(level + 1);
				setPontos(0); // Reseta os pontos após subir de nível
			}

			// Atualiza as listas de tarefas
			setTarefas(tarefas.filter((t) => t.id !== task.id));
			setFeitoTasks([...feitoTasks, { ...task, concluida: true }]);

			// Salva no localStorage
			localStorage.setItem('level', level);
			localStorage.setItem('pontos', novosPontos);
		} catch (error) {
			console.error('Erro ao marcar tarefa como concluída:', error);
			setErro('Erro ao marcar tarefa como concluída. Tente novamente.');
		}
	};

	// Função para deletar uma tarefa
	const deleteTask = async (task, isFazer) => {
		try {
			const token = localStorage.getItem('token');
			if (!token) {
				setErro('Token de autenticação não encontrado. Faça login novamente.');
				navigate('/login');
				return;
			}

			await axios.delete(`http://192.168.15.6:8000/api/tarefas/${task.id}`, {
				headers: { Authorization: token },
			});

			// Atualiza a lista de tarefas
			if (isFazer) {
				setTarefas(tarefas.filter((t) => t.id !== task.id));
			} else {
				setFeitoTasks(feitoTasks.filter((t) => t.id !== task.id));
			}
		} catch (error) {
			console.error('Erro ao deletar tarefa:', error);
			setErro('Erro ao deletar tarefa. Tente novamente.');
		}
	};

	// Função para exibir detalhes da tarefa
	const handleTaskClick = (task) => {
		navigate(`/visao/${task.id}`);
	};

	// Componente para renderizar uma tarefa
	const TaskItem = ({ task, isFazer }) => (
		<div className={`task-item ${!isFazer ? 'done' : ''}`}>
			<label className="d-flex align-items-center justify-content-between w-100">
				<div className="d-flex align-items-center">
					{isFazer && (
						<input
							type="checkbox"
							checked={!isFazer}
							onChange={() => moveTask(task)}
							className="me-2"
						/>
					)}
					<span
						onClick={() => handleTaskClick(task)}
						className="task-title"
					>
						{task.nome}
					</span>
				</div>
				<span
					className="trash-icon"
					onClick={() => deleteTask(task, isFazer)}
				></span>
			</label>
		</div>
	);

	// Função para calcular os dias da semana atual
	const getCurrentWeekDates = () => {
		const today = new Date();
		const startOfWeek = new Date(today);
		startOfWeek.setDate(today.getDate() - today.getDay() + 1); // Segunda-feira da semana atual

		const weekDates = [];
		for (let i = 0; i < 7; i++) {
			const date = new Date(startOfWeek);
			date.setDate(startOfWeek.getDate() + i);
			const normalizedDate = new Date(
				Date.UTC(date.getFullYear(), date.getMonth(), date.getDate())
			);
			weekDates.push(normalizedDate.toISOString().split('T')[0]); // Formato YYYY-MM-DD
		}

		return weekDates;
	};

	// Função para obter o mês e o ano atuais
	const getCurrentMonthYear = () => {
		const today = new Date();
		const month = today.toLocaleString('default', { month: 'long' });
		const year = today.getFullYear();
		return `${month} ${year}`;
	};

	// Função para obter a cor da estrela com base no nível
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

	return (
		<>
			<Header_C />
			<div
				className="container d-flex flex-column justify-content-center align-items-center p-2"
				style={{ height: '100vh', width: '100vw' }}
			>
				<div
					className="p-2 shadow-sm"
					style={{ width: '100%', height: '100%' }}
				>
					<main className="container mt-4">
						{erro && <div className="alert alert-danger">{erro}</div>}
						<section className="mb-4 ">
							<h2 className="texto-controle">Lista de Tarefas</h2>
							<div className="list-group">
								<div className="list-group-item d-flex justify-content-between align-items-center">
									{currentRank}
									<span
										className="badge"
										style={{
											backgroundColor: getStarColor(level),
											color: level > 25 ? '#ffffff' : '#000000',
										}}
									>
										⭐
									</span>
								</div>
								<div className="list-group-item d-flex justify-content-between align-items-center">
									Tarefas Novas{' '}
									<button
										className="btn btn-primary btn-sm botao-ver"
										onClick={() => navigate('/criacao')}
									>
										Add
									</button>
								</div>
								<div className="list-group-item d-flex justify-content-between align-items-center">
									Listas Tarefas{' '}
									<button
										className="btn btn-primary btn-sm botao-ver"
										onClick={() => navigate('/desafio')}
									>
										Ver
									</button>
								</div>
							</div>
						</section>

						<section className="mb-2">
							<h2 className="texto-controle">Quadro</h2>
							<div className="row">
								<div className="col-md-4 mb-3">
									<div className="card">
										<div className="card-header botao-quadro">Fazer</div>
										<div className="card-body text-custom">
											{tarefas.map((tarefa) => (
												<TaskItem
													key={tarefa.id}
													task={tarefa}
													isFazer={true}
												/>
											))}
										</div>
									</div>
								</div>
								<div className="col-md-4 mb-3">
									<div className="card">
										<div className="card-header botao-quadro">Feito</div>
										<div className="card-body text-custom1">
											{feitoTasks.map((tarefa) => (
												<TaskItem
													key={tarefa.id}
													task={tarefa}
													isFazer={false}
												/>
											))}
										</div>
									</div>
								</div>
							</div>
						</section>

						<section className="mb-4">
							<h2 className="texto-controle">Calendário</h2>
							<div className="card">
								<div className="card-header d-flex justify-content-between align-items-center">
									{getCurrentMonthYear()} <i className="bi bi-calendar"></i>
								</div>
								<div className="card-body">
									<div className="d-flex justify-content-between">
										{getCurrentWeekDates().map((date, index) => {
											const tarefasDoDia = tarefas.filter((tarefa) => {
												const tarefaDate = new Date(tarefa.data_prazo);
												const normalizedTarefaDate = new Date(
													Date.UTC(
														tarefaDate.getFullYear(),
														tarefaDate.getMonth(),
														tarefaDate.getDate()
													)
												);
												return (
													normalizedTarefaDate.toISOString().split('T')[0] ===
													date
												);
											});

											return (
												<div
													key={index}
													className="flex-grow-1 text-center border-end"
													style={{ minWidth: '14.28%' }}
												>
													<div className="fw-bold">
														{
															['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'][
																new Date(date).getUTCDay()
															]
														}
													</div>
													<div
														className={
															tarefasDoDia.length > 0
																? 'text-primary fw-bold'
																: ''
														}
													>
														{new Date(date).getUTCDate()}
													</div>
													<div className="mt-2">
														{tarefasDoDia.map((tarefa, idx) => (
															<div
																key={idx}
																className="small"
															>
																{tarefa.nome}
															</div>
														))}
													</div>
												</div>
											);
										})}
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
