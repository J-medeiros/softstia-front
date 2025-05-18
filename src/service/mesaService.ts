const API_URL =
  'http://localhost/Sofistia/Desenvolvimento.Sofistia/desenvolvimento-back-end/api/crud-mesa.php';

type mesaInterface = {
  id: number;
  responsavel: string;
};

export async function getMesas() {
  const res = await fetch(`${API_URL}?action=list`);
  return await res.json();
}

export async function addMesa(data: mesaInterface) {
  const res = await fetch(API_URL, {
    method: 'POST',
    body: JSON.stringify({ action: 'create', ...data }),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return await res.json();
}
