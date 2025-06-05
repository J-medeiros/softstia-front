import axios from 'axios';
import { PedidoInput } from '../models/types';

const pedidoApiUrl = 'https://sofistia-back-end.onrender.com/api/crud-pedido.php';

// Cria um novo pedido com status fixo (idStatus = 2 no backend)
export async function criarPedido(dados: PedidoInput): Promise<{ success: boolean; message: string }> {
  const response = await axios.post(pedidoApiUrl, dados);
  return response.data;
}
