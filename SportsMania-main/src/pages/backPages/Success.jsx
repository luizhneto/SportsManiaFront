import React from "react";
import { useNavigate } from "react-router-dom";

const Success = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-green-50">
      <h1 className="text-4xl font-bold text-green-700 mb-4">Pagamento realizado com sucesso!</h1>
      <p className="text-lg text-gray-700 mb-8">
        Obrigado por sua compra. Seu pedido está sendo processado.
      </p>
      <button
        onClick={() => navigate("/")}
        className="px-6 py-3 bg-green-600 text-white rounded-md hover:bg-green-700 transition"
      >
        Voltar para a Home
      </button>
    </div>
  );
};

export default Success;