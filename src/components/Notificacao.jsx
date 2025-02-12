import { useState } from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";
import "../static/Notificacoes.css";


export const Notificacoes = () => {
  // Nivel do Usuario funçao
  const [nivel, setNivel] = useState(8);

  //Nivel de progresso do usuario funçao, começa com 60%
  const [progresso, setProgresso] = useState(60);
  // Quantidade de pontos pra proximo Nivel, funcao
  const [pontosRestantes, setPontosRestantes] = useState(350);
  // Tarefas pra hoje Funcao
  const [tarefasHoje, setTarefasHoje] = useState("3/9");
  // Tarefas pra Semana Funcao 
  const [tarefasSemana, setTarefasSemana] = useState("18/43");
  // Tarefas pendentes funcao
  const [tarefasPendentes, setTarefasPendentes] = useState([
    "Tarefa 1",
    "Tarefa 2",
    "Tarefa 3",
  ]);

  return (
    <div className="d-flex flex-column min-vh-100">
      <Header />
      <main className="container flex-grow-1 py-4">
        <section className="mb-4">
          <h2 className="h4 mb-3">Recompensas e Conquistas</h2>
          <div className="card">
            <div className="card-body">
              <h3 className="h5">NÍVEL {nivel}</h3>
              <div className="progress mb-3">
                <div
                  className="progress-bar"
                  role="progressbar"
                  style={{ width: `${progresso}%` }}
                  aria-valuenow={progresso}
                  aria-valuemin="0"
                  aria-valuemax="100"
                ></div>
              </div>
              <p>{pontosRestantes} Pontos até Nível ?</p>
            </div>
          </div>
        </section>

        <section className="mb-4">
          <div className="row">
            <div className="col-md-6 mb-3">
              <div className="card">
                <div className="card-body">
                  <h3 className="h5">Tarefas completadas Hoje</h3>
                  <p>{tarefasHoje} Tarefas completadas</p>
                  <i className="bi bi-rocket fs-4"></i>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="card">
                <div className="card-body">
                  <h3 className="h5">Tarefas completadas Semanal</h3>
                  <p>{tarefasSemana} Tarefas completadas</p>
                  <i className="bi bi-calendar fs-4"></i>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section>
          <h3 className="h5">Tarefas Pendentes</h3>
          <ul className="list-group">
            {tarefasPendentes.map((tarefa, index) => (
              <li key={index} className="list-group-item">
                {tarefa}
              </li>
            ))}
          </ul>
        </section>
      </main>
      <Footer />
    </div>
  );
};
