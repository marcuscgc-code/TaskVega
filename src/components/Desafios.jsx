import { ProgressBar } from 'react-bootstrap';
import { Footer_D } from '../Fragments/Footer_D';
import { Header } from '../Fragments/Header';
import '../static/Desafio.css';
import { useState } from 'react';

export const Desafio = () => {
	const [checkedTasks, setCheckedTasks] = useState([true, true, true]);
	const [points, setPoints] = useState(0);

	const handleCheckboxChange = (index) => {
		const newCheckedTasks = [...checkedTasks];
		newCheckedTasks[index] = !newCheckedTasks[index];
		setCheckedTasks(newCheckedTasks);
	};

	const addPoints = () => {
		setPoints((prevPoints) => prevPoints + 100);
	};

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

	const { level, remainingPoints, nextLevelPoints } = getLevel(points);
	const progress = (remainingPoints / nextLevelPoints) * 100;

	const getLevelColor = (level) => {
		if (level === 1) return '#d3d3d3'; // Cinza inicial
		if (level <= 5) return '#ffffff'; // Branco
		if (level <= 10) return '#ffd700'; // Ouro
		if (level <= 15) return '#ffa500'; // Laranja
		if (level <= 20) return '#28a745'; // Verde
		if (level <= 25) return '#4a90e2'; // Azul
		if (level <= 30) return '#8b4513'; // Marrom
		return '#000000'; // Preto
	};

	console.log("Nível:", level, "Cor do nível:", getLevelColor(level), "Progresso:", progress);

	const currentDate = new Date();
	const formattedDate = currentDate.toLocaleDateString('pt-BR', {
		day: '2-digit',
		month: '2-digit',
		year: 'numeric',
	});

	return (
		<div className="container-fluid main-container">
			<Header />

			<div className="headerteste"></div>

			<div className="content p-3" style={{ backgroundColor: '#ffffff' }}>
				<div className="profile-section d-flex justify-content-between align-items-center">
					<div className="profile-info d-flex align-items-center">
						<img src="profile.jpg" alt="Perfil" className="profile-pic mr-2" />
						<span className="profile-name">👑</span>
					</div>
				</div>

				<div className="level-card p-3" style={{ borderColor: getLevelColor(level) }}>
					<div className="level-header d-flex justify-content-between">
						<span className="level-title">LEVEL</span>
						<span className="level-badge" style={{ backgroundColor: getLevelColor(level) }}>
							{level} <span style={{ color: '#fff' }}>⭐</span>
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

				<button className="btn btn-primary mt-3" onClick={addPoints}>
					Adicionar 100 pontos
				</button>

				<div className="stats-card p-3">
					<div className="stat-item">
						CONCLUÍDAS
						<ProgressBar now={70} className="progress-custom bg-success" />
					</div>
					<div className="stat-item">
						A FAZER
						<ProgressBar now={30} className="progress-custom bg-danger" />
					</div>
				</div>

				<div className="tasks-section p-3">
					<h3 className="tasks-title">Tarefas</h3>
					<table className="table">
						<tbody>
							<tr>
								<td>
									<input
										type="checkbox"
										checked={checkedTasks[0]}
										onChange={() => handleCheckboxChange(0)}
									/>{' '}
									⭐ Name
								</td>
								<td style={{ color: 'red' }}>Alto</td>
								<td>{formattedDate}</td>
							</tr>
							<tr>
								<td>
									<input
										type="checkbox"
										checked={checkedTasks[1]}
										onChange={() => handleCheckboxChange(1)}
									/>{' '}
									⭐ Name
								</td>
								<td style={{ color: 'blue' }}>Médio</td>
								<td>{formattedDate}</td>
							</tr>
							<tr>
								<td>
									<input
										type="checkbox"
										checked={checkedTasks[2]}
										onChange={() => handleCheckboxChange(2)}
									/>{' '}
									⭐ Name
								</td>
								<td style={{ color: 'green' }}>Baixo</td>
								<td>{formattedDate}</td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>

			<Footer_D />
		</div>
	);
};
