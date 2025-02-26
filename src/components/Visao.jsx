import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Header } from '../Fragments/Header';
import { Footer_Cria } from '../Fragments/Footer_Cria';
import "../static/Recebimento.css";

export const Visao = () => {
    const { id } = useParams(); // Obtém o ID da tarefa da URL
    const navigate = useNavigate();
    const [tarefa, setTarefa] = useState(null);
    const [loading, setLoading] = useState(true); // Estado para controlar o carregamento

    // Função para buscar os detalhes da tarefa
    const fetchTarefa = async () => {
        try {
            const token = localStorage.getItem('token'); // Recupera o token do localStorage
            const response = await axios.get(`http://localhost:8000/api/tarefas/${id}`, {
                headers: {
                    'Authorization': token // Envia o token no cabeçalho
                }
            });

            console.log('Tarefa carregada:', response.data);
            setTarefa(response.data); // Atualiza o estado com os detalhes da tarefa
        } catch (error) {
            console.error('Erro ao buscar tarefa:', error.response?.data);
            alert('Erro ao buscar tarefa. Tente novamente.');
        } finally {
            setLoading(false); // Finaliza o carregamento
        }
    };

    // Busca os detalhes da tarefa ao carregar o componente
    useEffect(() => {
        fetchTarefa();
    }, [id]);

    const handleClose = () => {
        navigate(-1); // Volta para a página anterior
    };

    if (loading) {
        return <div>Carregando...</div>; // Exibe uma mensagem de carregamento enquanto os dados são buscados
    }

    if (!tarefa) {
        return <div>Tarefa não encontrada.</div>; // Exibe uma mensagem de erro se a tarefa não for encontrada
    }

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
                        value={tarefa.nome} 
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
                        value={tarefa.descricao} 
                        disabled
                        style={{ borderRadius: '8px' }}
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label fw-bold text-muted">Data</label>
                    <input 
                        type="text" 
                        className="form-control form-control-lg border-primary" 
                        value={tarefa.data_prazo} 
                        disabled
                        style={{ borderRadius: '8px' }}
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label fw-bold text-muted">Prioridade</label>
                    <input 
                        type="text" 
                        className="form-control form-control-lg border-primary" 
                        value={tarefa.prioridade} 
                        disabled
                        style={{ borderRadius: '8px' }}
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label fw-bold text-muted">Mini Tarefas</label>
                    {tarefa.miniTarefas && tarefa.miniTarefas.length > 0 ? (
                        tarefa.miniTarefas.map((miniTarefa, index) => (
                            <input 
                                key={index} 
                                type="text" 
                                className="form-control form-control-lg border-primary mb-2" 
                                value={miniTarefa.descricao} 
                                disabled
                                style={{ borderRadius: '8px' }}
                            />
                        ))
                    ) : (
                        <p>Nenhuma mini tarefa cadastrada.</p>
                    )}
                </div>
                <div className="mb-3">
                    <label className="form-label fw-bold text-muted">Anexos</label>
                    {tarefa.anexos && tarefa.anexos.length > 0 ? (
                        tarefa.anexos.map((anexo, index) => (
                            <div key={index} className="mb-2">
                                <a 
                                    href={anexo.url_arquivo} 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="text-decoration-none"
                                >
                                    {anexo.caminho_arquivo}
                                </a>
                            </div>
                        ))
                    ) : (
                        <p>Nenhum anexo cadastrado.</p>
                    )}
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