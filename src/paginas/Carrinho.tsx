import { useNavigate } from 'react-router-dom';
import { useCarrinho } from '../contexts/CarrinhoContext';
import { useMesa } from '../contexts/MesaContext';

export function Carrinho() {
  const navigate = useNavigate();
  const { itens, removerItem, atualizarQuantidade, limparCarrinho } = useCarrinho();
  const { mesa } = useMesa();

  const handleCancelar = () => {
    limparCarrinho();
    navigate('/cardapio');
  };

  const irParaCardapio = () => navigate('/cardapio');
  const irParaPedido = () => navigate('/pedido');

  const calcularTotal = () => {
    return itens.reduce((total, item) => total + (item.preco * item.quantidade), 0);
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
          <h1 className="text-3xl font-bold text-amber-500">Carrinho</h1>
          <button
            onClick={irParaCardapio}
            className="text-white hover:text-amber-400"
          >
            Voltar ao Cardápio
          </button>
        </div>

        {itens.length === 0 ? (
          <div className="text-center text-white py-12">
            <p className="text-xl">Seu carrinho está vazio</p>
            <button
              onClick={irParaCardapio}
              className="mt-4 bg-amber-600 hover:bg-amber-700 text-white px-6 py-2 rounded"
            >
              Ver Cardápio
            </button>
          </div>
        ) : (
          <>
            <div className="space-y-4">
              {itens.map((item) => (
                <div key={item.id} className="bg-gray-800 p-4 rounded-lg flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <img
                      src={item.imagem}
                      alt={item.nome}
                      className="w-20 h-20 object-cover rounded"
                    />
                    <div>
                      <h3 className="text-white text-lg">{item.nome}</h3>
                      <p className="text-amber-400">R$ {item.preco.toFixed(2)}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => atualizarQuantidade(item.id, item.quantidade - 1)}
                        className="bg-gray-700 text-white px-3 py-1 rounded"
                      >
                        -
                      </button>
                      <span className="text-white">{item.quantidade}</span>
                      <button
                        onClick={() => atualizarQuantidade(item.id, item.quantidade + 1)}
                        className="bg-gray-700 text-white px-3 py-1 rounded"
                      >
                        +
                      </button>
                    </div>
                    <button
                      onClick={() => removerItem(item.id)}
                      className="text-red-500 hover:text-red-600"
                    >
                      Remover
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 bg-gray-800 p-6 rounded-lg">
              <div className="flex justify-between items-center text-xl text-white mb-4">
                <span>Total:</span>
                <span className="text-amber-400">R$ {calcularTotal().toFixed(2)}</span>
              </div>
              <div className="flex gap-4">
                <button
                  onClick={handleCancelar}
                  className="flex-1 bg-red-600 hover:bg-red-700 text-white py-3 rounded-lg transition"
                >
                  Cancelar
                </button>
                <button
                  onClick={irParaPedido}
                  className="flex-1 bg-amber-600 hover:bg-amber-700 text-white py-3 rounded-lg transition"
                >
                  Finalizar Pedido
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}