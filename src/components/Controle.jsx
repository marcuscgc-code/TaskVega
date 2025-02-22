import { useState } from 'react';
import { Footer } from '../Fragments/Footer';
import { Footer_C } from '../Fragments/Footer_C';
import { Header_C } from '../Fragments/Header_C';
import '../static/Controle.css';

export const Controle = () => {
	const [fazerTasks, setFazerTasks] = useState(['Projetos Novos', 'Realizar Testes']); // Initial tasks for "Fazer"
	const [feitoTasks, setFeitoTasks] = useState([]); // Initial tasks for "Feito"

	const moveTask = (task, fromFazer) => {
		if (fromFazer) {
			// Remove task from "Fazer" and add to "Feito"
			setFazerTasks(fazerTasks.filter(t => t !== task));
			setFeitoTasks([...feitoTasks, task]);
		} else {
			// Remove task from "Feito" and add to "Fazer"
			setFeitoTasks(feitoTasks.filter(t => t !== task));
			setFazerTasks([...fazerTasks, task]);
		}
	};

	const TaskItem = ({ task, isFazer }) => (
		<div className="d-flex justify-content-between align-items-center mb-2">
			<label className="d-flex align-items-center">
				<input
					type="checkbox"
					onChange={() => moveTask(task, isFazer)}
					className="me-2"
				/>
				<span>{task}</span>
			</label>
		</div>
	);

	return (
		<>
			<Header_C />
			<div
				className="container d-flex flex-column justify-content-center align-items-center p-2"
				style={{
					height: '100vh',
					width: '100vw',
				}}
			>
				<div
					className="p-2 shadow-sm"
					style={{ width: '100%', height: '100%' }}
				>
					<main className="container mt-4">
						{/* Lista de Tarefas */}
						<section className="mb-4">
							<h2>Lista de Tarefas</h2>
							<div className="list-group">
								<div className="list-group-item d-flex justify-content-between align-items-center">
									Tarefas Futuras <span className="badge bg-warning">⭐</span>
								</div>
								<div className="list-group-item d-flex justify-content-between align-items-center">
									Projetos Novos{' '}
									<button className="btn btn-primary btn-sm botao-ver">
										Ver
									</button>
								</div>
								<div className="list-group-item d-flex justify-content-between align-items-center">
									Realizar Testes{' '}
									<button className="btn btn-primary btn-sm botao-ver">
										Ver
									</button>
								</div>
							</div>
						</section>

						{/* Quadro */}
						<section className="mb-2">
							<h2>Quadro</h2>
							<div className="row">
								<div className="col-md-4 mb-3">
									<div className="card ">
										<div className="card-header botao-quadro ">Fazer</div>
										<div className="card-body text-custom">
											{fazerTasks.map((task, index) => (
												<TaskItem key={index} task={task} isFazer={true} />
											))}
										</div>
									</div>
								</div>
								<div className="col-md-4 mb-3">
									<div className="card">
										<div className="card-header botao-quadro">Feito</div>
										<div className="card-body text-custom1">
											{feitoTasks.map((task, index) => (
												<TaskItem key={index} task={task} isFazer={false} />
											))}
										</div>
									</div>
								</div>
							</div>
						</section>

						{/* Calendário */}
						<section className="mb-4">
							<h2>Calendário</h2>
							<div className="card">
								<div className="card-header d-flex justify-content-between align-items-center">
									Janeiro 2025 <i className="bi bi-calendar"></i>
								</div>
								<div className="card-body">
									<div className="d-flex justify-content-between">
										<span>Seg</span>
										<span>Ter</span>
										<span>Qua</span>
										<span>Qui</span>
										<span>Sex</span>
										<span>Sab</span>
										<span>Dom</span>
									</div>
									<div className="d-flex justify-content-between">
										<span className="text-primary">1</span>
										<span>2</span>
										<span>3</span>
										<span>4</span>
										<span>5</span>
										<span>6</span>
										<span>7</span>
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