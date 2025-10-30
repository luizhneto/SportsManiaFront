import React, { useState } from "react";
import { APP_ROUTES } from "../utils/constants";
import Navbar from "../components/NavBar";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";

const Contact = () => {
  const [email, setEmail] = useState('');
  const [nome, setNome] = useState('');
  const [telefone, setTelefone] = useState('');
  const [mensagem, setMensagem] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ nome, email, telefone, mensagem });
  };

  return (
    <>
      <Navbar />
      <div className="max-w-[80%] mx-auto">
        

        <div className="flex flex-col items-center justify-start mt-8 p-5 box-border">
          <h2 className="text-2xl mb-4">Fale Conosco</h2>
          <form onSubmit={handleSubmit} className="flex flex-col w-[500px]">
            <div className="mb-4">
              <label htmlFor="nome" className="block mb-1">Nome:</label>
              <input
                type="text"
                id="nome"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                required
                className="p-2 border border-gray-700 rounded w-full bg-gray-300/60"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block mb-1">Email:</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="p-2 border border-gray-700 rounded w-full bg-gray-300/60"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="telefone" className="block mb-1">Telefone:</label>
              <input
                type="tel"
                id="telefone"
                value={telefone}
                onChange={(e) => setTelefone(e.target.value)}
                required
                className="p-2 border border-gray-700 rounded w-full bg-gray-300/60"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="mensagem" className="block mb-1">Mensagem:</label>
              <textarea
                id="mensagem"
                value={mensagem}
                onChange={(e) => setMensagem(e.target.value)}
                required
                className="p-2 border border-gray-700 rounded w-full bg-gray-300/60"
              />
            </div>
            <button
              type="submit"
              className="p-2 bg-yellow-400 text-white rounded cursor-pointer hover:bg-yellow-800"
            >
              Enviar
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Contact;