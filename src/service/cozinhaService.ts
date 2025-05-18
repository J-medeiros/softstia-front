const API_URL =
  'http://localhost/Sofistia/Desenvolvimento.Sofistia/desenvolvimento-back-end/api/crud-cozinha.php';

type cozinha = {
  id: number;
  idPedido: number;
};

export async function getCozinha() {
  const res = await fetch(`${API_URL}?action=list`);
  return await res.json();
}

export async function addCozinha(data: cozinha) {
  const res = await fetch(API_URL, {
    method: 'POST',
    body: JSON.stringify({ action: 'create', ...data }),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return await res.json();
}
