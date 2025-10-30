import React, { useEffect, useState } from "react";
import NavBar from "../components/NavBar";

const MyOrders = () => {
  const [pedidos, setPedidos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userEmail, setUserEmail] = useState("");

  useEffect(() => {
    const clienteId = localStorage.getItem("clienteId");

    // Buscar pedidos
    fetch(`https://sportsmaniaback.onrender.com/api/pedidos/usuario/${clienteId}`)
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setPedidos(data);
        } else {
          setPedidos([]);
        }
        setLoading(false);
      })
      .catch(() => {
        setPedidos([]);
        setLoading(false);
      });

    // Buscar e-mail do usuário
    fetch(`https://sportsmaniaback.onrender.com/api/persons/${clienteId}`)
      .then((res) => res.json())
      .then((data) => {
        if (data && data.email) {
          setUserEmail(data.email);
        }
      });
  }, []);

  // Função para definir a cor de fundo da linha conforme o status
  const getRowClass = (status) => {
    if (status === "PAGO") return "bg-green-100";
    if (status === "AGUARDANDO_PAGAMENTO") return "bg-orange-100";
    return "";
  };

  const mensagem = `Olá, gostaria de acompanhar o status da entrega. Meu e-mail: ${userEmail}`;
  const linkWhatsapp = `https://wa.me/5581994817430?text=${encodeURIComponent(mensagem)}`;

  return (
    <>
      <NavBar />
      <div className="flex items-center justify-center min-h-[80vh] flex-col">
        <h1 className="text-2xl font-bold mb-4">Meus Pedidos</h1>
        <p className="text-lg text-gray-600 mb-6">
          Aqui você pode ver todos os seus pedidos anteriores.
        </p>
        {loading ? (
          <p>Carregando pedidos...</p>
        ) : pedidos.length === 0 ? (
          <p>Nenhum pedido encontrado.</p>
        ) : (
          <div className="w-full max-w-2xl">
            <table className="w-full border rounded shadow">
              <thead>
                <tr className="bg-blue-100">
                  <th className="p-2 text-left">Produto</th>
                  <th className="p-2 text-left">Quantidade</th>
                  <th className="p-2 text-left">Status</th>
                </tr>
              </thead>
              <tbody>
                {pedidos.map((pedido) =>
                  pedido.itens.map((item) => (
                    <tr
                      key={item.id}
                      className={`border-t transition-colors ${getRowClass(pedido.status)}`}
                    >
                      <td className="p-2 flex items-center gap-2">
                        <img
                          src={item.produto.imagem}
                          alt={item.produto.nome}
                          style={{ width: 40, height: 40, objectFit: "cover", borderRadius: 6 }}
                        />
                        {item.produto.nome}
                      </td>
                      <td className="p-2">{item.quantidade}</td>
                      <td className="p-2 font-semibold">
                        {pedido.status === "AGUARDANDO_PAGAMENTO" && "Aguardando pagamento"}
                        {pedido.status === "PAGO" && "Pago"}
                        {pedido.status === "PAGAMENTO_REJEITADO" && "Pagamento rejeitado"}
                        {pedido.status === "ENVIADO" && "Enviado"}
                        {pedido.status === "ENTREGUE" && "Entregue"}
                        {!["AGUARDANDO_PAGAMENTO","PAGO","PAGAMENTO_REJEITADO","ENVIADO","ENTREGUE"].includes(pedido.status) && pedido.status}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
      {/* Informações de acompanhamento via WhatsApp */}
      <div className="flex justify-center w-full mt-8">
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center shadow max-w-xl w-full">
          <p className="mb-2 font-semibold text-green-900">
            Para acompanhar o status da entrega envie uma mensagem no WhatsApp:
          </p>
          <a
            href={linkWhatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded transition"
          >
            Abrir WhatsApp
          </a>
        </div>
      </div>
    </>
  );
};

export default MyOrders;
