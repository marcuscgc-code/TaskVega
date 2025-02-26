import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Footer } from "../Fragments/Footer";
import { Header } from "../Fragments/Header";
import "../static/Cadastro.css";

export const Cadastro = () => {
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [erro, setErro] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!nome.trim()) {
            setErro('Por favor, informe o nome.');
            return;
        }

        if (password !== confirmPassword) {
            setErro('As senhas não coincidem!');
            return;
        }

        try {
            const response = await axios.post('http://localhost:8000/api/cadastro', {
                nome,
                email,
                password,
            });

            console.log('Cadastro bem-sucedido:', response.data);
            alert('Cadastro realizado com sucesso!');
            navigate('/login');
        } catch (error) {
            console.error('Erro no cadastro:', error.response?.data);
            if (error.response?.data?.message === 'Email já cadastrado') {
                setErro('Este email já está cadastrado. Por favor, use outro email.');
            } else {
                setErro('Erro no cadastro. Verifique os dados e tente novamente.');
            }
        }
    };

    return (
        <>
            <div
                className="cadastro-page container d-flex justify-content-center align-items-center p-2"
                style={{
                    height: "100vh",
                    width: "100vw",
                }}
            >
                <div
                    className="p-4 shadow-sm fundo_img"
                    style={{ width: "100%", height: "100%" }}
                >
                    <Header />
                    <div className="form_container">
                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label htmlFor="nome" className="text-white form-label">
                                    Nome
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="nome"
                                    placeholder="Digite seu nome"
                                    value={nome}
                                    onChange={(e) => {
                                        setNome(e.target.value);
                                        setErro('');
                                    }}
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="email" className="text-white form-label">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    className="form-control"
                                    id="email"
                                    placeholder="Digite seu email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="senha" className="text-white form-label">
                                    Senha
                                </label>
                                <input
                                    type="password"
                                    className="form-control"
                                    id="senha"
                                    placeholder="Digite sua senha"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="confirmar-senha" className="text-white form-label">
                                    Confirmar Senha
                                </label>
                                <input
                                    type="password"
                                    className="form-control"
                                    id="confirmar-senha"
                                    placeholder="Confirme sua senha"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    required
                                />
                            </div>
                            {erro && <div className="alert alert-danger">{erro}</div>}
                            <button type="submit" className="text-white btn btn-primary w-100">
                                Cadastrar
                            </button>
                        </form>
                        <hr />
                        <div className="text-white text-center my-3">Ou</div>
                        <button className="btn btn-custom btn-dark w-100 mb-2">Google</button>
                        <button className="btn btn-custom btn-dark w-100">Facebook</button>
                    </div>
                    <div className="testeAltura">
                        <Footer />
                    </div>
                </div>
            </div>
        </>
    );
};