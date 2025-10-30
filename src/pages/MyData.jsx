import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/NavBar";
import { FaMapMarkerAlt, FaUser, FaBoxOpen, FaSignOutAlt } from "react-icons/fa";

const MyData = () => {
  const navigate = useNavigate();
  const [cliente, setCliente] = useState({
    username: "",
    email: "",
  });

  useEffect(() => {
    const personId = localStorage.getItem("clienteId");
    const token = localStorage.getItem("token");
    if (personId && token) {
      fetch(`https://sportsmaniaback.onrender.com/api/persons/${personId}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((res) => res.json())
        .then((data) => {
          setCliente({
            username: data.username || "",
            email: data.email || "",
          });
        });
    }
  }, []);

  // Sidebar navigation
  const navOptions = [
   
    {
      label: "Seus dados",
      icon: <FaUser className="mr-2" />,
      onClick: () => {},
      active: true,
    },
    {
      label: "Endereços",
      icon: <FaMapMarkerAlt className="mr-2" />,
      onClick: () => navigate("/addressUpdate"),
      active: false,
    },
    {
      label: "Sair",
      icon: <FaSignOutAlt className="mr-2" />,
      onClick: () => {
        localStorage.clear();
        navigate("/signin"); // Altere para o caminho correto da página de login
      },
      active: false,
    },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-[#fafafa]">
      <Navbar />

      <div className="flex flex-1 w-full max-w-7xl mx-auto pt-10 pb-20 gap-8">
        {/* Sidebar */}
        <aside className="w-64 bg-white rounded-2xl shadow p-6 flex flex-col gap-2 h-fit">
          {navOptions.map((opt) => (
            <button
              key={opt.label}
              onClick={opt.onClick}
              className={`flex items-center px-4 py-3 rounded-lg text-left font-medium text-lg transition 
                ${opt.active ? "bg-blue-700 text-white" : "hover:bg-gray-100 text-gray-700"}`}
            >
              {opt.icon}
              {opt.label}
            </button>
          ))}
        </aside>

        {/* Conteúdo principal */}
        <main className="flex-1">
          <h1 className="text-3xl font-bold mb-8">Seus Dados</h1>
          <div className="bg-white rounded-xl shadow p-8 max-w-xl">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">Dados pessoais</h2>
            <div className="space-y-6">
              <div>
                <label className="block font-semibold mb-1">Nome completo</label>
                <input
                  type="text"
                  value={cliente.username}
                  className="w-full border border-blue-300 rounded-lg p-3 bg-gray-100 text-blue-900"
                  disabled
                  readOnly
                />
              </div>
              <div>
                <label className="block font-semibold mb-1">E-mail</label>
                <input
                  type="email"
                  value={cliente.email}
                  className="w-full border border-blue-300 rounded-lg p-3 bg-gray-100 text-blue-900"
                  disabled
                  readOnly
                />
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default MyData;