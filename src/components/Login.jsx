import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Importe o useNavigate
import axios from 'axios';
import { Footer } from "../Fragments/Footer";
import { Header } from "../Fragments/Header";
import "../static/Login.css";

export const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate(); // Hook para redirecionamento

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8000/api/login/', {
                email,
                password,
            });

            console.log('Login bem-sucedido:', response.data);

            // Salva o token no localStorage (se estiver usando JWT)
            if (response.data.access_token) {
                localStorage.setItem('access_token', response.data.access_token);
                localStorage.setItem('refresh_token', response.data.refresh_token);
            }

            // Redireciona para a tela "Controle"
            navigate('/controle');
        } catch (error) {
            console.error('Erro no login:', error.response?.data);
            alert('Erro no login. Verifique suas credenciais.');
        }
    };

    return (
        <>
            <div
                className="container d-flex justify-content-center align-items-center p-2"
                style={{
                    height: "100vh",
                    width: "100vw",
                }}
            >
                <div
                    className="p-4 shadow-sm"
                    style={{ width: "100%", height: "100%" }}
                >
                    <Header />
                    <div className="form_container">
                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label htmlFor="email" className="form-label email">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    className="form-control"
                                    id="email"
                                    placeholder="Digite seu email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="senha" className="form-label senha">
                                    Senha
                                </label>
                                <input
                                    type="password"
                                    className="form-control"
                                    id="senha"
                                    placeholder="Digite sua senha"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                            <a
                                href="#"
                                className="d-block mb-3 text-primary text-decoration-none"
                            >
                                Esqueceu a senha?
                            </a>
                            <button type="submit" className="btn btn-primary w-100">
                                Login
                            </button>
                        </form>
                        <hr />
                        <div className="text-center my-3">Ou</div>
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