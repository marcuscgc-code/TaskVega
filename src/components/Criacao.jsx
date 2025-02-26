import React, { useState } from 'react';
import axios from 'axios';
import { Header } from '../Fragments/Header';
import { Footer_Cria } from '../Fragments/Footer_Cria';
import "../static/Criacao.css";

export const Criacao = () => {
    const [nome, setNome] = useState('');
    const [descricao, setDescricao] = useState('');
    const [data, setData] = useState('');
    const [ordem, setOrdem] = useState('');
    const [miniTarefas, setMiniTarefas] = useState(['', '', '']);
    const [anexos, setAnexos] = useState([]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Dados da tarefa principal
        const dadosTarefa = {
            nome,
            descricao,
            data_prazo: data,
            prioridade: ordem,
            miniTarefas: miniTarefas
                .filter(tarefa => tarefa.trim() !== '') // Filtra mini tarefas vazias
                .map(descricao => ({ descricao })), // Formata as mini tarefas para o backend
            anexos, // Anexos selecionados
        };

        try {
            const token = localStorage.getItem('token'); // Recupera o token do localStorage

            // Envia os dados para o backend
            const response = await axios.post('http://localhost:8000/api/tarefas', dadosTarefa, {
                headers: {
                    'Authorization': token // Envia o token no cabeçalho
                }
            });

            console.log('Tarefa criada com sucesso:', response.data);
            alert('Tarefa criada com sucesso!');

            // Limpa o formulário após a criação
            setNome('');
            setDescricao('');
            setData('');
            setOrdem('');
            setMiniTarefas(['', '', '']);
            setAnexos([]);
        } catch (error) {
            console.error('Erro ao criar tarefa:', error.response?.data);
            alert('Erro ao criar tarefa. Tente novamente.');
        }
    };

    const handleMiniTarefaChange = (index, value) => {
        const novasTarefas = [...miniTarefas];
        novasTarefas[index] = value;
        setMiniTarefas(novasTarefas);
    };

    const handleAnexoChange = (e) => {
        const files = e.target.files;
        if (files && files.length > 0) {
            const novosAnexos = [...anexos];
            for (let i = 0; i < files.length; i++) {
                novosAnexos.push({
                    nome: files[i].name,
                    arquivo: files[i],
                });
            }
            setAnexos(novosAnexos);
        }
    };

    return (
        <div id="controle" className="container-fluid d-flex flex-column min-vh-100">
            <Header />
            <div className="card p-4 border border-2 border-dark shadow-sm mb-auto mx-auto" style={{ maxWidth: '600px', width: '100%' }}>
                <h2 className="text-center mb-3 d-flex align-items-center justify-content-center">
                    Criação e Edição <span style={{ fontSize: '20px', marginLeft: '5px' }}>✏️</span>
                </h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="nome" className="form-label fw-bold text-muted">Nome</label>
                        <input 
                            type="text" 
                            className="form-control form-control-lg border-primary" 
                            id="nome" 
                            placeholder="Digite o nome" 
                            value={nome} 
                            onChange={(e) => setNome(e.target.value)}
                            style={{ borderRadius: '8px' }}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="descricao" className="form-label fw-bold text-muted">Descrição</label>
                        <textarea 
                            className="form-control form-control-lg border-primary" 
                            id="descricao" 
                            rows="3" 
                            placeholder="Digite a descrição" 
                            value={descricao} 
                            onChange={(e) => setDescricao(e.target.value)}
                            style={{ borderRadius: '8px' }}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label fw-bold text-muted">Data</label>
                        <div className="input-group">
                            <input 
                                type="date" 
                                className="form-control form-control-lg border-primary" 
                                placeholder="MM/DD/YYYY" 
                                value={data} 
                                onChange={(e) => setData(e.target.value)}
                                style={{ borderRadius: '8px 0 0 8px' }}
                                required
                            />
                            <span className="input-group-text bg-primary text-white" style={{ borderRadius: '0 8px 8px 0' }}>📅</span>
                        </div>
                    </div>
                    <div className="mb-3">
                        <label className="form-label fw-bold text-muted">Ordem</label>
                        <div className="d-flex gap-3 mb-2">
                            <div className="form-check">
                                <input 
                                    type="radio" 
                                    className="form-check-input border-primary custom-radio" 
                                    id="alto" 
                                    name="ordem" 
                                    value="Alta" 
                                    checked={ordem === 'Alta'} 
                                    onChange={(e) => setOrdem(e.target.value)}
                                    required
                                />
                                <label className="form-check-label text-primary" htmlFor="alto">Alto</label>
                            </div>
                            <div className="form-check">
                                <input 
                                    type="radio" 
                                    className="form-check-input border-primary custom-radio" 
                                    id="medio" 
                                    name="ordem" 
                                    value="Média" 
                                    checked={ordem === 'Média'} 
                                    onChange={(e) => setOrdem(e.target.value)}
                                />
                                <label className="form-check-label text-primary" htmlFor="medio">Médio</label>
                            </div>
                            <div className="form-check">
                                <input 
                                    type="radio" 
                                    className="form-check-input border-primary custom-radio" 
                                    id="baixo" 
                                    name="ordem" 
                                    value="Baixa" 
                                    checked={ordem === 'Baixa'} 
                                    onChange={(e) => setOrdem(e.target.value)}
                                />
                                <label className="form-check-label text-primary" htmlFor="baixo">Baixo</label>
                            </div>
                        </div>
                    </div>
                    <div className="mb-3">
                        <label className="form-label fw-bold text-muted">MiniTarefas</label>
                        {miniTarefas.map((tarefa, index) => (
                            <input 
                                key={index} 
                                type="text" 
                                className="form-control form-control-lg border-primary mb-2" 
                                placeholder={`Tarefa ${index + 1}`} 
                                value={tarefa} 
                                onChange={(e) => handleMiniTarefaChange(index, e.target.value)}
                                style={{ borderRadius: '8px' }}
                            />
                        ))}
                    </div>
                    <div className="mb-3">
                        <label className="form-label fw-bold text-muted">Anexos</label>
                        <input 
                            type="file" 
                            className="form-control form-control-lg border-primary" 
                            onChange={handleAnexoChange}
                            multiple // Permite selecionar vários arquivos
                            style={{ borderRadius: '8px' }}
                        />
                    </div>
                    <button type="submit" className="btn btn-primary w-100 py-3 cor-botao mb-4" style={{ borderRadius: '8px' }}>Salvar</button>
                </form>
            </div>
            <Footer_Cria />
        </div>
    );
};