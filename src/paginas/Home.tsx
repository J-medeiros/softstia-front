import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { listarMesasDisponiveis, atualizarMesa } from '../services/mesaService';
import { Mesa } from '../models/types';

const HomePage = () => {
  const [mesasDisponiveis, setMesasDisponiveis] = useState<Mesa[]>([]);
  const [mesaSelecionada, setMesaSelecionada] = useState<number | null>(null);
  const [responsavel, setResponsavel] = useState('');
  const [erro, setErro] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    carregarMesas();
  }, []);

  const carregarMesas = async () => {
    try {
      const res = await listarMesasDisponiveis();
      if (res.success && res.data) {
        setMesasDisponiveis(res.data);
      } else {
        setMesasDisponiveis([]);
      }
    } catch (err) {
      console.error(err);
      setMesasDisponiveis([]);
    }
  };

  const salvarMesa = async () => {
    setErro('');
    if (!mesaSelecionada || !responsavel.trim()) {
      setErro('Selecione a mesa e informe o responsável.');
      return;
    }

    const mesaAtualizada: Mesa = {
      numero: mesaSelecionada,
      responsavel: responsavel.trim(),
    };

    try {
      await atualizarMesa(mesaAtualizada);
      alert('Mesa atualizada com sucesso!');
      await carregarMesas();
      setMesaSelecionada(null);
      setResponsavel('');
      navigate(`/cardapio/${mesaAtualizada.numero}`);
    } catch (err) {
      console.error(err);
      setErro('Erro ao atualizar mesa.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center">
      <div className="text-center">
        <div className="mb-8">
          <span className="text-8xl">🍽️</span>
        </div>

        <h1 className="text-5xl font-bold text-amber-500 mb-4">Sofistia</h1>
        <p className="text-2xl text-white mb-8">
          Bem-vindo ao restaurante mais sofisticado da cidade
        </p>

        <div className="mb-4">
          <label htmlFor="mesa" className="block text-white text-lg mb-2">
            Selecione sua mesa:
          </label>
          <select
            id="mesa"
            value={mesaSelecionada ?? ''}
            onChange={(e) => setMesaSelecionada(Number(e.target.value))}
            className="px-4 py-2 rounded text-lg text-center w-40 outline-none border border-gray-400 focus:border-amber-600 bg-amber-600 text-white font-semibold"
          >
            <option value="" disabled>
              Selecione...
            </option>
            {mesasDisponiveis.map((mesa) => (
              <option key={mesa.numero} value={mesa.numero}>
                Mesa {mesa.numero}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label htmlFor="responsavel" className="block text-white text-lg mb-2">
            Responsável:
          </label>
          <input
            id="responsavel"
            type="text"
            value={responsavel}
            onChange={(e) => setResponsavel(e.target.value)}
            placeholder="Informe o nome do responsável"
            className="px-4 py-2 rounded text-lg w-64 outline-none border border-gray-400 focus:border-amber-600"
          />
        </div>

        {erro && <div className="text-red-400 mt-2 text-sm mb-4">{erro}</div>}

        <button
          onClick={salvarMesa}
          className="bg-amber-600 hover:bg-amber-700 text-white px-12 py-4 rounded-lg text-xl transition transform hover:scale-105"
        >
          Ir para Cardápio
        </button>
      </div>
    </div>
  );
};

export default HomePage;
