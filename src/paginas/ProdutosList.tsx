import { useEffect, useState } from 'react';
import axios from 'axios';
import { Produto } from '../service/produtosService';

export function ProdutosLista() {
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState<string | null>(null);

  useEffect(() => {
    axios.get("http://localhost/Sofistia/Desenvolvimento.Sofistia/desenvolvimento-back-end/api/crud-produtos.php")
      .then((response) => {
        setProdutos(response.data);
        setCarregando(false);
      })
      .catch((error) => {
        setErro('Erro ao carregar produtos.');
        setCarregando(false);
        console.error('Erro ao carregar produtos:', error);
      });
  }, []);

  if (carregando) return <p className="text-white">Carregando produtos...</p>;
  if (erro) return <p className="text-red-500">{erro}</p>;
  if (produtos.length === 0) return <p className="text-white">Nenhum produto encontrado.</p>;

  // Cria um array de elementos manualmente
  const produtosJSX = [];
  for (let i = 0; i < produtos.length; i++) {
    const produto = produtos[i];
    produtosJSX.push(
      <div key={produto.id} className="bg-gray-800 text-white p-4 rounded shadow">
        <img src={produto.image} alt={produto.nome} className="w-full h-40 object-cover rounded mb-2" />
        <h3 className="text-xl font-bold">{produto.nome}</h3>
        <p className="text-gray-300">{produto.descricao}</p>
        <p className="text-amber-400 mt-2">R$ {produto.valor.toFixed(2)}</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {produtosJSX}
    </div>
  );
}