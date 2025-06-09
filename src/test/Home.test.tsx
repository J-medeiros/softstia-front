import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import HomePage from "../paginas/Home";
import * as mesaService from "../services/mesaService";
import { BrowserRouter } from "react-router-dom";
import { vi } from "vitest"; // IMPORTANTE: importar vi

// Mock do useNavigate usando vi.fn()
const mockedNavigate = vi.fn();

vi.mock("react-router-dom", async () => {
  const actual = (await vi.importActual("react-router-dom")) as any;
  return {
    ...actual,
    useNavigate: () => mockedNavigate,
  };
});

// Mock dos serviços
vi.mock("../services/mesaService");

describe("HomePage", () => {
  const mesasMock = [
    { numero: 1, responsavel: "" },
    { numero: 2, responsavel: "" },
  ];

  beforeEach(() => {
    vi.clearAllMocks();
  });

  test("renderiza opções de mesas disponíveis", async () => {
    (mesaService.listarMesasDisponiveis as jest.Mock).mockResolvedValue({
      success: true,
      data: mesasMock,
    });

    render(
      <BrowserRouter>
        <HomePage />
      </BrowserRouter>
    );

    await waitFor(() => {
      mesasMock.forEach(({ numero }) => {
        expect(
          screen.getByRole("option", { name: `Mesa ${numero}` })
        ).toBeInTheDocument();
      });
    });
  });

  test("exibe erro se não preencher mesa e responsável e clicar no botão", async () => {
    (mesaService.listarMesasDisponiveis as jest.Mock).mockResolvedValue({
      success: true,
      data: mesasMock,
    });

    render(
      <BrowserRouter>
        <HomePage />
      </BrowserRouter>
    );

    const botao = screen.getByRole("button", { name: /Ir para Cardápio/i });
    await userEvent.click(botao);

    expect(
      await screen.findByText("Selecione a mesa e informe o responsável.")
    ).toBeInTheDocument();
  });

  // test("chama atualizarMesa e navega para cardápio quando dados são válidos", async () => {
  //   (mesaService.listarMesasDisponiveis as jest.Mock).mockResolvedValue({
  //     success: true,
  //     data: mesasMock,
  //   });
  //   (mesaService.atualizarMesa as jest.Mock).mockResolvedValue({});

  //   render(
  //     <BrowserRouter>
  //       <HomePage />
  //     </BrowserRouter>
  //   );

  //   // Espera as opções serem carregadas no select
  //   await waitFor(() => {
  //     mesasMock.forEach(({ numero }) => {
  //       expect(
  //         screen.getByRole("option", { name: `Mesa ${numero}` })
  //       ).toBeInTheDocument();
  //     });
  //   });

  //   const selectMesa = screen.getByLabelText(/Selecione sua mesa/i);
  //   await userEvent.selectOptions(selectMesa, "1");

  //   const inputResponsavel = screen.getByLabelText(/Responsável/i);
  //   await userEvent.type(inputResponsavel, "João");

  //   const botao = screen.getByRole("button", { name: /Ir para Cardápio/i });
  //   await userEvent.click(botao);

  //   await waitFor(() => {
  //     expect(mesaService.atualizarMesa).toHaveBeenCalledWith({
  //       numero: 1,
  //       responsavel: "João",
  //     });
  //     expect(mockedNavigate).toHaveBeenCalledWith("/cardapio/1");
  //   });
  // });

  // test("exibe erro se atualizarMesa falhar", async () => {
  //   (mesaService.listarMesasDisponiveis as jest.Mock).mockResolvedValue({
  //     success: true,
  //     data: mesasMock,
  //   });
  //   (mesaService.atualizarMesa as jest.Mock).mockRejectedValue(new Error("Falha"));

  //   render(
  //     <BrowserRouter>
  //       <HomePage />
  //     </BrowserRouter>
  //   );

  //   const selectMesa = screen.getByLabelText(/Selecione sua mesa/i);
  //   await userEvent.selectOptions(selectMesa, "1");

  //   const inputResponsavel = screen.getByLabelText(/Responsável/i);
  //   await userEvent.type(inputResponsavel, "João");

  //   const botao = screen.getByRole("button", { name: /Ir para Cardápio/i });
  //   await userEvent.click(botao);

  //   expect(
  //     await screen.findByText("Erro ao atualizar mesa.")
  //   ).toBeInTheDocument();
  // });
});
