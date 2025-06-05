// src/services/carrinhoService.ts
import axios from 'axios';
import { ProdutoCarrinho } from '../models/types';

const API_URL = 'https://sofistia-back-end.onrender.com/api/crud-carrinho.php';

const obterItensCarrinhoPorMesa = async (mesa: number) => {
  const res = await axios.get(`${API_URL}?mesa=${mesa}`);
  return res.data || [];
};

const adicionarProdutoAoCarrinho = async (
  id_produto: number,
  quantidade: number,
  mesa: number,
  totalvalor: number,
) => {
  return axios.post(API_URL, {
    id_produto,
    quantidade,
    mesa,
    totalvalor,
  });
};

const atualizarQuantidade = async (item: ProdutoCarrinho, mesa: number) => {
  const body = {
    id_produto: item.id_produto,
    mesa,
    quantidade: item.quantidade,
  };
  return axios.put(API_URL, body);
};

const removerItem = async (id_produto: number, mesa: number) => {
  return axios.request({
    method: 'delete',
    url: API_URL,
    data: { id_produto, mesa },
  });
};

const removerItemDoCarrinho = async (id_produto: number, id_mesa: number) => {
  return axios.delete(`${API_URL}?id_produto=${id_produto}&id_mesa=${id_mesa}`);
};

const limparCarrinho = async (id: number, mesa: number) => {
  return axios.delete('https://sofistia-back-end.onrender.com/api/crud-carrinho.php', {
    data: { id, mesa },
  });
};

const CarrinhoService = {
  obterItensCarrinhoPorMesa,
  adicionarProdutoAoCarrinho,
  atualizarQuantidade,
  removerItem,
  removerItemDoCarrinho,
  limparCarrinho,
  enviarPedido,
};
export async function enviarPedido(idproduto: number, numeroMesa: number) {
  const url = 'https://sofistia-back-end.onrender.com/api/crud-pedido.php';
  return axios.post(url, {
    idproduto,
    numeroMesa,
  });
}

export default CarrinhoService;
