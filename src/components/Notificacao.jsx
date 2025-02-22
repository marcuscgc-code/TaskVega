import { useState, useEffect } from "react";
import { Header } from "../Fragments/Header";
import { Footer } from "../Fragments/Footer";
import "../static/Notificacoes.css";

export const Notificacoes = () => {
  // Nivel do Usuario funçao
  const [nivel, setNivel] = useState(1);
  // Nivel de progresso do usuario funçao, começa com 0%
  const [progresso, setProgresso] = useState(0);
  // Quantidade de pontos pra proximo Nivel, funcao
  const [pontosRestantes, setPontosRestantes] = useState(1000);

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

  // Cores da barra de progresso para cada nível
  const coresProgresso = [
    "#FFFFFF", // Nível 0 (não usado)
    "#FFFF00", // Amarelo (Nível 1)
    "#FFA500", // Laranja (Nível 2)
    "#FF4500", // Vermelho (Nível 3)
    "#800080", // Roxo (Nível 4)
    "#0000FF", // Azul (Nível 5)
    "#008000", // Verde (Nível 6)
    "#A52A2A", // Marrom (Nível 7)
    "#808080", // Cinza (Nível 8)
    "#000000", // Preto (Nível 9)
    "#000000", // Preto (Nível 10)
  ];

  // Calcular os pontos necessários para o próximo nível
  const calcularPontosNecessarios = (nivel) => nivel * 1000;

  // Atualizar os pontos restantes e o progresso ao mudar o nível
  useEffect(() => {
    const pontosNecessarios = calcularPontosNecessarios(nivel);
    setPontosRestantes(pontosNecessarios);
    setProgresso(0); // Zerar o progresso ao mudar de nível
  }, [nivel]);

  // Função para adicionar pontos (exemplo)
  const adicionarPontos = (pontos) => {
    const novoProgresso = progresso + pontos;
    const pontosNecessarios = calcularPontosNecessarios(nivel);

    if (novoProgresso >= pontosNecessarios) {
      setNivel(nivel + 1);
      setProgresso(novoProgresso - pontosNecessarios); // Zerar o progresso ao mudar de nível, mantendo o excedente
    } else {
      setProgresso(novoProgresso);
    }
  };

  // Calcular a porcentagem de progresso
  const progressoPercentual = (progresso / calcularPontosNecessarios(nivel)) * 100;

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
                  style={{
                    width: `${progressoPercentual}%`,
                    backgroundColor: coresProgresso[nivel],
                  }}
                  aria-valuenow={progressoPercentual}
                  aria-valuemin="0"
                  aria-valuemax="100"
                ></div>
              </div>
              <p>{pontosRestantes - progresso} Pontos até Nível {nivel + 1}</p>
             
              {/* Botão para adicionar pontos para teste */}
              <button onClick={() => adicionarPontos(500)} className="btn btn-primary">
                Adicionar 500 Pontos
              </button>

              
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
