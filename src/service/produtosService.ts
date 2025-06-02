import axios from 'axios';

export interface Produto {
  id: number;
  nome: string;
  descricao: string;
  valor: number;
  image: string;
}

export async function getProdutos(): Promise<Produto[]> {
  const url = 'http://localhost/Sofistia/Desenvolvimento.Sofistia/desenvolvimento-back-end/api/crud-produtos.php';
  try {
    const response = await axios.get(url);
    return response.data as Produto[];
  } catch (error) {
    console.error('Erro ao buscar produtos:', error);
    throw error;
  }
}