import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useCarrinho } from "../contexts/CarrinhoContext";
import { useMesa } from "../contexts/MesaContext";
import { getProdutos, Produto } from "../service/produtosService";

export function Cardapio() {
  const navigate = useNavigate();
  const { adicionarItem, itens } = useCarrinho();
  const { mesa } = useMesa();
  const [categoriaAtiva, setCategoriaAtiva] = useState("pratos");
  const [produtos, setProdutos] = useState<Produto[]>([]);

  useEffect(() => {
    async function carregarProdutos() {
      const lista = await getProdutos();
      console.log("Produtos recebidos:", lista); // <-- Aqui você vê o que chega do backend
      console.log("Produtos filtrados", produtosFiltrados);
      setProdutos(lista);
    }
    carregarProdutos();
  }, []);

  const totalItens = itens.reduce((total, item) => total + item.quantidade, 0);

  const produtosFiltrados = produtos;
  // produtos.filter((produto) => {
  // const desc = produto.descricao?.toLowerCase() || "";
  // const nome = produto.nome?.toLowerCase() || "";

  if (categoriaAtiva === "pratos") {
    //     return (
    //       !desc.includes("suco") &&
    //       !desc.includes("café") &&
    //       !desc.includes("sorvete")
    //     );
    //   }
    //   if (categoriaAtiva === "sobremesas") {
    //     return desc.includes("sorvete");
    //   }
    //   if (categoriaAtiva === "bebidas") {
    //     return (
    //       desc.includes("suco") || desc.includes("café") || nome.includes("coca")
    //     );
    //   }
    //   return true;
    // });

    const adicionarAoCarrinho = (produto: Produto) => {
      adicionarItem({
        id: produto.id,
        nome: produto.nome,
        preco: produto.valor,
        imagem: produto.image,
      });
    };

    const irParaHome = () => navigate("/");
    const irParaCarrinho = () => navigate("/carrinho");
    const irParaGarcom = () => navigate("/garcom");

    return (
      <div className="min-h-screen bg-gray-900 pb-20">
        {/* Barra de navegação */}
        <nav className="bg-gray-800 p-4 shadow-lg">
          <div className="container mx-auto flex items-center">
            <div className="flex-1 flex space-x-2">
              {["pratos", "sobremesas", "bebidas"].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setCategoriaAtiva(cat)}
                  className={`px-4 py-2 rounded-full ${
                    categoriaAtiva === cat
                      ? "bg-amber-600 text-white"
                      : "bg-gray-700 text-gray-300"
                  }`}
                >
                  {cat.charAt(0).toUpperCase() + cat.slice(1)}
                </button>
              ))}
            </div>
            <div className="flex-1 flex justify-center">
              <button
                onClick={irParaHome}
                className="p-2"
                aria-label="Ir para Home"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="black"
                  viewBox="0 0 24 24"
                  width="32"
                  height="32"
                >
                  <path
                    d="M3 12l9-9 9 9"
                    stroke="black"
                    strokeWidth="2"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M9 21V9h6v12"
                    stroke="black"
                    strokeWidth="2"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>
            <div className="flex-1 flex justify-end">
              <button
                onClick={irParaCarrinho}
                className="relative p-2 text-white hover:text-amber-400 transition"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
                {totalItens > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {totalItens}
                  </span>
                )}
              </button>
            </div>
          </div>
        </nav>

        {/* Exibe mesa selecionada */}
        {mesa && (
          <div className="w-full flex justify-center">
            <div className="flex items-center gap-2 bg-gray-800 text-white px-4 py-1 rounded-b-lg shadow mb-4 text-base font-medium">
              <span className="text-amber-400 text-xl">🪑</span>
              Mesa selecionada:{" "}
              <span className="font-bold text-amber-400">{mesa}</span>
            </div>
          </div>
        )}

        {/* Cabeçalho */}
        <div className="text-center py-6 bg-gray-900">
          <h1 className="text-4xl font-bold text-amber-500 mb-2">Sofistia</h1>
          <p className="text-white text-xl">Gastronomia Tecnologia</p>
        </div>

        {/* Produtos */}
       <div className="container mx-auto p-6">
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
    {produtos.map( (produto) => (
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
            R$ {produto.valor.toFixed(2)}
          </p>
          <div className="flex items-center justify-between">
            <button
              onClick={() => adicionarAoCarrinho(produto)}
              className="bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded transition"
            >
              Adicionar
            </button>
          </div>
        </div>
      </div>
    ))}
  </div>
</div>

        {/* Botão flutuante para chamar garçom */}
        <button
          onClick={irParaGarcom}
          className="fixed bottom-6 right-6 bg-amber-600 hover:bg-amber-700 text-white px-4 py-3 rounded-full shadow-xl flex items-center"
        >
          <span className="mr-2">👨‍🍳</span>
          Chamar Garçom
        </button>
      </div>
    );
  }
}
