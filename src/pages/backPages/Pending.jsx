import React from "react";
import { useNavigate } from "react-router-dom";

const Pending = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-yellow-50">
      <h1 className="text-4xl font-bold text-yellow-700 mb-4">Pagamento pendente</h1>
      <p className="text-lg text-gray-700 mb-8">
        Seu pagamento está em análise ou aguardando confirmação. Você será notificado assim que for aprovado.
      </p>
      <button
        onClick={() => navigate("/")}
        className="px-6 py-3 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 transition"
      >
        Voltar para a Home
      </button>
    </div>
  );
};

export default Pending;