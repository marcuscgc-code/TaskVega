
import { ProgressBar } from "react-bootstrap";
import { Footer_D } from "../Fragments/Footer_D";
import { Header_D } from "../Fragments/Header_D";
import { Header } from "./Header";
import "../static/Desafio.css";

export const Desafio = () => {
  return (
    <div className="container-fluid main-container">
          <Header/>
      
      <div className="content p-3">
        <div className="profile-section d-flex justify-content-between align-items-center">
          <div className="profile-info">
            <img src="profile.jpg" alt="Perfil" className="profile-pic" />
            <span className="profile-name">Perfil👑</span>
          </div>
          <div className="icons d-flex">
            <button className="icon-button"></button>
            <button className="icon-button"></button>
          </div>
        </div>

        <div className="level-card p-3">
          <div className="level-header d-flex justify-content-between">
            <span className="level-title">LEVEL</span>
            <span className="level-badge">21⭐</span>
          </div>
          <ProgressBar now={60} className="progress-custom" />
        </div>

        <div className="stats-card p-3">
          <div className="stat-item">CONCLUÍDAS <ProgressBar now={70} className="progress-custom" /></div>
          <div className="stat-item">ESPECIAIS <ProgressBar now={50} className="progress-custom" /></div>
          <div className="stat-item">DESAFIOS <ProgressBar now={40} className="progress-custom" /></div>
        </div>

        <div className="tasks-section p-3">
          <h3 className="tasks-title">Tarefas</h3>
          <table className="table">
            <tbody>
              <tr><td>✔ Name</td><td>Subject line...</td><td className="text-danger">Today at</td></tr>
              <tr><td>⭐ Name</td><td>Subject line...</td><td className="text-danger">Amanhã</td></tr>
              <tr><td>☆ Name</td><td>Subject line...</td><td className="text-danger">Dia 28</td></tr>
              <tr><td>⭐ Name</td><td>Subject line...</td><td className="text-danger">23 FEV</td></tr>
            </tbody>
          </table>
        </div>
      </div>

      <Footer_D />
    </div>
  );
};
