import "../static/Criacao.css";
import { FaHome, FaSearch, FaPlus, FaCog, FaUser } from "react-icons/fa";

export const Footer_Cria = () => {
    return (
        <footer className="footer-container">
            <nav className="footer-nav">
                <a href="#" className="footer-item">
                    <FaHome className="footer-icon" />
                    <span>Home</span>
                </a>
                <a href="#" className="footer-item">
                    <FaSearch className="footer-icon" />
                    <span>Pesquisar</span>
                </a>
                <a href="#" className="footer-item">
                    <FaPlus className="footer-icon" />
                    <span>Novo</span>
                </a>
                <a href="#" className="footer-item">
                    <FaCog className="footer-icon" />
                    <span>Configurações</span>
                </a>
                <a href="#" className="footer-item">
                    <FaUser className="footer-icon" />
                    <span>Perfil</span>
                </a>
            </nav>
        </footer>
    );
};