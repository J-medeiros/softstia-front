import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useCarrinho } from '../contexts/CarrinhoContext';
import { useMesa } from '../contexts/MesaContext';

const produtos = [
  { 
    id: 1, 
    nome: 'Pizza Margherita', 
    preco: 45.90, 
    categoria: 'pratos',
    imagem: '/img/pizza-margherita.jpg'
  },
  { 
    id: 2, 
    nome: 'Hambúrguer Artesanal', 
    preco: 32.50, 
    categoria: 'pratos',
    imagem: '/img/hamburguer.jpg'
  },
  {
    id: 3,
    nome: 'Salada Caesar',
    preco: 28.00,
    categoria: 'pratos',
    imagem: '/img/salada-caesar.jpg'
  },
  {
    id: 4,
    nome: 'Sorvete de Chocolate',
    preco: 15.00, 
    categoria: 'sobremesas',
    imagem: '/img/sorvete-chocolate.jpg'
  },
  {
    id: 5,
    nome: 'Café Expresso',
    preco: 10.00,
    categoria: 'bebidas',
    imagem: '/img/cafe-expresso.jpg'
  },
  {
    id: 6,  
    nome: 'Suco de Laranja',
    preco: 10.00,
    categoria: 'bebidas',
    imagem: '/img/suco-laranja.jpg'
  },
  { 
    id: 7,
    nome: 'Coca Cola',
    preco: 10.00,
    categoria: 'bebidas',
    imagem: '/img/coca-cola.jpg'
  },  
  {
    id: 8,
    nome: 'Suco de Uva',
    preco: 10.00,
    categoria: 'bebidas',
    imagem: '/img/suco-uva.jpg'
  },  
  {
    id: 9,
    nome: 'Suco de Abacaxi',
    preco: 10.00,
    categoria: 'bebidas',
    imagem: '/img/suco-abacaxi.jpg'
  },    
  {
    id: 10,
    nome: 'Suco de Goiaba',
    preco: 10.00,
    categoria: 'bebidas',
    imagem: '/img/suco-goiaba.jpg'
  },  
  {
    id: 11,
    nome: 'Lasanha',
    preco: 60.00,
    categoria: 'pratos', 
    imagem: '/img/lasanha.jpg'
  },  
  {
    id: 12,
    nome: 'picanha',
    preco: 100.00,
    categoria: 'pratos',
    imagem: '/img/picanha.jpg'
  },  
  {
    id: 13,
    nome: 'Bife Ancho',
    preco: 100.00,
    categoria: 'pratos',
    imagem: '/img/bife-de-ancho.jpg'
  },  
  {
    id: 14,
    nome: 'Pizza Calabresa',
    preco: 45.00,
    categoria: 'pratos',
    imagem: '/img/pizza-calabresa.jpg'
  },  
  {
    id: 15,
    nome: 'Pizza Portuguesa',
    preco: 45.00,
    categoria: 'pratos',
    imagem: '/img/pizza-portuguesa.jpg'
  },  
  
];

export function Cardapio() {
  const navigate = useNavigate();
  const { adicionarItem, itens } = useCarrinho();
  const { mesa } = useMesa();
  const [categoriaAtiva, setCategoriaAtiva] = useState('pratos');

  const totalItens = itens.reduce((total, item) => total + item.quantidade, 0);

  const produtosFiltrados = produtos.filter(produto => produto.categoria === categoriaAtiva);

  const adicionarAoCarrinho = (produto: typeof produtos[0]) => {
    adicionarItem({
      id: produto.id,
      nome: produto.nome,
      preco: produto.preco,
      imagem: produto.imagem
    });
  };

  // Funções de navegação simples
  const irParaHome = () => navigate('/');
  const irParaCarrinho = () => navigate('/carrinho');
  const irParaGarcom = () => navigate('/garcom');

  return (
    <div className="min-h-screen bg-gray-900 pb-20">
      <nav className="bg-gray-800 p-4 shadow-lg">
        <div className="container mx-auto flex items-center">
          <div className="flex-1 flex space-x-2">
            <button
              onClick={() => setCategoriaAtiva('pratos')}
              className={`px-4 py-2 rounded-full ${categoriaAtiva === 'pratos' ? 'bg-amber-600 text-white' : 'bg-gray-700 text-gray-300'}`}
            >
              Pratos
            </button>
            <button
              onClick={() => setCategoriaAtiva('sobremesas')}
              className={`px-4 py-2 rounded-full ${categoriaAtiva === 'sobremesas' ? 'bg-amber-600 text-white' : 'bg-gray-700 text-gray-300'}`}
            >
              Sobremesas
            </button>
            <button
              onClick={() => setCategoriaAtiva('bebidas')}
              className={`px-4 py-2 rounded-full ${categoriaAtiva === 'bebidas' ? 'bg-amber-600 text-white' : 'bg-gray-700 text-gray-300'}`}
            >
              Bebidas
            </button>
          </div>
          <div className="flex-1 flex justify-center">
            <button
              onClick={irParaHome}
              className="p-2"
              aria-label="Ir para Home"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="black" viewBox="0 0 24 24" width="32" height="32">
                <path d="M3 12l9-9 9 9" stroke="black" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M9 21V9h6v12" stroke="black" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
          <div className="flex-1 flex justify-end">
            <button 
              onClick={irParaCarrinho}
              className="relative p-2 text-white hover:text-amber-400 transition"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
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
      {mesa && (
        <div className="w-full flex justify-center">
          <div className="flex items-center gap-2 bg-gray-800 text-white px-4 py-1 rounded-b-lg shadow mb-4 text-base font-medium">
            <span className="text-amber-400 text-xl">🪑</span>
            Mesa selecionada: <span className="font-bold text-amber-400">{mesa}</span>
          </div>
        </div>
      )}
      <div className="text-center py-6 bg-gray-900">
        <h1 className="text-4xl font-bold text-amber-500 mb-2">Sofistia</h1>
        <p className="text-white text-xl">Gastronomia Tecnologia</p>
      </div>
      <div className="container mx-auto p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
          {produtosFiltrados.map((produto) => (
            <div key={produto.id} className="bg-gray-800 rounded-lg shadow-lg overflow-hidden">
              <div className="h-48 overflow-hidden">
                <img 
                  src={produto.imagem} 
                  alt={produto.nome}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
              
              <div className="p-4">
                <h2 className="text-xl font-semibold text-white">{produto.nome}</h2>
                <p className="text-amber-400 text-lg my-2">R$ {produto.preco.toFixed(2)}</p>
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