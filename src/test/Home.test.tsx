// src/test/Home.test.tsx

import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { Home } from '../paginas/Home';

// Spy singleton para useNavigate
const mockedNavigate = vi.fn();

// Mock parcial de react-router-dom: mantém todos os exports e sobrescreve useNavigate
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
const setMesaSpy = vi.fn();
const limparCarrinhoSpy = vi.fn();

// Mock do MesaContext
vi.mock('../contexts/MesaContext', () => ({
  useMesa: () => ({
    mesa: mesaValue,
    setMesa: setMesaSpy,
  }),
}));

// Mock do CarrinhoContext
vi.mock('../contexts/CarrinhoContext', () => ({
  useCarrinho: () => ({
    limparCarrinho: limparCarrinhoSpy,
  }),
}));

describe('Componente Home', () => {
  beforeEach(() => {
    mockedNavigate.mockClear();
    setMesaSpy.mockClear();
    limparCarrinhoSpy.mockClear();
  });

  it('exibe erro se clicar em "Ver Cardápio" sem selecionar mesa', () => {
    mesaValue = undefined;

    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByText('Ver Cardápio'));

    expect(screen.getByText('Selecione o número da mesa!')).toBeInTheDocument();
    expect(setMesaSpy).not.toHaveBeenCalled();
    expect(limparCarrinhoSpy).not.toHaveBeenCalled();
    expect(mockedNavigate).not.toHaveBeenCalled();
  });

  it('renderiza seletor com 21 opções quando há mesa inicial', () => {
    mesaValue = 5;

    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );

    // Título e descrição
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Sofistia');
    expect(screen.getByText(/Bem vindo ao restaurante Mata Fome/i)).toBeInTheDocument();

    // Seletor de mesa
    const select = screen.getByLabelText('Selecione sua mesa:') as HTMLSelectElement;
    expect(select.options).toHaveLength(21);
    expect(screen.getByRole('option', { name: '10' })).toBeInTheDocument();
  });

  it('limpa carrinho, seta nova mesa e navega ao mudar para mesa diferente', () => {
    mesaValue = 5;

    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByLabelText('Selecione sua mesa:'), {
      target: { value: '8' },
    });
    fireEvent.click(screen.getByText('Ver Cardápio'));

    expect(limparCarrinhoSpy).toHaveBeenCalled();
    expect(setMesaSpy).toHaveBeenCalledWith(8);
    expect(mockedNavigate).toHaveBeenCalledWith('/cardapio');  // <— correção aqui
  });

  it('não limpa carrinho, mas seta mesma mesa e navega se escolher mesa igual', () => {
    mesaValue = 5;

    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByLabelText('Selecione sua mesa:'), {
      target: { value: '5' },
    });
    fireEvent.click(screen.getByText('Ver Cardápio'));

    expect(limparCarrinhoSpy).not.toHaveBeenCalled();
    expect(setMesaSpy).toHaveBeenCalledWith(5);
    expect(mockedNavigate).toHaveBeenCalledWith('/cardapio');  // <— e aqui
  });
});
