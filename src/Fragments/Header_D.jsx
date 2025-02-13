
import "../static/Desafio.css"; // Certifique-se de criar este arquivo CSS

export const Header_D = () => {
  return (
    <header className="header">
      <div className="profile">
        <img src="/path-to-profile.jpg" alt="Perfil" className="profile-img" />
        <span className="crown">👑</span>
      </div>
      <div className="header-icons">
        <button className="icon-button"><i className="bi bi-lightbulb" /></button>
        <button className="icon-button"><i className="bi bi-heart" /></button>
      </div>
    </header>
  );
};
