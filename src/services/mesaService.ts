import axios from 'axios';
import { Mesa } from '../models/types';

const apiUrl = 'https://sofistia-back-end.onrender.com/api/crud-mesa.php';

// Lista mesas disponíveis (sem responsável)
export async function listarMesasDisponiveis(): Promise<Mesa[]> {
  const params = { disponiveis: '1' };
  const response = await axios.get<Mesa[]>(apiUrl, { params });
  return response.data;
}

// Atualiza o responsável pela mesa
export async function atualizarMesa(mesa: Mesa): Promise<Mesa> {
  const response = await axios.put(apiUrl, mesa);
  return response.data;
}
