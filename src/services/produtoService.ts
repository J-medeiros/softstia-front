import { Produto } from '../models/types';
import axios from 'axios';

const API_BASE = 'https://sofistia-back-end.onrender.com/api/crud-produtos.php';

export const ProdutoService = {

  getProdutos: async (): Promise<Produto[]> => {
  const response = await axios.get(`${API_BASE}`);
  return response.data;
  }

};
