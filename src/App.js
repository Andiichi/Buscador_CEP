import React from "react";
import { FiSearch } from "react-icons/fi";
import "../src/style.css";
import { useState } from "react";
import api from "./api";



function App() {
  const [input, setInput] = useState("");
  const [cep, setCep] = useState({});

  async function handlesearch() {
    //01310930

    if (input === "") {
      alert("Preencha algum cep!");
      return;
    }

    try {
      //coloca o cep na parte numero da URL para pesquisar
      const response = await api.get(`${input}/json`);
      setCep(response.data);
      setInput("");
    } catch {
      alert("Ops erro ao buscar cep informado!!");
      setInput("");
    }
  }

  function refreshPage(){ 
    window.location.reload(); 
}

  return (
    <div className="container">
      <h2 className="title">Buscador de CEP</h2>

      <div className="containerinput">
        <input
          type="text"
          placeholder="Digite seu cep..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />

        <button className="buttonsearch" onClick={handlesearch}>
          <FiSearch size={25} color="#fff" />
        </button>
      </div>

      {Object.keys(cep).length > 0 && (
        <main className="main">
          <h2>CEP: {cep.cep}</h2>

          <span>Logradouro: {cep.logradouro}</span>
          <span>Complemento: {cep.complemento}</span>
          <span>Bairro: {cep.bairro}</span>
          <span>Cidade: {cep.localidade}</span>
          <span>UF: {cep.uf}</span>
          <button className="buttonlimpar" type="button" onClick={ refreshPage }>
            <span>Atualizar Página</span>
          </button> 
        </main>
      )};
    </div>
  );
}

export default App;
