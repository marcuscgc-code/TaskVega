import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom'; // Importe o Link
import axios from 'axios';
import { Footer } from "../Fragments/Footer";
import { Header } from "../Fragments/Header";
import "../static/Login.css";

export const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [erro, setErro] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://192.168.15.6:8000/api/login', {
                email,
                password,
            });
            console.log('Login bem-sucedido:', response.data);

            // Armazena o token no localStorage
            localStorage.setItem('token', response.data.token);

            // Armazena os dados do usuário no localStorage (opcional)
            localStorage.setItem('user', JSON.stringify(response.data.user));

            // Redireciona para a tela de controle
            navigate('/controle');
        } catch (error) {
            console.error('Erro no login:', error.response?.data);
            setErro('Erro no login. Verifique suas credenciais.');
        }
    };

    return (
        <>
            <div
                className="login-page container d-flex justify-content-center align-items-center p-2"
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
                                <label htmlFor="email" className="text-white form-label email">
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
                                <label htmlFor="senha" className="form-label senha text-white">
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
                            {erro && <div className="alert alert-danger">{erro}</div>}
                            <button type="submit" className="text-white btn btn-primary w-100">
                                Login
                            </button>
                        </form>
                        {/* Link para a tela de cadastro */}
                        <div className="text-center mt-3">
                            <Link to="/cadastro" className="text-white">
                                Cadastre-se
                            </Link>
                        </div>
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