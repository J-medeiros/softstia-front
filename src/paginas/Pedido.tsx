import { useNavigate } from 'react-router-dom';
import { useCarrinho } from '../contexts/CarrinhoContext';
import { useMesa } from '../contexts/MesaContext';

type StatusPedido = 'enviado' | 'preparando' | 'pronto' | 'entregue';

export function Pedido() {
  const navigate = useNavigate();
  const { itens, limparCarrinho } = useCarrinho();
  const { mesa } = useMesa();
  const status = 'enviado' as StatusPedido;

  const getStatusText = () => {
    switch (status) {
      case 'enviado':
        return 'Pedido enviado para cozinha';
      case 'preparando':
        return 'Seu pedido está sendo preparado';
      case 'pronto':
        return 'Seu pedido está pronto!';
      case 'entregue':
        return 'Pedido entregue! Obrigado pela preferência!';
    }
  };

  const getStatusEmoji = () => {
    switch (status) {
      case 'enviado':
        return '📝';
      case 'preparando':
        return '👨‍🍳';
      case 'pronto':
        return '✅';
      case 'entregue':
        return '🎉';
    }
  };

  const handleVoltar = () => {
    limparCarrinho();
    navigate('/cardapio');
  };

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
          <h1 className="text-3xl font-bold text-amber-500">Acompanhamento do Pedido</h1>
          <button
            onClick={handleVoltar}
            className="text-white hover:text-amber-400"
          >
            Voltar ao Cardápio
          </button>
        </div>

        <div className="bg-gray-800 p-8 rounded-lg text-center">
          <div className="mb-6">
            <span className="text-6xl">{getStatusEmoji()}</span>
          </div>
          
          <h2 className="text-2xl font-semibold text-white mb-4">
            {getStatusText()}
          </h2>
          
          <p className="text-gray-300 mb-8">
            Aguarde enquanto nossa equipe prepara seu pedido.
            Você será notificado quando houver atualizações.
          </p>
          
          <div className="mt-8 space-y-4">
            <h3 className="text-xl text-white mb-4">Itens do Pedido:</h3>
            {itens.map((item) => (
              <div key={item.id} className="bg-gray-700 p-4 rounded-lg flex justify-between items-center">
                <div className="text-left">
                  <p className="text-white">{item.nome}</p>
                  <p className="text-gray-300">Quantidade: {item.quantidade}</p>
                </div>
                <p className="text-amber-400">R$ {(item.preco * item.quantidade).toFixed(2)}</p>
              </div>
            ))}
          </div>

          <div className="mt-8">
            <button
              onClick={handleVoltar}
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