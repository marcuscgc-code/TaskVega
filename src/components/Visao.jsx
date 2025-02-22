import { Header } from '../Fragments/Header';
import { Footer_Cria } from '../Fragments/Footer_Cria';
import "../static/Recebimento.css";

export const Visao = () => {
    // Simulação de dados vindos do banco (sem anexos agora)
    const dadosConsulta = {
        nome: "Projeto Exemplo",
        descricao: "Descrição do projeto de exemplo para consulta.",
        data: "02/22/2025",
        ordem: "Médio",
        miniTarefas: ["Tarefa 1", "Tarefa 2", "Tarefa 3"]
    };

    const handleClose = () => {
        // Lógica para fechar a tela (ajuste conforme necessário)
        console.log("Fechar tela");
        // Exemplo: window.history.back(); ou useNavigate do react-router
    };

    return (
        <div id="consulta" className="container-fluid d-flex flex-column min-vh-100">
            <Header />
            <div className="card p-4 border border-2 border-dark shadow-sm mb-auto mx-auto" style={{ maxWidth: '600px', width: '100%' }}>
                <h2 className="text-center mb-3 d-flex align-items-center justify-content-center">
                    Consulta de Dados <span style={{ fontSize: '20px', marginLeft: '5px' }}>🔍</span>
                </h2>
                <div className="mb-3">
                    <label htmlFor="nome" className="form-label fw-bold text-muted">Nome</label>
                    <input 
                        type="text" 
                        className="form-control form-control-lg border-primary" 
                        id="nome" 
                        value={dadosConsulta.nome} 
                        disabled
                        style={{ borderRadius: '8px' }}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="descricao" className="form-label fw-bold text-muted">Descrição</label>
                    <textarea 
                        className="form-control form-control-lg border-primary" 
                        id="descricao" 
                        rows="3" 
                        value={dadosConsulta.descricao} 
                        disabled
                        style={{ borderRadius: '8px' }}
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label fw-bold text-muted">Data</label>
                    <input 
                        type="text" 
                        className="form-control form-control-lg border-primary" 
                        value={dadosConsulta.data} 
                        disabled
                        style={{ borderRadius: '8px' }}
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label fw-bold text-muted">Ordem</label>
                    <input 
                        type="text" 
                        className="form-control form-control-lg border-primary" 
                        value={dadosConsulta.ordem} 
                        disabled
                        style={{ borderRadius: '8px' }}
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label fw-bold text-muted">MiniTarefas</label>
                    {dadosConsulta.miniTarefas.map((tarefa, index) => (
                        <input 
                            key={index} 
                            type="text" 
                            className="form-control form-control-lg border-primary mb-2" 
                            value={tarefa} 
                            disabled
                            style={{ borderRadius: '8px' }}
                        />
                    ))}
                </div>
                <button 
                    type="button" 
                    className="btn btn-danger w-100 py-3" 
                    onClick={handleClose}
                    style={{ borderRadius: '8px' }}
                >
                    Fechar
                </button>
            </div>
            <Footer_Cria />
        </div>
    );
};