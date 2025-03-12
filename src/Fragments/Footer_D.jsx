import "../static/Desafio.css";
import { FaHome, FaSearch, FaPlus, FaCog, FaUser } from "react-icons/fa";
import { useNavigate } from "react-router-dom"; // Adicione esta linha

export const Footer_D = () => {
  const navigate = useNavigate(); // Adicione esta linha

  return (
    <footer className="footer-container">
      <nav className="footer-nav">
        <a
          href="#"
          className="footer-item"
          onClick={(e) => {
            e.preventDefault();
            navigate("/controle"); // Agora funciona corretamente
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