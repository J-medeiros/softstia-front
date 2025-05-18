const API_URL =
  'http://localhost/Sofistia/Desenvolvimento.Sofistia/desenvolvimento-back-end/api/crud-pedido.php';

type pedidoModelInterface = {
  id: number;
  nome: string;
  descricao: string;
  valor: number;
  image: string;
};

export async function getPedidos() {
  const res = await fetch(`${API_URL}?action=list`);
  return await res.json();
}

export async function addPedido(data: pedidoModelInterface) {
  const res = await fetch(API_URL, {
    method: 'POST',
    body: JSON.stringify({ action: 'create', ...data }),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return await res.json();
}
