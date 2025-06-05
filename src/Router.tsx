import { Routes, Route, Navigate } from "react-router-dom";
import { Carrinho } from "./paginas/Carrinho";
import { Garcom } from "./paginas/Garcom";
import { Cardapio } from "./paginas/Cardapio";
import Home from "./paginas/Home";

export function Router() {
  return (
    <Routes>
      {/* Redireciona "/" para "/home" */}
      <Route path="/" element={<Navigate to="/home" />} />

      {/* Página inicial */}
      <Route path="/home" element={<Home />} />

      {/* Cardápio com número da mesa como parâmetro */}
      <Route path="/cardapio/:numeroMesa" element={<Cardapio />} />

      {/* Carrinho com número da mesa como parâmetro */}
      <Route path="/carrinho/:numeroMesa" element={<Carrinho />} />

      {/* Chamar garçom com número da mesa como parâmetro */}
      <Route path="/garcom/:mesa" element={<Garcom />} />
    </Routes>
  );
}
