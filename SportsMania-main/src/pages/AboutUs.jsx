import React, { useState } from 'react';
import '../Styles/AboutUs.css'; // Importando o CSS para estilização
import Navbar from "../components/NavBar";

const AboutUs = () => {
    const [activeIndex, setActiveIndex] = useState(null); // Estado para controlar qual bloco está ativo

    const toggleBlock = (index) => {
        setActiveIndex(activeIndex === index ? null : index); // Alterna a exibição do bloco
    };

    return (
        <>
        <Navbar />
        <div className="sobre-nos-container">
            <h1 className="titulo">SportsMania</h1>
            <div className="blocos-container">
                <div className="bloco1">
                    <b>Quem Somos</b>
                    <p>
                        A SportsMania é uma plataforma dedicada a todos os amantes de esportes.
                        Nossa missão é conectar pessoas através do esporte, oferecendo conteúdo
                        relevante, dicas e uma comunidade vibrante para compartilhar experiências.
                    </p>
                </div>
                <div className="bloco2">
                    <b>Nossa Visão</b>
                    <p>
                        Acreditamos que o esporte tem o poder de transformar vidas.
                        Nossa visão é ser a principal fonte de informação e inspiração
                        para atletas e entusiastas, promovendo um estilo de vida ativo e saudável.
                    </p>
                </div>
            </div>

            <div className="DuvidasContainer">
                <h1 className="duvidas-titulo">Dúvidas Frequentes</h1>
                <div className="duvidas-blocos">
    {[
        {
            pergunta: 'Vocês têm uma ampla variedade de produtos esportivos?',
            resposta: 'Sim, em nossa loja física, oferecemos uma ampla variedade de produtos esportivos, desde equipamentos e vestuário até acessórios e suplementos. Estamos empenhados em fornecer uma seleção diversificada para atender às necessidades de diferentes esportes e atletas.'
        },
        {
            pergunta: 'Vocês possuem tamanhos e opções para diferentes idades e níveis de habilidade?',
            resposta: 'Sim, buscamos atender a todos os clientes, independentemente da idade ou nível de habilidade. Temos opções de tamanhos variados, desde produtos para crianças até modelos especializados para atletas profissionais. Nossa equipe está pronta para ajudá-lo a encontrar o tamanho e a opção adequados para suas necessidades esportivas.'
        },
        {
            pergunta: 'Vocês oferecem garantia nos produtos?',
            resposta: 'Sim, estamos comprometidos em garantir a satisfação do cliente. Se houver algum problema com um produto adquirido em nossa loja, nossa equipe estará disponível para auxiliá-lo no processo de assistência pós-venda e garantia, de acordo com as políticas estabelecidas pelos fabricantes.'
        },
        {
            pergunta: 'Quais são as opções de pagamento disponíveis?',
            resposta: 'Aceitamos várias formas de pagamento, incluindo dinheiro, cartões de crédito e débito. Verifique com nossa equipe no momento da compra para obter mais detalhes sobre as opções de pagamento disponíveis.'
        }
    ].map((item, index) => (
        <div key={index} className="duvida-bloco" onClick={() => toggleBlock(index)}>
            <h2>{item.pergunta}</h2>
            {activeIndex === index && (
                <p className="resposta">
                    {item.resposta}
                </p>
            )}
        </div>
    ))}
</div>
            </div>
        </div>
        </>

    );
};

export default AboutUs;