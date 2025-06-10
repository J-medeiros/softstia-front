import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Produto } from "../models/types";
import { ProdutoService } from "../services/produtoService";
import { CarrinhoService } from "../services/carrinhoService";
import { chamarGarcomApi } from "../services/garcomService";


export const Cardapio: React.FC = () => {
  const { numeroMesa } = useParams<{ numeroMesa: string }>();
  const navigate = useNavigate();

  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [quantidades, setQuantidades] = useState<Record<number, number>>({});

useEffect(() => {
  ProdutoService.getProdutos().then((response) => {
    if (response && Array.isArray(response)) {
      setProdutos(response);
    } else {
      console.error("Erro: `data` não é um array!", response);
      setProdutos([]); // Define um array vazio para evitar erro de `.map()`
    }
  }).catch((error) => {
    console.error("Erro ao buscar produtos:", error);
  });
}, []);




  const adicionarAoCarrinho = (produto: Produto) => {
    const mesa = Number(numeroMesa) || 1;
    const quantidade = 1;
    const totalvalor = produto.valor * quantidade;

    CarrinhoService.adicionarProdutoAoCarrinho(
      produto.id,
      quantidade,
      mesa,
      totalvalor
    )
      .then(() => {
        setQuantidades((prev) => ({
          ...prev,
          [produto.id]: (prev[produto.id] || 0) + 1,
        }));
      })
      .catch(() => alert("Erro ao adicionar ao carrinho"));
  };

const chamarGarcom = () => {
  const mesa = numeroMesa ?? "1";
  chamarGarcomApi(mesa)
    .then(() => {
      alert("Garçom chamado com sucesso!");
      navigate(`/garcom/${mesa}`);
    })
    .catch(() => {
      alert("Erro ao chamar o garçom");
    });
};

  return (
    <div className="min-h-screen bg-gray-900 pb-20">
      {/* Navbar simplificada */}
      <nav className="bg-gray-800 p-4 shadow-lg">
        <div className="container mx-auto flex items-center justify-between">
          <h1
            className="text-3xl font-bold text-amber-500 cursor-pointer"
            onClick={() => navigate("/")}
          >
            Sofistia
          </h1>
          <div
            onClick={() => navigate(`/carrinho/${numeroMesa}`)}
            className="cursor-pointer text-white text-3xl"
          >
            🛒
          </div>
        </div>
      </nav>

      {/* Mesa selecionada */}
      {numeroMesa && (
        <div className="w-full flex justify-center mt-4">
          <div className="flex items-center gap-2 bg-gray-800 text-white px-4 py-1 rounded-b-lg shadow text-base font-medium">
            <span className="text-amber-400 text-xl">🪑</span>
            Mesa selecionada:
            <span className="font-bold text-amber-400">{numeroMesa}</span>
          </div>
        </div>
      )}

      {/* Lista de produtos sem filtro */}
      <div className="container mx-auto p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
          {produtos.map((produto) => (
            <div
              key={produto.id}
              className="bg-gray-800 rounded-lg shadow-lg overflow-hidden"
            >
              <div className="h-48 overflow-hidden">
                <img
                  src={produto.image}
                  alt={produto.nome}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-4">
                <h2 className="text-xl font-semibold text-white">
                  {produto.nome}
                </h2>
                <p className="text-amber-400 text-lg my-2">
                  R$ {produto.valor}
                </p>
                <div className="flex items-center justify-between">
                  <button
                    onClick={() => adicionarAoCarrinho(produto)}
                    className="bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded transition"
                  >
                    Adicionar
                  </button>
                  {quantidades[produto.id] && (
                    <span className="ml-2 text-white font-bold bg-amber-600 rounded-full px-3 py-1">
                      {quantidades[produto.id]}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Botão Chamar Garçom */}
      <button
        onClick={chamarGarcom}
        className="fixed bottom-6 right-6 bg-amber-600 hover:bg-amber-700 text-white px-4 py-3 rounded-full shadow-xl flex items-center"
      >
        <span className="mr-2">👨‍🍳</span>
        Chamar Garçom
      </button>
    </div>
  );
};

export default Cardapio;
