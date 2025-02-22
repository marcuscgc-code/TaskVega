import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { Login } from "./components/Login";
import {Controle} from "./components/Controle";
import { Notificacoes } from "./components/Notificacao";
import { Criacao } from "./components/Criacao";
import { Desafio } from "./components/Desafios";
import { Visao } from "./components/Visao"

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Login/>
    </>
  );
}

export default App;
