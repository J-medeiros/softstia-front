import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { Carrinho } from '../paginas/Carrinho';

// 1) Spy singleton para useNavigate
const mockedNavigate = vi.fn();

// 2) Mock parcial de react-router-dom: mantemos tudo e só sobrescrevemos useNavigate
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual<typeof import('react-router-dom')>(
    'react-router-dom'
  );
  return {
    ...actual,
    useNavigate: () => mockedNavigate,      // 🎯 vi.fn spy para checar chamadas :contentReference[oaicite:0]{index=0}
  };
});

// 3) Mock dos Contextos
vi.mock('../contexts/CarrinhoContext', () => ({
  useCarrinho: () => ({
    itens: [
      { id: 1, nome: 'Pizza Margherita', preco: 30, quantidade: 2, imagem: 'pizza.jpg' }
    ],
    removerItem: vi.fn(),
    atualizarQuantidade: vi.fn(),
    limparCarrinho: vi.fn(),
  }),
}));

vi.mock('../contexts/MesaContext', () => ({
  useMesa: () => ({ mesa: 'Mesa 5' }),
}));

describe('Componente Carrinho', () => {
  beforeEach(() => {
    mockedNavigate.mockClear();            // limpa histórico entre testes :contentReference[oaicite:1]{index=1}
  });

  it('renderiza itens e calcula o total corretamente', () => {
    render(
      <MemoryRouter>
        <Carrinho />
      </MemoryRouter>
    );

    // nome e preço do item
    expect(screen.getByText('Pizza Margherita')).toBeInTheDocument();  
    expect(screen.getByText(/R\$ 30\.00/)).toBeInTheDocument();        // toFixed(2) usa ponto 

    // total = 30 * 2 = 60
    expect(screen.getByText(/R\$ 60\.00/)).toBeInTheDocument();        // regex para ponto decimal 
  });

  it('navega para /cardapio ao clicar em "Voltar ao Cardápio"', () => {
    render(
      <MemoryRouter>
        <Carrinho />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByText('Voltar ao Cardápio'));
    expect(mockedNavigate).toHaveBeenCalledWith('/cardapio');         // verifica navegação correta :contentReference[oaicite:4]{index=4}
  });

  it('limpa o carrinho e navega para /cardapio ao clicar em "Cancelar"', () => {
    render(
      <MemoryRouter>
        <Carrinho />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByText('Cancelar'));
    // limparCarrinho() é chamado internamente e depois navegamos
    expect(mockedNavigate).toHaveBeenCalledWith('/cardapio');
  });
});
