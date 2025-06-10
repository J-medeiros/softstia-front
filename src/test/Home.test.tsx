import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { vi } from "vitest";
import HomePage from "../paginas/Home"; // ajuste se o caminho for diferente
import { MemoryRouter } from "react-router-dom";
import * as mesaService from "../services/mesaService";

// Mock do useNavigate
const mockNavigate = vi.fn();
vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual<typeof import("react-router-dom")>("react-router-dom");
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

// Mock da API
const mesasMock = [
  { numero: 1, responsavel: "" },
  { numero: 2, responsavel: "" },
];

describe("HomePage", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("deve listar as mesas disponíveis ao carregar a página", async () => {
    vi.spyOn(mesaService, "listarMesasDisponiveis").mockResolvedValue(mesasMock);

    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText("Mesa 1")).toBeInTheDocument();
      expect(screen.getByText("Mesa 2")).toBeInTheDocument();
    });
  });

  it("deve mostrar erro se clicar sem selecionar mesa e responsável", async () => {
    vi.spyOn(mesaService, "listarMesasDisponiveis").mockResolvedValue(mesasMock);

    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>
    );

    const botao = screen.getByText("Ir para Cardápio");
    fireEvent.click(botao);

    expect(await screen.findByText("Selecione a mesa e informe o responsável.")).toBeInTheDocument();
  });

  it("deve atualizar a mesa e navegar para o cardápio", async () => {
    vi.spyOn(mesaService, "listarMesasDisponiveis").mockResolvedValue(mesasMock);
    const atualizarMesaMock = vi.spyOn(mesaService, "atualizarMesa").mockResolvedValue({ numero: 1, responsavel: "João" });

    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText("Mesa 1")).toBeInTheDocument();
    });

    fireEvent.change(screen.getByLabelText("Selecione sua mesa:"), {
      target: { value: "1" },
    });

    fireEvent.change(screen.getByLabelText("Responsável:"), {
      target: { value: "João" },
    });

    fireEvent.click(screen.getByText("Ir para Cardápio"));

    await waitFor(() => {
      expect(atualizarMesaMock).toHaveBeenCalledWith({ numero: 1, responsavel: "João" });
      expect(mockNavigate).toHaveBeenCalledWith("/cardapio/1");
    });
  });
});
