import axios from 'axios';
import { ProdutoCarrinho } from '../models/types';

// URL base da API
const API_BASE = 'https://sofistia-back-end.onrender.com/api';

// Endpoints específicos
const CARRINHO_URL = `${API_BASE}/crud-carrinho.php`;
const PEDIDO_URL = `${API_BASE}/crud-pedido.php`;

export const obterItensCarrinhoPorMesa = async (mesa: number) => {
  const res = await axios.get(`${CARRINHO_URL}?mesa=${mesa}`);
  return res.data || [];
};

const adicionarProdutoAoCarrinho = async (
  id_produto: number,
  quantidade: number,
  mesa: number,
  totalvalor: number,
) => {
  return axios.post(CARRINHO_URL, {
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
  return axios.put(CARRINHO_URL, body);
};

const removerItem = async (id_produto: number, mesa: number) => {
  return axios.request({
    method: 'delete',
    url: CARRINHO_URL,
    data: { id_produto, mesa },
  });
};

const removerItemDoCarrinho = async (id_produto: number, id_mesa: number) => {
  return axios.delete(CARRINHO_URL, { data: { mesa: id_mesa, id: id_produto } });
};

const limparCarrinho = async (id: number, mesa: number) => {
  return axios.delete(CARRINHO_URL, {
    data: { id, mesa },
  });
};

export const CarrinhoService = {
  obterItensCarrinhoPorMesa,
  adicionarProdutoAoCarrinho,
  atualizarQuantidade,
  removerItem,
  removerItemDoCarrinho,
  limparCarrinho,
  enviarPedido,
};

export async function enviarPedido(idproduto: number, numeroMesa: number) {
  return axios.post(PEDIDO_URL, {
    idproduto,
    numeroMesa,
  });
}

export default CarrinhoService;