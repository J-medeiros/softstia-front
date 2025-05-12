import { useNavigate } from "react-router-dom";
import { useMesa } from '../contexts/MesaContext';

export function Garcom() {
  const navigate = useNavigate();
  const { mesa } = useMesa();

  const irParaCardapio = () => navigate('/cardapio');

  return (
    <div className="min-h-screen bg-gray-900 p-6">
      {mesa && (
        <div className="w-full flex justify-center">
          <div className="flex items-center gap-2 bg-gray-800 text-white px-4 py-1 rounded-b-lg shadow mb-4 text-base font-medium">
            <span className="text-amber-400 text-xl">🪑</span>
            Mesa selecionada: <span className="font-bold text-amber-400">{mesa}</span>
          </div>
        </div>
      )}
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-amber-500">Chamada do Garçom</h1>
          <button
            onClick={irParaCardapio}
            className="text-white hover:text-amber-400"
          >
            Voltar ao Cardápio
          </button>
        </div>

        <div className="bg-gray-800 p-8 rounded-lg text-center">
          <div className="mb-6">
            <span className="text-6xl">👨‍🍳</span>
          </div>
          
          <h2 className="text-2xl font-semibold text-white mb-4">
            Garçom Chamado!
          </h2>
          
          <p className="text-gray-300 mb-8">
            Um de nossos garçons irá até sua mesa em instantes.
            Por favor, aguarde.
          </p>

          <div className="flex justify-center gap-4">
            <button
              onClick={irParaCardapio}
              className="bg-amber-600 hover:bg-amber-700 text-white px-8 py-3 rounded-lg transition"
            >
              Voltar ao Cardápio
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}