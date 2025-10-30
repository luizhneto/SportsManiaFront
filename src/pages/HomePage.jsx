import React, { useState, useEffect, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/NavBar";
import imagemIndisponivel from "../assets/imagemIndisponivel.png";
import { APP_ROUTES } from "../utils/constants";
import banner1 from "../assets/banner1.jpg";
import banner2 from "../assets/banner2.jpg";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa"; // Importa ícones das setas


const ProductCard = ({ id, nome, preco, imagem }) => {
  const navigate = useNavigate();

  return (
    <div
      className="border p-4 rounded-lg text-center shadow-md cursor-pointer hover:shadow-lg transition"
      onClick={() => navigate(`/product/${id}`)}
    >
      <img
        src={imagem && imagem.trim() !== "" ? imagem : imagemIndisponivel}
        alt={nome}
        className="w-24 h-24 object-contain mx-auto mb-2"
      />
      <h3 className="font-medium">{nome}</h3>
      <p className="text-lg font-bold">R$ {preco.toFixed(2)}</p>
    </div>
  );
};

const categorias = [
  { nome: "Natação", rota: APP_ROUTES.NATACAO },
  { nome: "Futebol", rota: APP_ROUTES.FUTEBOL },
  { nome: "Academia", rota: APP_ROUTES.ACADEMIA },
  { nome: "Luta", rota: APP_ROUTES.LUTA },
  { nome: "Ciclismo", rota: APP_ROUTES.CICLISMO },
  { nome: "Voleibol", rota: APP_ROUTES.VOLEIBOL },
  { nome: "Basquete", rota: APP_ROUTES.BASQUETE },
  { nome: "Variados", rota: APP_ROUTES.VARIADOS },
  { nome: "Todos", rota: APP_ROUTES.TODOS }
];

const faqData = [
  {
    pergunta: "Como comprar na SportsMania?",
    resposta: (
      <span>
        {"Para comprar na SportsMania, basta navegar pelas categorias ou usar a barra de busca para encontrar o produto desejado e também na nossa loja fisíca localizada na Rua Pedro Allain, 81 - Loja:5 - Casa Amarela, Recife - PE, 52070-210"}
      </span>
    ),
  },
  {
    pergunta: "Quais formas de pagamento são aceitas?",
    resposta: (
      <span>
        {"Na SportsMania, aceitamos diversas formas de pagamento, incluindo cartões de crédito, PIX. Já na loja fisica aceitamos dinheiro, cartões de crédito, débito e pix."}
      </span>
    ),
  },
  {
    pergunta: "Como funciona a entrega dos produtos?",
    resposta: (
      <span>
        {"Os produtos são entregues em todo o Brasil através dos correios. O prazo de entrega varia de acordo com a localização e a forma de envio escolhida no momento da compra."}
      </span>
    ),
  },

  {
    pergunta: "Como faço para trocar ou devolver um produto?",
    resposta: (
      <span>
        {"Para trocar ou devolver um produto, você deve entrar em contato com nosso atendimento ao cliente seja nas redes sociais ou pelo whatssapp, e na loja fisica você pode ir diretamente ao balcão de atendimento."}
      </span>
    ),
  },
  {
    pergunta: "Como falar com o atendimento da SportsMania?",
    resposta: (
      <span>
        { "Você pode entrar em contato com nosso atendimento através das redes sociais, pelo WhatsApp ou diretamente na loja física. Estamos sempre prontos para ajudar!"}
      </span>
    ),
  },
];

function FaqItem({ pergunta, children }) {
  const [open, setOpen] = useState(false);

  return (
    <div
      className={`border rounded-2xl overflow-hidden transition-all duration-300 bg-white ${
        open ? "shadow-lg scale-[1.02]" : "bg-[#fafafa]"
      }`}
    >
      <button
        className="w-full text-left px-6 py-5 font-semibold text-lg flex items-center gap-3 focus:outline-none transition-colors"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
      >
        <span className={`text-2xl font-bold transition-transform duration-300 ${open ? "rotate-45 text-blue-600" : ""}`}>
          {open ? "×" : "+"}
        </span>
        {pergunta}
      </button>
      <div
        className={`transition-all duration-300 px-6 ${
          open
            ? "max-h-[500px] py-4 opacity-100"
            : "max-h-0 py-0 opacity-0"
        } overflow-hidden text-gray-800`}
        style={{ background: "#fafafa" }}
      >
        {children}
      </div>
    </div>
  );
}

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [busca, setBusca] = useState("");
  const [categoriaSelecionada, setCategoriaSelecionada] = useState("Todos");
  const navigate = useNavigate();
  const swiperRef = useRef(null);

  useEffect(() => {
    fetch("https://sportsmaniaback.onrender.com/api/produtos/find/all")
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        if (Array.isArray(data)) {
          setProducts(data);
        } else {
          console.warn("Resposta da API não é uma lista.");
        }
      })
      .catch((error) => console.error("Erro ao buscar produtos:", error));
  }, []);

  // Filtragem por busca e categoria
  const produtosFiltrados = products.filter((produto) => {
    const nomeMatch = produto.nome.toLowerCase().includes(busca.toLowerCase());
    const categoriaMatch =
      categoriaSelecionada === "Todos" ||
      (produto.categoria &&
        produto.categoria.toLowerCase() === categoriaSelecionada.toLowerCase());
    return nomeMatch && categoriaMatch;
  });

  return (
    <div className="min-h-screen">
      <Navbar/>
      
      <div className="w-full p-4 mx-auto">
        {/* Categorias */}
        <div className="flex flex-row items-center justify-between mb-8">
          <div className="flex-1 flex justify-center">
            <div className="flex flex-row gap-8">
              {categorias.map((cat) => (
                <button
                  key={cat.nome}
                  onClick={() => navigate(cat.rota)}
                  className={`font-medium ${
                    categoriaSelecionada === cat.nome
                      ? "border-b-2 border-black"
                      : "text-gray-700"
                  } transition pb-1`}
                >
                  {cat.nome}
                </button>
              ))}
            </div>
          </div>
        </div>
        {/* Carrossel de imagens */}
        <div className="mb-8 flex justify-center bg-[#f5f5f5] relative">
          {/* Seta esquerda */}
          <button
            className="absolute left-2 top-1/2 z-10 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow"
            onClick={() => swiperRef.current?.slidePrev()}
            style={{ outline: "none", border: "none" }}
            aria-label="Anterior"
          >
            <FaChevronLeft size={24} color="#185cfc" />
          </button>
          {/* Seta direita */}
          <button
            className="absolute right-2 top-1/2 z-10 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow"
            onClick={() => swiperRef.current?.slideNext()}
            style={{ outline: "none", border: "none" }}
            aria-label="Próximo"
          >
            <FaChevronRight size={24} color="#185cfc" />
          </button>
          <Swiper
            slidesPerView={1}
            pagination={{ clickable: true }}
            modules={[Pagination]}
            className="overflow-hidden"
            style={{
              width: "2000px",
              height: "900px",
              borderRadius: "0px"
            }}
            onSwiper={(swiper) => { swiperRef.current = swiper; }}
          >
            <SwiperSlide>
              <div className="relative w-full h-full">
                <img
                  src={banner1}
                  alt="Banner 1"
                  className="w-full h-full object-cover"
                  style={{ width: "100%", height: "100%" }}
                />
                {/* Mensagem lateral */}
                <div
                  className="absolute left-12 top-1/2 -translate-y-1/2 text-white"
                  style={{
                    maxWidth: "400px",
                    background: "rgba(0,0,0,0.35)",
                    padding: "32px 32px 32px 32px",
                    borderRadius: "12px"
                  }}
                >
                  <h2 className="text-4xl font-bold mb-4">Pratique seu esporte favorito com a gente</h2>
                  <div className="h-1 w-24 bg-red-600 mb-4"></div>

                  <button
                    className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-8 rounded transition"
                    onClick={() => navigate(APP_ROUTES.TODOS)}
                  >
                    COMPRE AGORA
                  </button>
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="relative w-full h-full">
                <img
                  src={banner2}
                  alt="Banner 2"
                  className="w-full h-full object-cover"
                  style={{ width: "100%", height: "100%" }}
                />
                {/* Mensagem lateral para o banner 2 */}
                <div
                  className="absolute left-12 top-1/2 -translate-y-1/2 text-white"
                  style={{
                    maxWidth: "400px",
                    background: "rgba(0,0,0,0.35)",
                    padding: "32px 32px 32px 32px",
                    borderRadius: "12px"
                  }}
                >
                  <h2 className="text-4xl font-bold mb-4">Encontre os melhores produtos esportivos</h2>
                  <div className="h-1 w-24 bg-red-600 mb-4"></div>
                  <button
                    className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-8 rounded transition"
                    onClick={() => navigate(APP_ROUTES.TODOS)}
                  >
                    VER PRODUTOS
                  </button>
                </div>
              </div>
            </SwiperSlide>
          </Swiper>
        </div>
      </div>

      {/* Bloco promocional estilo Neon */}
      <div className="max-w-6xl mx-auto mt-8 mb-16">
        <h2 className="text-4xl font-bold text-center mb-8">
          Soluções SportsMania para você
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="border rounded-2xl p-6 flex flex-col items-start hover:shadow-lg transition bg-white">
            <span className="text-3xl mb-4">🏆</span>
            <h3 className="font-bold text-lg mb-2">Produtos Originais</h3>
            <p className="text-gray-700">Trabalhamos apenas com marcas esportivas oficiais e garantia de procedência.</p>
          </div>
          <div className="border rounded-2xl p-6 flex flex-col items-start hover:shadow-lg transition bg-white">
            <span className="text-3xl mb-4">🚚</span>
            <h3 className="font-bold text-lg mb-2">Entrega Rápida</h3>
            <p className="text-gray-700">Receba seus produtos esportivos em casa com agilidade e segurança.</p>
          </div>
          <div className="border rounded-2xl p-6 flex flex-col items-start hover:shadow-lg transition bg-white">
            <span className="text-3xl mb-4">💳</span>
            <h3 className="font-bold text-lg mb-2">Pagamento Facilitado</h3>
            <p className="text-gray-700">Parcele suas compras e aproveite as melhores condições do mercado esportivo.</p>
          </div>
          <div className="border rounded-2xl p-6 flex flex-col items-start hover:shadow-lg transition bg-white">
            <span className="text-3xl mb-4">⭐</span>
            <h3 className="font-bold text-lg mb-2">Variedade e Qualidade</h3>
            <p className="text-gray-700">Tudo para seu esporte favorito: tênis, roupas, acessórios e muito mais!</p>
          </div>
        </div>
      </div>

      {/* Bloco institucional estilo Neon */}
      <div className="w-full bg-[#f7f7f7] py-12">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-10 px-4">
          {/* Texto institucional */}
          <div className="flex-1 mb-8 md:mb-0">
            <h2 className="text-4xl font-bold mb-4">
              Viva o esporte com a SportsMania
            </h2>
            <p className="text-lg text-gray-700 mb-6">
              Aqui você encontra tudo para praticar seu esporte favorito com qualidade, conforto e segurança. Seja para treinar, competir ou se divertir, a SportsMania está ao seu lado em cada conquista. Venha fazer parte do nosso time!
            </p>
            <button
              className="bg-blue-700 hover:bg-blue-800 text-white font-bold py-3 px-8 rounded transition"
              onClick={() => navigate(APP_ROUTES.TODOS)}
            >
              Conheça nossos produtos
            </button>
          </div>
          {/* Imagem institucional */}
          <div className="flex-1 flex justify-center">
            <img
              src="https://tecnofit-site.s3.sa-east-1.amazonaws.com/media/files/2021/11/25134422/como-crescer-academia-de-lutas-2022.png"
              alt="Esporte SportsMania"
              className="rounded-2xl shadow-lg w-full max-w-md object-cover"
              style={{ minHeight: 320, background: "#eee" }}
            />
          </div>
        </div>
      </div>

      {/* Bloco institucional 2 */}
      <div className="w-full bg-white py-12">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row-reverse items-center justify-between gap-10 px-4">
          {/* Texto institucional */}
          <div className="flex-1 mb-8 md:mb-0">
            <h2 className="text-4xl font-bold mb-4">
              Esporte é saúde, bem-estar e alegria
            </h2>
            <p className="text-lg text-gray-700 mb-6">
              Incentivamos a prática esportiva para todas as idades. Com os melhores equipamentos e acessórios, você tem mais disposição e qualidade de vida. Venha se superar com a SportsMania!
            </p>
            <button
               className="bg-blue-700 hover:bg-blue-800 text-white font-bold py-3 px-8 rounded transition"
              onClick={() => navigate(APP_ROUTES.TODOS)}
            >
              Veja nossas ofertas
            </button>
          </div>
          {/* Imagem institucional */}
          <div className="flex-1 flex justify-center">
            <img
              src="https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&w=600&q=80"
              alt="Saúde e Esporte"
              className="rounded-2xl shadow-lg w-full max-w-md object-cover"
              style={{ minHeight: 320, background: "#eee" }}
            />
          </div>
        </div>
      </div>

      {/* Bloco institucional 3 */}
      <div className="w-full bg-[#f7f7f7] py-12">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-10 px-4">
          {/* Texto institucional */}
          <div className="flex-1 mb-8 md:mb-0">
            <h2 className="text-4xl font-bold mb-4">
              Os melhores produtos das principais marcas esportivas
            </h2>
            <p className="text-lg text-gray-700 mb-6">
              Trabalhamos com Nike, Adidas, Puma, Olympikus, Penalty, Speedo e muito mais. 
            </p>
            <button
              className="bg-blue-700 hover:bg-blue-800 text-white font-bold py-3 px-8 rounded transition"
              onClick={() => navigate(APP_ROUTES.TODOS)}
            >
              Compre já
            </button>
          </div>
          {/* Imagem institucional */}
          <div className="flex-1 flex justify-center">
            <img
              src="https://saude.sesisc.org.br/wp-content/uploads/sites/13/2023/09/Beneficios-de-fazer-academia-Para-sua-saude-e-seu-corpo-scaled.jpg"
              alt="Marcas esportivas"
              className="rounded-2xl shadow-lg w-full max-w-md object-cover"
              style={{ minHeight: 320, background: "#eee" }}
            />
          </div>
        </div>
      </div>

      {/* Bloco institucional 4 */}
      <div className="w-full bg-white py-12">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row-reverse items-center justify-between gap-10 px-4">
          {/* Texto institucional */}
          <div className="flex-1 mb-8 md:mb-0">
            <h2 className="text-4xl font-bold mb-4">
              Produtos para suas crianças e adolescentes
            </h2>
            <p className="text-lg text-gray-700 mb-6">
              Compre tênis, roupas e acessórios para os pequenos praticarem esportes com conforto e segurança. Temos opções para todas as idades e modalidades.
            </p>
         
          </div>
          {/* Imagem institucional */}
          <div className="flex-1 flex justify-center">
            <img
              src="https://viverbem.unimed.coop.br/wp-content/uploads/2024/02/235-artes-marciais.jpg"
              alt="Atendimento SportsMania"
              className="rounded-2xl shadow-lg w-full max-w-md object-cover"
              style={{ minHeight: 320, background: "#eee" }}
            />
          </div>
        </div>
      </div>

      {/* FAQ - Dúvidas comuns */}
      <div className="w-full bg-[#fafafa] py-16">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-10">Dúvidas comuns:</h2>
          <div className="space-y-6">
            {faqData.map((item, idx) => (
              <FaqItem key={idx} pergunta={item.pergunta}>
                {item.resposta}
              </FaqItem>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
