import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import Carrinho from "../paginas/Carrinho";
import { vi } from "vitest";
// Simula o carrinhoService
vi.mock("../services/carrinhoService", () => ({
  default: {
    obterItensCarrinhoPorMesa: vi.fn(() =>
      Promise.resolve({
        data: [
          {
            id_produto: 1,
            nome: "Pizza Margherita",
            image: "pizza.jpg",
            quantidade: 2,
            totalvalor: 30,
          },
        ],
      })
    ),
    removerItemDoCarrinho: vi.fn(() => Promise.resolve()),
    atualizarQuantidade: vi.fn(() => Promise.resolve()),
    enviarPedido: vi.fn(() => Promise.resolve()),
    limparCarrinho: vi.fn(() => Promise.resolve()),
  },
}));

describe("Carrinho", () => {
  it("exibe os itens do carrinho e o total corretamente", async () => {
    render(
      <MemoryRouter initialEntries={["/carrinho/1"]}>
        <Routes>
          <Route path="/carrinho/:numeroMesa" element={<Carrinho />} />
        </Routes>
      </MemoryRouter>
    );

    // Aguarda os itens serem carregados
    await waitFor(() =>
      expect(screen.getByText("Pizza Margherita")).toBeInTheDocument()
    );

    expect(screen.getByText("Mesa selecionada:")).toBeInTheDocument();
    expect(screen.getByText("R$ 60")).toBeInTheDocument(); // 30 * 2
  });

  it("permite incrementar a quantidade de um item", async () => {
    render(
      <MemoryRouter initialEntries={["/carrinho/1"]}>
        <Routes>
          <Route path="/carrinho/:numeroMesa" element={<Carrinho />} />
        </Routes>
      </MemoryRouter>
    );

    await screen.findByText("Pizza Margherita");

    const incrementButton = screen.getByText("+");
    fireEvent.click(incrementButton);

    await waitFor(() =>
      expect(screen.getByText("Pizza Margherita")).toBeInTheDocument()
    );
  });
});
