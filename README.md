# 🚀 Sistema de Sofistia - React + PHP

Este projeto é uma aplicação **web completa** para gerenciamento de pedidos, dividida em:

- **Frontend:** React + Bootstrap.
- **Backend:** PHP puro (rodando localmente via WampServer).

---

## ✅ Pré-requisitos

1. **Node.js e npm:**  
   Baixe e instale em: https://nodejs.org/

2. **WampServer (ou XAMPP):**  
   Para rodar o servidor local em PHP.  
   Baixe em: https://www.wampserver.com/

---

## 🛠️ Passos para rodar o projeto

### 1️⃣ Clone o projeto

```bash
git clone https://github.com/seu-usuario/seu-repo.git
cd seu-repo
```
2️⃣ Instale as dependências do React
```bash
npm install
```

3️⃣  Rode o frontend (React)
```bash
npm start
```
🖥️ Estrutura das rotas
/ 👉 Página inicial (navegação entre pedidos e cozinha)

/orders 👉 Tela de pedidos (criar pedidos, listar)

/kitchen 👉 Tela da cozinha (ver pedidos, marcar como pronto)

❓ Problemas comuns
CORS bloqueando?
Instale a extensão "CORS Unblock" no navegador OU ajuste o backend para permitir:


```bash
header("Access-Control-Allow-Origin: *");
```

Portas conflitantes?
Verifique se o React está rodando na porta correta (3000/5173).

✨ Melhorias futuras
Adicionar autenticação.

Usar banco de dados (MySQL).

Implementar feedbacks visuais.

✅ CI configurado com GitHub Actions
✔️ Executa testes Jest automaticamente a cada push para main
