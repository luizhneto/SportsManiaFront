import React from "react";
import { useNavigate } from "react-router-dom";

const Failure = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-red-50">
      <h1 className="text-4xl font-bold text-red-700 mb-4">Pagamento não realizado</h1>
      <p className="text-lg text-gray-700 mb-8">
        Ocorreu um erro ao processar seu pagamento. Tente novamente ou escolha outro método.
      </p>
      <button
        onClick={() => navigate("/")}
        className="px-6 py-3 bg-red-600 text-white rounded-md hover:bg-red-700 transition"
      >
        Voltar para a Home
      </button>
    </div>
  );
};

export default Failure;