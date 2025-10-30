import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { APP_ROUTES } from "../utils/constants";
import jogador1 from "../assets/jogador1.png";

const SignIn = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("https://sportsmaniaback.onrender.com/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          password,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem("token", data.token);
        localStorage.setItem("clienteId", data.id);
        localStorage.setItem("clienteNome", data.username);
        navigate(APP_ROUTES.HOME_PAGE);
      } else {
        alert("E-mail ou senha inválidos.");
      }
    } catch (error) {
      alert("Erro ao fazer login.");
      console.error(error);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-500 to-red-700 relative"
      style={{
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
      <div className="bg-white rounded-3xl shadow-lg flex w-full max-w-3xl overflow-hidden relative z-10">
        {/* Formulário */}
        <div className="flex-1 flex flex-col justify-center px-12 py-16">
          <h2 className="text-3xl font-bold text-blue-600 mb-8 text-center">
            BEM VINDO AO SPORTS MANIA
          </h2>
          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            <input
              type="text"
              placeholder="Nome de usuário"
              className="rounded-full px-6 py-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 text-lg"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Senha"
              className="rounded-full px-6 py-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 text-lg"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <div className="flex items-center justify-between text-sm text-gray-500 px-2">
              <label className="flex items-center gap-2">
                <input type="checkbox" className="accent-blue-500" />
                Lembrar
              </label>
              <button
                type="button"
                className="text-blue-600 hover:underline"
                onClick={() => alert("Recuperação de senha não implementada")}
              >
                Esqueceu a senha?
              </button>
            </div>
            <button
              type="submit"
              className="rounded-full py-3 bg-blue-600 text-white font-bold text-lg tracking-wider shadow-md hover:bg-blue-700 hover:scale-105 transition"
            >
              ENTRAR
            </button>
          </form>
          <div className="mt-8 text-center">
            <span className="text-gray-600">Não tem uma conta?</span>
            <button
              className="ml-2 text-blue-600 font-semibold hover:underline"
              onClick={() => navigate(APP_ROUTES.SIGN_UP)}
            >
              Cadastre-se
            </button>
          </div>
        </div>
        {/* Imagem ilustrativa ao lado direito */}
        <div className="hidden md:flex flex-1 items-center justify-center bg-blue-600 relative">
          <img
            src={jogador1}
            alt="Soccer player illustration"
            className="object-contain max-h-[500px] max-w-[360px] drop-shadow-lg rounded-2xl"
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

export default SignIn;