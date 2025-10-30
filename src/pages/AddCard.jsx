import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 

export default function AddCard() {
  const navigate = useNavigate();  

  const [formVisible, setFormVisible] = useState(true); 

  const [cardInfo, setCardInfo] = useState({
    nome: '',
    numero: '',
    mes: '',
    ano: '',
    cvc: '',
    tipo: 'Crédito'
  });

  const [errors, setErrors] = useState({});

  const onlyNumbers = ['numero', 'mes', 'ano', 'cvc'];

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Validação para campos numéricos
    if (onlyNumbers.includes(name) && /[^0-9]/.test(value)) {
      setErrors(prev => ({ ...prev, [name]: 'Este campo deve conter apenas números.' }));
      return;
    }

    // Validação para nome: apenas letras e espaços
    if (name === 'nome' && /[^a-zA-ZÀ-ÿ\s]/.test(value)) {
      setErrors(prev => ({ ...prev, nome: 'Este campo deve conter apenas letras.' }));
      return;
    }

    // Limpa erro se estiver tudo certo
    setErrors(prev => ({ ...prev, [name]: '' }));

    setCardInfo(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    console.log('Cartão salvo:', cardInfo);
    alert('Cartão salvo com sucesso!');

    // Redireciona para a página de Meus Cartões após salvar
    navigate('/Cards'); 
  };

  return (
    <div className="relative p-8 max-w-4xl mx-auto">
      {formVisible && (
        <div className="flex flex-col md:flex-row items-start gap-8 mt-10">
          {/* Cartão Visual */}
          <div className="w-[300px] h-[180px] bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl text-white p-4 shadow-md">
            <div className="flex justify-between items-center mb-4">
              <span className="text-lg font-semibold">Cartão de {cardInfo.tipo}</span>
              <span className="text-sm">💳</span>
            </div>
            <div className="text-xl tracking-widest mb-4">
              {cardInfo.numero || '0000 0000 0000 0000'}
            </div>
            <div className="text-sm mb-1">Titular do cartão</div>
            <div className="text-sm truncate">{cardInfo.nome || 'XXXXXXXX XXXXXXX'}</div>
            <div className="mt-4 text-sm">
              VALIDADE {cardInfo.mes || 'MM'} / {cardInfo.ano || 'AAAA'}
            </div>
          </div>

          {/* Formulário */}
          <form className="w-full max-w-md space-y-4">
            <div>
              <label className="block mb-1">Tipo do cartão:</label>
              <select
                name="tipo"
                value={cardInfo.tipo}
                onChange={handleChange}
                className="border p-2 w-full"
              >
                <option value="Crédito">Crédito</option>
                <option value="Débito">Débito</option>
              </select>
            </div>

            <div>
              <label className="block mb-1">Nome impresso no cartão:</label>
              <input
                name="nome"
                value={cardInfo.nome}
                onChange={handleChange}
                maxLength={26}
                className="border p-2 w-full"
              />
              {errors.nome && <p className="text-red-500 text-sm">{errors.nome}</p>}
            </div>

            <div>
              <label className="block mb-1">Número do cartão:</label>
              <input
                name="numero"
                value={cardInfo.numero}
                onChange={handleChange}
                maxLength={16}
                className="border p-2 w-full"
              />
              {errors.numero && <p className="text-red-500 text-sm">{errors.numero}</p>}
            </div>

            <div>
              <label className="block mb-1">Mês de validade do cartão:</label>
              <input
                name="mes"
                value={cardInfo.mes}
                onChange={handleChange}
                maxLength={2}
                placeholder="MM"
                className="border p-2 w-full"
              />
              {errors.mes && <p className="text-red-500 text-sm">{errors.mes}</p>}
            </div>

            <div>
              <label className="block mb-1">Ano de validade do cartão:</label>
              <input
                name="ano"
                value={cardInfo.ano}
                onChange={handleChange}
                maxLength={4}
                placeholder="AAAA"
                className="border p-2 w-full"
              />
              {errors.ano && <p className="text-red-500 text-sm">{errors.ano}</p>}
            </div>

            <div>
              <label className="block mb-1">Código de segurança:</label>
              <input
                name="cvc"
                value={cardInfo.cvc}
                onChange={handleChange}
                maxLength={4}
                placeholder="CVC"
                className="border p-2 w-full"
              />
              {errors.cvc && <p className="text-red-500 text-sm">{errors.cvc}</p>}
            </div>

            <button
              type="button"
              onClick={handleSave}
              className="bg-yellow-400 hover:bg-yellow-500 text-white font-bold py-2 px-4 rounded"
            >
              Salvar Cartão
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
