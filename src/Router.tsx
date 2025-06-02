import { Routes, Route } from "react-router-dom";
import { Home } from "./paginas/Home";
import { Cardapio } from "./paginas/Cardapio";
import { Carrinho } from "./paginas/Carrinho";
import { Garcom } from "./paginas/Garcom";
import { Pedido } from "./paginas/Pedido";
import { ProdutosLista } from "./paginas/ProdutosList";

export function Router() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/cardapio" element={<Cardapio />} />
      <Route path="/carrinho" element={<Carrinho />} />
      <Route path="/garcom" element={<Garcom />} />
      <Route path="/pedido" element={<Pedido />} />
      <Route path="/pedidos" element={<Pedido />} />
      <Route path="/Produto" element={<ProdutosLista />} />
    </Routes>
  );
}
