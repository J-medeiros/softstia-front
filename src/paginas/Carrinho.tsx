import React, { useEffect, useState, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import CarrinhoService from "../services/carrinhoService";
import { ProdutoCarrinho } from "../models/types";

export const Carrinho: React.FC = () => {
  const { numeroMesa } = useParams<{ numeroMesa: string }>();
  const navigate = useNavigate();
  const [itens, setItens] = useState<ProdutoCarrinho[]>([]);
  const [pedidoFinalizado, setPedidoFinalizado] = useState(false);

  const buscarItensCarrinho = useCallback(() => {
    CarrinhoService.obterItensCarrinhoPorMesa(Number(numeroMesa))
      .then((res) => setItens(res.data || []))
      .catch((error) => console.error("Erro ao buscar carrinho:", error));
  }, [numeroMesa]);

  useEffect(() => {
    buscarItensCarrinho();
  }, [buscarItensCarrinho]);

   const removerItem = (id_produto: number) => {
    CarrinhoService.removerItemDoCarrinho(id_produto, Number(numeroMesa))
      .then(() => buscarItensCarrinho())
      .catch((error) => console.error("Erro ao remover item:", error));
  };

  const incrementar = (item: ProdutoCarrinho) => {
    item.quantidade++;
    CarrinhoService.atualizarQuantidade(item, Number(numeroMesa)).then(() =>
      buscarItensCarrinho()
    );
  };

  const decrementar = (item: ProdutoCarrinho) => {
    if (item.quantidade > 1) {
      item.quantidade--;
      CarrinhoService.atualizarQuantidade(item, Number(numeroMesa)).then(() =>
        buscarItensCarrinho()
      );
    }
  };

  const calcularTotal = () =>
    itens.reduce((total, item) => total + item.totalvalor * item.quantidade, 0);

  const finalizarPedido = async () => {
    try {
      for (const item of itens) {
        await CarrinhoService.enviarPedido(item.id_produto, Number(numeroMesa));
      }

      setPedidoFinalizado(true);

      for (const item of itens) {
        await CarrinhoService.limparCarrinho(
          item.id_produto,
          Number(numeroMesa)
        );
      }

      buscarItensCarrinho();
    } catch (error) {
      console.error("Erro ao finalizar pedido:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 p-6">
      <div className="w-full flex justify-center">
        <div className="flex items-center gap-2 bg-gray-800 text-white px-4 py-1 rounded-b-lg shadow mb-4 text-base font-medium">
          <span className="text-amber-400 text-xl">🪑</span>
          Mesa selecionada:{" "}
          <span className="font-bold text-amber-400">{numeroMesa}</span>
        </div>
      </div>

      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-amber-500">Carrinho</h1>
          <button
            onClick={() => navigate(`/cardapio/${numeroMesa}`)}
            className="text-white hover:text-amber-400"
          >
            Voltar ao Cardápio
          </button>
        </div>

        {itens.length === 0 ? (
          <div className="text-center text-white py-12">
            <p className="text-xl">Seu carrinho está vazio</p>
            <button
              onClick={() => navigate(`/cardapio/${numeroMesa}`)}
              className="mt-4 bg-amber-600 hover:bg-amber-700 text-white px-6 py-2 rounded"
            >
              Ver Cardápio
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {itens.map((item) => (
              <div
                key={item.id_produto}
                className="bg-gray-800 p-4 rounded-lg flex items-center justify-between"
              >
                <div className="flex items-center space-x-4">
                  <img
                    src={item.image}
                    alt={item.nome}
                    className="w-20 h-20 object-cover rounded"
                  />
                  <div>
                    <h3 className="text-white text-lg">{item.nome}</h3>
                    <p className="text-amber-400">
                      R$ {item.totalvalor * item.quantidade}
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => decrementar(item)}
                      className="bg-gray-700 text-white px-3 py-1 rounded"
                    >
                      -
                    </button>
                    <span className="text-white">{item.quantidade}</span>
                    <button
                      onClick={() => incrementar(item)}
                      className="bg-gray-700 text-white px-3 py-1 rounded"
                    >
                      +
                    </button>
                  </div>
                  <button
                    onClick={() => removerItem(item.id_produto)}
                    className="text-red-500 hover:text-red-600"
                  >
                    Remover
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="mt-8 bg-gray-800 p-6 rounded-lg">
          <div className="flex justify-between items-center text-xl text-white mb-4">
            <span>Total:</span>
            <span className="text-amber-400">
              R$ {calcularTotal().toFixed(2)}
            </span>
          </div>
          <div className="flex gap-4">
            <button
              onClick={() =>
                CarrinhoService.limparCarrinho(0, Number(numeroMesa))
              }
              className="flex-1 bg-red-600 hover:bg-red-700 text-white py-3 rounded-lg transition"
            >
              Cancelar
            </button>
            <button
              onClick={finalizarPedido}
              className="flex-1 bg-amber-600 hover:bg-amber-700 text-white py-3 rounded-lg transition"
            >
              Finalizar Pedido
            </button>
          </div>
        </div>

        {pedidoFinalizado && (
          <div className="mt-6 p-6 bg-green-600 text-white rounded-lg text-center shadow-lg transition-all">
            <h2 className="text-2xl font-bold mb-2">
              ✅ Pedido realizado com sucesso!
            </h2>
            <p className="text-lg">
              A cozinha foi notificada. Em breve seu pedido estará sendo
              preparado.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Carrinho;
