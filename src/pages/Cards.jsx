import React, { useState } from 'react';
import NavBar from "../components/NavBar";
import AddCard from "./AddCard"; 

const Cards = () => {
  const [mostrarFormulario, setMostrarFormulario] = useState(false); // Controla a exibição do formulário

  // Função para retornar à tela de "Meus Cartões"
  const handleVoltar = () => {
    setMostrarFormulario(false); // Esconde o formulário e mostra a tela de "Meus Cartões"
  };

  return (
    <>
      <NavBar />
      <div className="p-8">
        {/* Botão no topo à direita */}
        <div className="flex justify-between items-center mb-8">
          <div className="text-center w-full">
            {/* Condicional para mostrar o texto ou o formulário */}
            {!mostrarFormulario ? (
              <div className="mt-64 text-center">
                <h1 className="text-2xl font-bold mb-2">Meus Cartões</h1>
                <p className="text-gray-600">Você ainda não possui nenhum cartão cadastrado.</p>
              </div>
            ) : (
              <div className="text-center">
                <h1 className="text-2xl font-bold mb-2">Adicionando Cartão</h1>
              </div>
            )}
          </div>

          {/* Botão no topo */}
          <div className="absolute right-8 top-28">
            {!mostrarFormulario ? (
              <button
                onClick={() => setMostrarFormulario(true)} // Exibe o formulário
                className="bg-yellow-400 hover:bg-yellow-500 text-white font-bold py-2 px-4 rounded"
              >
                Adicionar Cartão
              </button>
            ) : (
              <button
                onClick={handleVoltar} // Volta para "Meus Cartões"
                className="bg-gray-400 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded"
              >
                Voltar para Meus Cartões
              </button>
            )}
          </div>
        </div>

        {/* Renderiza AddCard quando mostrarFormulario for true */}
        {mostrarFormulario && <AddCard />}
      </div>
    </>
  );
};

export default Cards;
