import { useState } from 'react';
import { Header } from './Header';
import { Footer } from './Footer';
import { Footer_D } from '../Fragments/Footer_D';

import "../static/Criacao.css";

export const Criacao = () => {
	const [nome, setNome] = useState('');
	const [descricao, setDescricao] = useState('');
	const [data, setData] = useState('');
	const [ordem, setOrdem] = useState('');
	// tem 3 opcoes
	const [miniTarefas, setMiniTarefas] = useState(['', '', '']);
	const [anexos, setAnexos] = useState([]);
	/* Evitar que o formulário recarregue a página ao ser submetido.
Registrar no console os dados capturados (provavelmente armazenados em um estado React).
Dependendo de onde esse código está inserido, pode haver um objetivo maior, como salvar esses dados em um banco de dados, enviá-los para uma API ou atualizar o estado global da aplicação. */

	const handleSubmit = (e) => {
		e.preventDefault();
		console.log({ nome, descricao, data, ordem, miniTarefas, anexos });
	};

    return (
        <div id="controle" className="container my-1">
      <Header/>
      <div className="card p-4 border border-2 border-dark shadow-sm">
        <h2 className="text-center mb-3">Criação e Edição</h2>
        <form>
          <div className="mb-3">
            <label htmlFor="nome" className="form-label">Nome</label>
            <input 
              type="text" 
              className="form-control" 
              id="nome" 
              placeholder="Digite o nome" 
              value={nome} 
              onChange={(e) => setNome(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="descricao" className="form-label">Descrição</label>
            <textarea 
              className="form-control" 
              id="descricao" 
              rows="3" 
              placeholder="Digite a descrição" 
              value={descricao} 
              onChange={(e) => setDescricao(e.target.value)}
            ></textarea>
          </div>
          <div className="mb-3">
            <label className="form-label">Data</label>
            <div className="input-group">
              <input 
                type="text" 
                className="form-control" 
                placeholder="MM/DD/YYYY" 
                value={data} 
                onChange={(e) => setData(e.target.value)}
              />
              <span className="input-group-text">📅</span>
            </div>
          </div>
          <div className="mb-3">
            <label className="form-label">Ordem</label>
            <div>
              <input type="radio" name="ordem" id="alto" value="Alto" onChange={(e) => setOrdem(e.target.value)} /> <label htmlFor="alto">Alto</label>
              <input type="radio" name="ordem" id="medio" value="Médio" onChange={(e) => setOrdem(e.target.value)} /> <label htmlFor="medio">Médio</label>
              <input type="radio" name="ordem" id="baixo" value="Baixo" onChange={(e) => setOrdem(e.target.value)} /> <label htmlFor="baixo">Baixo</label>
            </div>
          </div>
          <div className="mb-3">
            <label className="form-label">MiniTarefas</label>
            {miniTarefas.map((tarefa, index) => (
              <input 
                key={index} 
                type="text" 
                className="form-control mb-2" 
                placeholder={`Tarefa ${index + 1}`} 
                value={tarefa} 
                onChange={(e) => {
                  const novasTarefas = [...miniTarefas];
                  novasTarefas[index] = e.target.value;
                  setMiniTarefas(novasTarefas);
                }}
              />
            ))}
          </div>
          <div className="mb-3">
            <label className="form-label">Anexos</label>
            <button className="btn btn-custom w-100">Adicionar Arquivo</button>
          </div>
          <button type="submit" className="btn btn-primary w-100 cor-botao">Salvar</button>
        </form>
      </div>
      <Footer_D/>
    </div>
  )
};
