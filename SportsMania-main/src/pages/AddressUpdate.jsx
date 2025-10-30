import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/NavBar";
import { FaMapMarkerAlt, FaUser, FaBoxOpen, FaSignOutAlt, FaEdit } from "react-icons/fa";

const AddressUpdate = () => {
  const navigate = useNavigate();
  const [cep, setCep] = useState("");
  const [rua, setRua] = useState("");
  const [numero, setNumero] = useState("");
  const [bairro, setBairro] = useState("");
  const [cidade, setCidade] = useState("");
  const [uf, setUf] = useState("");
  const [mensagem, setMensagem] = useState("");
  const [savedAddress, setSavedAddress] = useState(null);

  useEffect(() => {
    // Busca endereço salvo do usuário
    const personId = localStorage.getItem("clienteId");
    const token = localStorage.getItem("token");
    if (personId && token) {
      fetch(`https://sportsmaniaback.onrender.com/api/persons/${personId}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data && data.endereco) {
            setSavedAddress(data.endereco);
          }
        });
    }
  }, []);

  const handleEdit = () => {
    if (savedAddress) {
      setCep(savedAddress.cep || "");
      setRua(savedAddress.rua || "");
      setNumero(savedAddress.numero || "");
      setBairro(savedAddress.bairro || "");
      setCidade(savedAddress.cidade || "");
      setUf(savedAddress.uf || "");
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const personId = localStorage.getItem("clienteId");
    const token = localStorage.getItem("token");
    if (!personId || !token) {
      setMensagem("Faça login para atualizar o endereço.");
      return;
    }

    const endereco = {
      cep,
      rua,
      numero,
      bairro,
      cidade,
      uf,
    };

    try {
      const response = await fetch(
        `https://sportsmaniaback.onrender.com/api/persons/${personId}/endereco`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(endereco),
        }
      );
      if (response.ok) {
        setMensagem("Endereço atualizado com sucesso!");
        setSavedAddress(endereco);
      } else {
        setMensagem("Erro ao atualizar endereço.");
      }
    } catch (error) {
      setMensagem("Erro ao atualizar endereço.");
    }
  };

  // Sidebar navigation
  const navOptions = [
  
    {
      label: "Seus dados",
      icon: <FaUser className="mr-2" />,
      onClick: () => navigate("/dados"),
      active: false,
    },
    {
      label: "Endereços",
      icon: <FaMapMarkerAlt className="mr-2" />,
      onClick: () => {},
      active: true,
    },
    {
      label: "Sair",
      icon: <FaSignOutAlt className="mr-2" />,
      onClick: () => {
        localStorage.clear();
        navigate("/signin");
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
          <h1 className="text-3xl font-bold mb-8">Endereços</h1>
          {/* Formulário de adicionar/editar endereço */}
          <div className="bg-white rounded-xl shadow p-8 max-w-xl">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">Adicionar / Editar Endereço</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="flex gap-4">
                <input
                  type="text"
                  placeholder="CEP"
                  value={cep}
                  onChange={(e) => setCep(e.target.value)}
                  className="w-1/2 border border-blue-300 rounded-lg p-4 focus:ring-2 focus:ring-blue-400 outline-none transition bg-white text-blue-900"
                  required
                />
                <input
                  type="text"
                  placeholder="UF"
                  value={uf}
                  onChange={(e) => setUf(e.target.value)}
                  className="w-1/2 border border-blue-300 rounded-lg p-4 focus:ring-2 focus:ring-blue-400 outline-none transition bg-white text-blue-900"
                  maxLength={2}
                  required
                />
              </div>
              <input
                type="text"
                placeholder="Rua"
                value={rua}
                onChange={(e) => setRua(e.target.value)}
                className="w-full border border-blue-300 rounded-lg p-4 focus:ring-2 focus:ring-blue-400 outline-none transition bg-white text-blue-900"
                required
              />
              <div className="flex gap-4">
                <input
                  type="text"
                  placeholder="Número"
                  value={numero}
                  onChange={(e) => setNumero(e.target.value)}
                  className="w-1/2 border border-blue-300 rounded-lg p-4 focus:ring-2 focus:ring-blue-400 outline-none transition bg-white text-blue-900"
                  required
                />
                <input
                  type="text"
                  placeholder="Bairro"
                  value={bairro}
                  onChange={(e) => setBairro(e.target.value)}
                  className="w-1/2 border border-blue-300 rounded-lg p-4 focus:ring-2 focus:ring-blue-400 outline-none transition bg-white text-blue-900"
                  required
                />
              </div>
              <input
                type="text"
                placeholder="Cidade"
                value={cidade}
                onChange={(e) => setCidade(e.target.value)}
                className="w-full border border-blue-300 rounded-lg p-4 focus:ring-2 focus:ring-blue-400 outline-none transition bg-white text-blue-900"
                required
              />
              <button
                type="submit"
                className="w-full bg-blue-700 hover:bg-blue-800 text-white py-4 rounded-lg font-bold text-xl shadow transition"
              >
                Salvar Endereço
              </button>
              {mensagem && (
                <div className="text-center mt-2 text-sm text-blue-700 font-semibold">
                  {mensagem}
                </div>
              )}
            </form>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AddressUpdate;
