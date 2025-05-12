import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useMesa } from '../contexts/MesaContext';
import { useCarrinho } from '../contexts/CarrinhoContext';

const mesasDisponiveis = Array.from({ length: 20 }, (_, i) => i + 1);

export function Home() {
  const navigate = useNavigate();
  const { mesa, setMesa } = useMesa();
  const { limparCarrinho } = useCarrinho();
  const [mesaInput, setMesaInput] = useState(mesa ? String(mesa) : '');
  const [erro, setErro] = useState('');

  const irParaCardapio = () => {
    const numeroMesa = Number(mesaInput);
    if (!numeroMesa || numeroMesa < 1) {
      setErro('Selecione o número da mesa!');
      return;
    }
    if (mesa !== numeroMesa) {
      limparCarrinho();
    }
    setMesa(numeroMesa);
    setErro('');
    navigate('/cardapio');
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center">
      <div className="text-center">
        <div className="mb-8">
          <span className="text-8xl">🍽️</span>
        </div>
        
        <h1 className="text-5xl font-bold text-amber-500 mb-4">
          Sofistia
        </h1>
        
        <p className="text-2xl text-white mb-8">
          Bem vindo ao restaurante Mata Fome
        </p>

        <div className="mb-8">
          <label className="block text-white text-lg mb-2" htmlFor="mesa">Selecione sua mesa:</label>
          <select
            id="mesa"
            value={mesaInput}
            onChange={e => setMesaInput(e.target.value)}
            className="px-4 py-2 rounded text-lg text-center w-40 outline-none border border-gray-400 focus:border-amber-600 bg-amber-600 text-white font-semibold"
          >
            <option value="">Selecione...</option>
            {mesasDisponiveis.map(num => (
              <option key={num} value={num}>{num}</option>
            ))}
          </select>
          {erro && <div className="text-red-400 mt-2 text-sm">{erro}</div>}
        </div>

        <button
          onClick={irParaCardapio}
          className="bg-amber-600 hover:bg-amber-700 text-white px-12 py-4 rounded-lg text-xl transition transform hover:scale-105"
        >
          Ver Cardápio
        </button>
      </div>
    </div>
  );
} 