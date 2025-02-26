import { useState, useEffect } from "react";
import { Header } from "../Fragments/Header";
import { Footer } from "../Fragments/Footer";
import "../static/Notificacoes.css";

export const Notificacoes = () => {
  const [nivel, setNivel] = useState(1);
  const [progresso, setProgresso] = useState(0);
  const [pontosRestantes, setPontosRestantes] = useState(1000);
  const [tarefasHoje, setTarefasHoje] = useState("3/9");
  const [tarefasSemana, setTarefasSemana] = useState("18/43");
  const [tarefasPendentes, setTarefasPendentes] = useState([
    "Tarefa 1",
    "Tarefa 2",
    "Tarefa 3",
  ]);

  // Cores para a barra de progresso e estrela, mudando a cada 5 níveis
  const coresNiveis = [
    "#d3d3d3", // Cinza (Nível 1)
    "#ffffff", // Branco (Nível 2-5)
    "#ffd700", // Ouro (Nível 6-10)
    "#ffa500", // Laranja (Nível 11-15)
    "#28a745", // Verde (Nível 16-20)
    "#4a90e2", // Azul (Nível 21-25)
    "#8b4513", // Marrom (Nível 26-30)
    "#000000", // Preto (Nível 31+)
  ];

  // Determina a cor com base no nível (muda a cada 5 níveis)
  const getColorByLevel = (lvl) => {
    if (lvl === 1) return coresNiveis[0];
    const index = Math.min(Math.floor((lvl - 1) / 5), coresNiveis.length - 1);
    return coresNiveis[index];
  };

  const calcularPontosNecessarios = (nivel) => nivel * 1000;

  useEffect(() => {
    const pontosNecessarios = calcularPontosNecessarios(nivel);
    setPontosRestantes(pontosNecessarios);
    setProgresso(0);
  }, [nivel]);

  const adicionarPontos = (pontos) => {
    const novoProgresso = progresso + pontos;
    const pontosNecessarios = calcularPontosNecessarios(nivel);

    if (novoProgresso >= pontosNecessarios) {
      setNivel(nivel + 1);
      setProgresso(novoProgresso - pontosNecessarios);
    } else {
      setProgresso(novoProgresso);
    }
  };

  const progressoPercentual = (progresso / calcularPontosNecessarios(nivel)) * 100;

  const corProgresso = getColorByLevel(nivel);
  const corEstrela = getColorByLevel(nivel);

  return (
    <div className="d-flex flex-column min-vh-100">
      <Header />
      <main className="container flex-grow-1 py-4">
        <div className="notification-header">
          <h1>Notificação <span className="bell-icon">🔔</span></h1>
          <div className="tabs">
            <button className="tab active">Todas Notificações</button>
            <button className="tab">Lembretes <span className="rocket-icon">🚀</span></button>
            <button className="tab">Desafios <span className="trophy-icon">🏆</span></button>
          </div>
        </div>

        <section className="mb-4">
          <div className="card rewards-card">
            <div className="card-body">
              <h3 className="card-title">Recompensas e Conquistas <span className="star-icon" style={{ backgroundColor: corEstrela }}>⭐</span></h3>
              <h2 className="level-title">NÍVEL {nivel}</h2>
              <div className="progress mb-3">
                <div
                  className="progress-bar"
                  role="progressbar"
                  style={{
                    width: `${progressoPercentual}%`,
                    backgroundColor: corProgresso,
                  }}
                  aria-valuenow={progressoPercentual}
                  aria-valuemin="0"
                  aria-valuemax="100"
                ></div>
              </div>
              <p className="points-text">{pontosRestantes - progresso} Pontos até Nível {nivel + 1}</p>
              {/* Botão para teste (pode ser removido) */}
              <button onClick={() => adicionarPontos(500)} className="btn btn-primary mt-3">
                Adicionar 500 Pontos
              </button>
            </div>
          </div>
        </section>

        <section className="mb-4">
          <div className="row">
            <div className="col-md-6 mb-3">
              <div className="card task-card">
                <div className="card-body">
                  <h3 className="card-title">Tarefas completadas Hoje</h3>
                  <p className="task-count">{tarefasHoje} Tarefas completadas</p>
                  <i className="bi bi-rocket fs-4 rocket-icon"></i>
                </div>
              </div>
            </div>
            <div className="col-md-6 mb-3">
              <div className="card task-card">
                <div className="card-body">
                  <h3 className="card-title">Tarefas completadas Semanal</h3>
                  <p className="task-count">{tarefasSemana} Tarefas completadas</p>
                  <i className="bi bi-calendar fs-4 calendar-icon"></i>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section>
          <h3 className="h5 mb-3">Tarefas Pendentes</h3>
          <div className="card pending-tasks-card">
            <div className="card-body">
              <ul className="list-group list-group-flush">
                {tarefasPendentes.map((tarefa, index) => (
                  <li key={index} className="list-group-item pending-task">
                    <span className="task-check">✔</span> {tarefa}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        
      </main>
      <Footer />
    </div>
  );
};