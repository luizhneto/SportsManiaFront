import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { APP_ROUTES } from "../utils/constants";
import jogador2 from "../assets/jogador2.png"; // Imagem ilustrativa

const SignUp = () => {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("https://sportsmaniaback.onrender.com/api/persons/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: 0,
          username: nome,
          password,
          email,
          personType: "ADMIN" // ou "USER", conforme sua regra
        }),
      });

      if (response.ok) {
        alert("Usuário cadastrado com sucesso!");
        navigate(APP_ROUTES.SIGN_IN);
      } else {
        alert("Erro ao cadastrar usuário.");
      }
    } catch (error) {
      alert("Erro ao cadastrar usuário.");
      console.error(error);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center"
      style={{
        background: "linear-gradient(to bottom right, #b81414, #ff4d4d)",
        overflow: "hidden",
      }}
    >
      {/* Wallpaper esportivo desfocado e transparente */}
      <img
        src="https://img.freepik.com/fotos-gratis/ferramentas-esportivas_53876-138077.jpg"
        alt="Wallpaper esportivo"
        className="absolute inset-0 w-full h-full object-cover"
        style={{
          filter: "blur(6px)",
      
          zIndex: 0,
        }}
      />
      <div className="bg-white rounded-3xl shadow-lg flex w-full max-w-3xl overflow-hidden relative z-10 flex-row-reverse">
        {/* Formulário do lado direito */}
        <div className="flex-1 flex flex-col justify-center px-12 py-16">
          <h2
            className="text-3xl font-bold mb-8 text-center"
            style={{ color: "#b81414" }}
          >
            CRIE SUA CONTA
          </h2>
          <form onSubmit={handleRegister} className="flex flex-col gap-6">
            <input
              type="text"
              placeholder="Nome Completo"
              className="rounded-full px-6 py-3 border border-gray-300 focus:outline-none focus:ring-2 text-lg"
              style={{ focus: { borderColor: "#b81414" } }}
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              required
            />
            <input
              type="email"
              placeholder="E-mail"
              className="rounded-full px-6 py-3 border border-gray-300 focus:outline-none focus:ring-2 text-lg"
              style={{ focus: { borderColor: "#b81414" } }}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Senha"
              className="rounded-full px-6 py-3 border border-gray-300 focus:outline-none focus:ring-2 text-lg"
              style={{ focus: { borderColor: "#b81414" } }}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              type="submit"
              className="rounded-full py-3 text-white font-bold text-lg tracking-wider shadow-md hover:scale-105 transition"
              style={{
                background: "#b81414",
                boxShadow: "0 2px 8px 0 #b8141440",
              }}
            >
              REGISTRAR
            </button>
          </form>
          <div className="mt-8 text-center">
            <span className="text-gray-600">Já tem uma conta?</span>
            <button
              className="ml-2 font-semibold hover:underline"
              style={{ color: "#b81414" }}
              onClick={() => navigate(APP_ROUTES.SIGN_IN)}
            >
              Entrar
            </button>
          </div>
        </div>
        {/* Imagem ilustrativa ao lado esquerdo */}
        <div
          className="hidden md:flex flex-1 items-center justify-center relative"
          style={{ background: "#b81414" }}
        >
          <img
            src={jogador2}
            alt="Soccer player illustration"
            className="object-contain max-h-[420px] max-w-[360px] drop-shadow-lg"
            style={{
              margin: "0 auto",
              display: "block",
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default SignUp;
