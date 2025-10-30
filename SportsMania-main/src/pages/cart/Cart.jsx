import React, { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import "./Cart.css";
import Navbar from "../../components/NavBar";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [total, setTotal] = useState(0);
  const [frete, setFrete] = useState([]);
  const [servicoSelecionado, setServicoSelecionado] = useState(null);
  const [calculandoFrete, setCalculandoFrete] = useState(false);
  const [endereco, setEndereco] = useState(null);
  const [pagando, setPagando] = useState(false);

  const clienteId = localStorage.getItem("clienteId");
  const navigate = useNavigate();

  // Buscar endereço do usuário
  useEffect(() => {
    if (!clienteId) return;
    const token = localStorage.getItem("token");
    fetch(`https://sportsmaniaback.onrender.com/api/persons/${clienteId}`, {
      headers: {
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${token}` }),
      },
    })
      .then((res) => res.ok ? res.json() : null)
      .then((data) => {
        if (data) setEndereco(data);
      });
  }, [clienteId]);

  // Buscar itens do carrinho
  useEffect(() => {
    if (!clienteId) {
      alert("Faça login para visualizar o carrinho.");
      return;
    }
    const token = localStorage.getItem("token");
    fetch(`https://sportsmaniaback.onrender.com/api/carrinho/person/${clienteId}`, {
      headers: {
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${token}` }),
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Erro ao buscar carrinho");
        return res.json();
      })
      .then((data) => {
        setCartItems(data.itens || data.produtos || data.items || []);
        let sum = 0;
        (data.itens || data.produtos || data.items || []).forEach(
          (item) => (sum += (item.produto.preco || 0) * (item.quantidade || 1))
        );
        setTotal(sum);
      })
      .catch((err) => {
        console.error(err);
        setCartItems([]);
        setTotal(0);
      });
  }, [clienteId]);

  // Calcular frete automaticamente quando endereço e carrinho estiverem prontos
  useEffect(() => {
    if (endereco && endereco.cep && cartItems.length > 0) {
      handleCalcularFrete(endereco.cep);
    }
    // eslint-disable-next-line
  }, [endereco, cartItems]);

  const handleCalcularFrete = async (cepDestino) => {
    setCalculandoFrete(true);
    try {
      const payload = {
        from: { postal_code: "52070-210" },
        to: { postal_code: cepDestino },
        products: cartItems.map(item => ({
          weight: 0.8,
          width: 25,
          height: 12,
          length: 30,
          quantity: item.quantidade
        })),
        services: ["1", "2"]
      };
      const response = await fetch("https://sportsmaniaback.onrender.com/calcular-frete", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      if (response.ok) {
        const resultado = await response.json();
        setFrete(resultado);
        setServicoSelecionado(null);
      } else {
        setFrete([]);
        setServicoSelecionado(null);
        alert("Erro ao calcular frete.");
      }
    } catch (error) {
      setFrete([]);
      setServicoSelecionado(null);
      alert("Erro ao calcular frete.");
      console.error(error);
    }
    setCalculandoFrete(false);
  };

  const precoTotal = useMemo(() => {
    if (servicoSelecionado) {
      return total + Number(servicoSelecionado.price);
    }
    return total;
  }, [total, servicoSelecionado]);

  const handlePagamento = async () => {
    if (pagando) return;
    setPagando(true);
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `https://sportsmaniaback.onrender.com/api/pagamento/carrinho/${clienteId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            ...(token && { Authorization: `Bearer ${token}` }),
          },
          body: JSON.stringify({
            frete: servicoSelecionado
              ? {
                  id: servicoSelecionado.id,
                  name: servicoSelecionado.name,
                  price: Number(servicoSelecionado.price),
                  delivery_time: servicoSelecionado.delivery_time,
                }
              : null,
          }),
        }
      );

      const data = await response.json();
      console.log(data); // Veja o que aparece aqui!

      if (response.ok) {
        const url = data.init_point;
        const pedidoId = data.pedidoId;
        localStorage.setItem("pedidoId", pedidoId);

        // Limpa o carrinho no backend usando o ID do carrinho
        // Supondo que você tem o carrinhoId disponível (exemplo: data.carrinhoId ou outro local)
        const carrinhoId = data.carrinhoId; // ajuste conforme sua resposta/estado
        if (carrinhoId) {
          await fetch(
            `https://sportsmaniaback.onrender.com/api/carrinho/${carrinhoId}/produtos`,
            {
              method: "DELETE",
              headers: {
                "Content-Type": "application/json",
                ...(token && { Authorization: `Bearer ${token}` }),
              },
            }
          );
        }

        // Limpa o carrinho local
        setCartItems([]);
        setTotal(0);

        if (url && url.startsWith("http")) {
          window.location.href = url;
        } else {
          alert("URL de pagamento não recebida.");
          setPagando(false);
        }
      } else {
        alert("Erro ao iniciar pagamento.");
        setPagando(false);
      }
    } catch (error) {
      alert("Erro ao iniciar pagamento.");
      setPagando(false);
      console.error(error);
    }
  };

  const handleRemoveItem = async (produtoId) => {
    const clienteId = localStorage.getItem("clienteId");
    const token = localStorage.getItem("token");
    try {
      const response = await fetch(
        `https://sportsmaniaback.onrender.com/api/carrinho/person/${clienteId}/remover?produtoId=${produtoId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            ...(token && { Authorization: `Bearer ${token}` }),
          },
          body: JSON.stringify({ quantidade: 1 })
        }
      );
      if (response.ok) {
        // Recarregue o carrinho do backend para garantir atualização
        const res = await fetch(
          `https://sportsmaniaback.onrender.com/api/carrinho/person/${clienteId}`,
          {
            headers: {
              "Content-Type": "application/json",
              ...(token && { Authorization: `Bearer ${token}` }),
            },
          }
        );
        if (res.ok) {
          const data = await res.json();
          setCartItems(data.itens || data.produtos || data.items || []);
          let sum = 0;
          (data.itens || data.produtos || data.items || []).forEach(
            (item) => (sum += (item.produto.preco || 0) * (item.quantidade || 1))
          );
          setTotal(sum);
        }
      } else {
        alert("Erro ao remover produto do carrinho.");
      }
    } catch (error) {
      alert("Erro ao remover produto do carrinho.");
      console.error(error);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="flex flex-col md:flex-row gap-8 max-w-6xl mx-auto p-6">
        {/* Lado esquerdo: Produtos */}
        <div className="flex-1">
          <h1 className="text-2xl font-bold mb-6">Meu carrinho</h1>
          <div className="bg-white rounded-lg shadow p-6 mb-6">
            {cartItems.length > 0 ? (
              cartItems.map((item) => (
                <div
                  key={item.produto.id}
                  className="flex flex-col md:flex-row md:items-center gap-4 border-b last:border-b-0 pb-4 mb-4 last:mb-0"
                >
                  <img
                    src={item.produto.imagem}
                    alt={item.produto.nome}
                    className="w-28 h-28 object-contain rounded bg-gray-100"
                  />
                  <div className="flex-1">
                    <div className="font-bold text-lg">{item.produto.nome}</div>
                    <div className="text-gray-500 text-sm mt-1">
                      Tamanho: {item.produto.tamanho || "--"}
                    </div>
                    <div className="text-gray-500 text-sm">
                      Cor: {item.produto.cor || "--"}
                    </div>
                  </div>
                  <div className="flex items-center gap-2 mt-2 md:mt-0">
                    <span className="text-gray-700">Qtd:</span>
                    <span className="px-3 py-1 border rounded bg-gray-50">{item.quantidade}</span>
                  </div>
                  <div className="font-bold text-lg whitespace-nowrap">
                    R$ {(item.produto.preco || 0).toFixed(2)}
                  </div>
                  <button
                    onClick={() => handleRemoveItem(item.produto.id)}
                    className="text-red-600 font-bold text-xl hover:underline"
                    title="Remover"
                  >
                    &#128465;
                  </button>
                </div>
              ))
            ) : (
              <div className="text-center text-gray-500 py-8">Carrinho vazio.</div>
            )}
          </div>

          {/* Endereço do usuário */}
          <div className="bg-white rounded-lg shadow p-6 mb-6">
            <h2 className="font-bold mb-2">Endereço de entrega:</h2>
            {endereco ? (
              <div>
                <div>
                  {endereco.rua}, {endereco.numero}{" "}
                  {endereco.complemento && `- ${endereco.complemento}`}
                </div>
                <div>
                  {endereco.bairro} - {endereco.cidade}/{endereco.uf}
                </div>
                <div>CEP: {endereco.cep}</div>
              </div>
            ) : (
              <span>Carregando endereço...</span>
            )}
            <button
              className="ml-4 mt-2 bg-[#185cfc] text-white px-4 py-2 rounded font-bold"
              onClick={() => navigate("/addressUpdate")}
            >
              Escolher endereço
            </button>
          </div>

          {/* Frete */}
          <div className="bg-white rounded-lg shadow p-6 mb-6">
            <label className="block mb-2 font-bold">
              Consultar frete e prazo de entrega
            </label>
            <div className="mb-2">
              <span className="font-semibold">CEP: </span>
              {endereco?.cep || "..."}
            </div>
            {calculandoFrete && <div>Calculando frete...</div>}
            {frete && Array.isArray(frete) && frete.length > 0 && (
              <div className="mt-2">
                <label className="block font-bold mb-1">
                  Escolha o serviço de entrega:
                </label>
                {frete
                  .filter(
                    (opcao) =>
                      (opcao.id === "1" ||
                        opcao.id === "2" ||
                        opcao.id === 1 ||
                        opcao.id === 2) &&
                      opcao.price &&
                      !isNaN(Number(opcao.price))
                  )
                  .map((opcao, idx) => (
                    <div key={idx} className="flex items-center gap-2 mb-1">
                      <input
                        type="radio"
                        name="servico-frete"
                        value={opcao.id}
                        checked={
                          servicoSelecionado &&
                          servicoSelecionado.id === opcao.id
                        }
                        onChange={() => setServicoSelecionado(opcao)}
                      />
                      <span>
                        {opcao.name} - R$ {Number(opcao.price).toFixed(2)} (
                        {opcao.delivery_time} dias úteis)
                      </span>
                    </div>
                  ))}
                {frete.filter(
                  (opcao) =>
                    (opcao.id === "1" ||
                      opcao.id === "2" ||
                      opcao.id === 1 ||
                      opcao.id === 2) &&
                    opcao.price &&
                    !isNaN(Number(opcao.price))
                ).length === 0 && (
                  <div className="text-red-600 font-bold mt-2">
                    Nenhuma opção de frete disponível para o CEP informado.
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Lado direito: Resumo da compra */}
        <div className="w-full md:w-[340px]">
          <div className="bg-white rounded-lg shadow p-6 sticky top-8">
            <h2 className="text-xl font-bold mb-4">Resumo da compra</h2>
            <div className="flex justify-between mb-2">
              <span className="font-semibold">Subtotal ({cartItems.length} item{cartItems.length !== 1 ? "s" : ""})</span>
              <span>R$ {total.toFixed(2)}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span className="font-semibold">Frete</span>
              <span>
                {servicoSelecionado
                  ? `R$ ${Number(servicoSelecionado.price).toFixed(2)}`
                  : "--"}
              </span>
            </div>
            <hr className="my-4" />
            <div className="flex justify-between items-center mb-6">
              <span className="font-bold text-lg">Valor total</span>
              <span className="font-bold text-lg">
                R$ {precoTotal.toFixed(2)}
              </span>
            </div>
            <button
              className="w-full py-3 rounded font-bold text-white text-lg transition"
              style={{
                background: "#185cfc",
                boxShadow: "0 2px 8px 0 #185cfc40",
                opacity: pagando ? 0.6 : 1,
                cursor: pagando ? "not-allowed" : "pointer",
              }}
              onClick={handlePagamento}
              disabled={cartItems.length === 0 || pagando}
            >
              {pagando ? "Processando..." : "Finalizar compra"}
            </button>
            {/* Imagem Pix abaixo do botão de finalizar compra */}
            <div className="flex justify-center mt-6">
              <img
                src="https://admin.ecommercebrasil.com.br/wp-content/uploads/2021/03/Pix-checkout-transparente-do-mercado-pago.png"
                alt="Pix Checkout Mercado Pago"
                style={{ maxWidth: 260, width: "100%", height: "auto" }}
              />
            </div>
                        <div className="flex justify-center mt-6">
              <img
                src="https://i.postimg.cc/FzHWpGWp/cart-es2.png"
                alt="Pix Checkout Mercado Pago"
                style={{ maxWidth: 260, width: "100%", height: "auto" }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
