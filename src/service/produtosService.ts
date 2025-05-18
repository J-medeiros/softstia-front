const API_URL =
  'http://localhost/Sofistia/Desenvolvimento.Sofistia/desenvolvimento-back-end/api/crud-produtos.php';

type produtosModelInterface = {
  id: number;
  nome: string;
  descricao: string;
  valor: number;
  image: string;
};

export async function getProdutos() {
  const res = await fetch(`${API_URL}?action=list`);
  return await res.json();
}

export async function addProduto(data: produtosModelInterface) {
  const res = await fetch(API_URL, {
    method: 'POST',
    body: JSON.stringify({ action: 'create', ...data }),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return await res.json();
}
