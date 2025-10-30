import React, { useState, useEffect } from "react";
import './navbar.css';
import { FaShoppingCart, FaUser } from "react-icons/fa";
import { FiSearch, FiChevronDown } from "react-icons/fi";
import { useNavigate, useLocation } from "react-router-dom";
import { useCart } from "../context/cartContext_temp";
import logo from "../assets/logo.jpeg";
import { APP_ROUTES } from "../utils/constants";

// Mapeamento de categoria para rota
const categoriaRotas = {
    academia: "/academia",
    futebol: "/futebol",
    natacao: "/natacao",
    luta: "/luta",
    ciclismo: "/ciclismo",
    voleibol: "/voleibol",
    basquete: "/basquete",
    variados: "/variados",
    todos: "/todos"
};

const Navbar = () => {
    const [activeLink, setActiveLink] = useState("home");
    const [search, setSearch] = useState("");
    const [userMenuOpen, setUserMenuOpen] = useState(false);
    const [userName, setUserName] = useState("");
    const navigate = useNavigate();
    const location = useLocation();
    const { totalItems } = useCart();

    // Recupera o nome do usuário do localStorage ao montar
    useEffect(() => {
        const nomeCompleto = localStorage.getItem("clienteNome") || "";
        if (nomeCompleto) {
            // Pega apenas o primeiro nome
            const primeiroNome = nomeCompleto.split(" ")[0];
            setUserName(primeiroNome);
        } else {
            setUserName("");
        }
    }, [location.pathname]); // Atualiza ao trocar de rota

    // Busca produto na API e redireciona para a categoria correta mostrando só o produto pesquisado
    async function handleSearch(e) {
        e.preventDefault();
        const termo = search.trim();
        if (!termo) return;

        try {
            // Busca todos os produtos
            const res = await fetch("https://sportsmaniaback.onrender.com/api/produtos/find/all");
            const produtos = await res.json();

            // Procura produto pelo nome (case insensitive, inclui)
            const produtoEncontrado = produtos.find(prod =>
                prod.nome && prod.nome.toLowerCase().includes(termo.toLowerCase())
            );

            if (produtoEncontrado) {
                // Descobre a categoria do produto
                const categoria = (produtoEncontrado.categoria || "todos").toLowerCase();
                const rota = categoriaRotas[categoria] || categoriaRotas["todos"];
                // Redireciona para a rota da categoria com query param para filtrar pelo nome exato
                navigate(`${rota}?busca=${encodeURIComponent(produtoEncontrado.nome)}`);
            } else {
                // Se não encontrou, vai para "todos" com a busca
                navigate(`/todos?busca=${encodeURIComponent(termo)}`);
            }
        } catch (err) {
            // Em caso de erro, vai para "todos" com a busca
            navigate(`/todos?busca=${encodeURIComponent(termo)}`);
        }
        setSearch("");
    }

    return (
        <nav className="navbar" style={{ backgroundColor: "#185cfc", display: "flex", alignItems: "center", padding: "0 32px" }}>
            {/* Logo */}
            <div className="left-section" style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                <img
                    src={logo}
                    alt="Logo Sports Mania"
                    className="logo cursor-pointer"
                    style={{ height: "48px", width: "auto" }}
                    onClick={() => {
                        setActiveLink("home");
                        navigate("/homepage");
                    }}
                />
            </div>

            {/* Barra de pesquisa centralizada */}
            <form
                onSubmit={handleSearch}
                style={{
                    flex: 1,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    margin: "0 32px"
                }}
            >
                <div style={{
                    display: "flex",
                    alignItems: "center",
                    background: "#fff",
                    borderRadius: "24px",
                    width: "100%",
                    maxWidth: "600px",
                    boxShadow: "0 1px 6px #0001"
                }}>
                    <input
                        type="text"
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                        placeholder="O que você está procurando?"
                        style={{
                            flex: 1,
                            border: "none",
                            outline: "none",
                            padding: "12px 20px",
                            borderRadius: "24px 0 0 24px",
                            fontSize: "1rem",
                            background: "transparent"
                        }}
                    />
                    <button
                        type="submit"
                        style={{
                            background: "none",
                            border: "none",
                            borderRadius: "0 24px 24px 0",
                            padding: "0 18px",
                            height: "44px",
                            display: "flex",
                            alignItems: "center",
                            cursor: "pointer"
                        }}
                        title="Buscar"
                    >
                        <FiSearch size={22} color="#185cfc" />
                    </button>
                </div>
            </form>

            {/* Ícones e menus à direita */}
            <div
                className="right-section"
                style={{ display: "flex", alignItems: "center", gap: "32px", position: "relative" }}
            >
                {/* Loja Física */}
                <div
                    style={{ display: "flex", alignItems: "center", color: "#fff", cursor: "pointer", fontWeight: 600 }}
                    onClick={() => navigate("/Adress")}
                >
                    <span>Loja Física</span>
                </div>

                {/* Usuário com menu dropdown */}
                <div
                    style={{ display: "flex", alignItems: "center", color: "#fff", cursor: "pointer", gap: "8px", fontWeight: 600, position: "relative" }}
                    onClick={() => setUserMenuOpen((open) => !open)}
                    tabIndex={0}
                    onBlur={() => setTimeout(() => setUserMenuOpen(false), 150)}
                >
                    <FaUser size={22} />
                    <span>
                        {userName
                            ? `Olá ${userName}`
                            : "Entrar"}
                    </span>
                    <FiChevronDown size={18} />
                    {userMenuOpen && (
                        <div
                            style={{
                                position: "absolute",
                                top: "calc(100% + 10px)",
                                right: 0,
                                background: "#fff",
                                color: "#222",
                                borderRadius: "8px",
                                boxShadow: "0 2px 12px #0002",
                                minWidth: "170px",
                                zIndex: 10,
                                padding: "8px 0"
                            }}
                        >
                            {/* Só mostra "Login" se não estiver logado */}
                            {!userName && (
                              <div
                                  style={{ padding: "10px 18px", cursor: "pointer" }}
                                  onClick={() => { navigate(APP_ROUTES.SIGN_IN); setUserMenuOpen(false); }}
                                  onMouseDown={e => e.preventDefault()}
                              >
                                  Login
                              </div>
                            )}
                            <div
                                style={{ padding: "10px 18px", cursor: "pointer" }}
                                onClick={() => { navigate("/dados"); setUserMenuOpen(false); }}
                                onMouseDown={e => e.preventDefault()}
                            >
                                Minha conta
                            </div>
                            <div
                                style={{ padding: "10px 18px", cursor: "pointer" }}
                                onClick={() => { navigate("/addressUpdate"); setUserMenuOpen(false); }}
                                onMouseDown={e => e.preventDefault()}
                            >
                                Alterar Endereço
                            </div>
                            <div
                                style={{ padding: "10px 18px", cursor: "pointer" }}
                                onClick={() => { navigate("/MyOrders"); setUserMenuOpen(false); }}
                                onMouseDown={e => e.preventDefault()}
                            >
                                Meus Pedidos
                            </div>
                        </div>
                    )}
                </div>

                {/* Carrinho */}
                <div className="cart-container" style={{ position: "relative", display: "flex", alignItems: "center" }} onClick={() => navigate("/cart")}>
                    <FaShoppingCart className="cart-icon cursor-pointer" size={24} color="#fff" />
                    {totalItems > 0 && (
                        <span
                            className="cart-badge"
                            style={{
                                marginLeft: "6px",
                                background: "#ff0",
                                color: "#222",
                                borderRadius: "50%",
                                fontSize: "0.95rem",
                                fontWeight: "bold",
                                padding: "2px 8px",
                                minWidth: "22px",
                                textAlign: "center",
                                border: "2px solid #185cfc",
                                position: "static"
                            }}
                        >
                            {totalItems}
                        </span>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;

// Exemplo para qualquer página de categoria
const Categoria = () => {
  // ...outros hooks...
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const buscaParam = params.get("busca") || "";

  // ...fetch dos produtos...

  // Se buscaParam existir, filtra por nome exato (case insensitive), senão mostra todos da categoria
  const produtosFiltrados = products.filter((produto) =>
    buscaParam
      ? produto.nome.toLowerCase() === buscaParam.toLowerCase()
      : produto.nome.toLowerCase().includes(busca.toLowerCase())
  );

  // ...restante do componente...
};
