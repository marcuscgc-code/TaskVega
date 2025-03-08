
import "../static/Desafio.css";
import { FaHome, FaSearch, FaPlus, FaCog, FaUser } from "react-icons/fa";

export const Footer_D = () => {
  return (
    <footer className="footer-container">
      <nav className="footer-nav">
      <a
                    href="#" 
                    className="footer-item"
                    onClick={(e) => {
                        e.preventDefault(); // Evita o comportamento padrão do link
                        navigate("/controle"); // Navega para a tela "Controle"
                    }}
                >
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
