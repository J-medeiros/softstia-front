// src/test/Pedido.test.tsx

import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { Pedido } from '../paginas/Pedido';

// Spy singleton para useNavigate
const mockedNavigate = vi.fn();

// Mock parcial de react-router-dom: mantém todos os exports e só substitui useNavigate
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual<typeof import('react-router-dom')>(
    'react-router-dom'
  );
  return {
    ...actual,
    useNavigate: () => mockedNavigate,
  };
});

// Variáveis de controle para os contextos
let mesaValue: number | undefined;
let carrinhoItens: Array<{ id: number; nome: string; preco: number; quantidade: number }>;
const limparCarrinhoSpy = vi.fn();

// Mock do MesaContext
vi.mock('../contexts/MesaContext', () => ({
  useMesa: () => ({
    mesa: mesaValue,
  }),
}));

// Mock do CarrinhoContext
vi.mock('../contexts/CarrinhoContext', () => ({
  useCarrinho: () => ({
    itens: carrinhoItens,
    limparCarrinho: limparCarrinhoSpy,
  }),
}));

describe('Componente Pedido', () => {
  beforeEach(() => {
    mockedNavigate.mockClear();
    limparCarrinhoSpy.mockClear();
  });

  it('exibe status "enviado" por padrão com emoji e texto corretos', () => {
    mesaValue = 3;
    carrinhoItens = [
      { id: 1, nome: 'Pizza Margherita', preco: 30, quantidade: 2 },
      { id: 2, nome: 'Café Expresso', preco: 10, quantidade: 1 },
    ];

    render(
      <MemoryRouter>
        <Pedido />
      </MemoryRouter>
    );

    // Emoji 📝 e texto "Pedido enviado para cozinha"
    expect(screen.getByText('📝')).toBeInTheDocument();
    expect(screen.getByText('Pedido enviado para cozinha')).toBeInTheDocument();
  });

  it('lista todos os itens do pedido com quantidades e subtotais', () => {
    mesaValue = 5;
    carrinhoItens = [
      { id: 1, nome: 'Bife Ancho', preco: 100, quantidade: 1 },
      { id: 2, nome: 'Suco de Laranja', preco: 10, quantidade: 3 },
    ];

    render(
      <MemoryRouter>
        <Pedido />
      </MemoryRouter>
    );

    // Verifica cada item renderizado com quantidade e subtotal formatado
    expect(screen.getByText('Bife Ancho')).toBeInTheDocument();
    expect(screen.getByText('Quantidade: 1')).toBeInTheDocument();
    expect(screen.getByText(/R\$ 100\.00/)).toBeInTheDocument();

    expect(screen.getByText('Suco de Laranja')).toBeInTheDocument();
    expect(screen.getByText('Quantidade: 3')).toBeInTheDocument();
    // Subtotal = 10 * 3 = 30
    expect(screen.getByText(/R\$ 30\.00/)).toBeInTheDocument();
  });

  it('mostra a mesa selecionada no topo', () => {
    mesaValue = 7;
    carrinhoItens = [];

    render(
      <MemoryRouter>
        <Pedido />
      </MemoryRouter>
    );

    expect(screen.getByText('Mesa selecionada:')).toBeInTheDocument();
    expect(screen.getByText('7')).toBeInTheDocument();
  });

  it('ao clicar em "Voltar ao Cardápio" limpa o carrinho e navega', () => {
    mesaValue = 2;
    carrinhoItens = [{ id: 1, nome: 'Lasanha', preco: 60, quantidade: 1 }];

    render(
      <MemoryRouter>
        <Pedido />
      </MemoryRouter>
    );

    // Clica em um dos botões "Voltar ao Cardápio"
    const botoes = screen.getAllByText('Voltar ao Cardápio');
    fireEvent.click(botoes[0]);

    expect(limparCarrinhoSpy).toHaveBeenCalled();
    expect(mockedNavigate).toHaveBeenCalledWith('/cardapio');
  });
});
