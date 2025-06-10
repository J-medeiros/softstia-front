import { render, screen, fireEvent } from '@testing-library/react';
import { Pedido } from '../paginas/Pedido';
import { vi } from 'vitest';
import { useCarrinho } from '../contexts/CarrinhoContext';
import { useMesa } from '../contexts/MesaContext';
import { BrowserRouter } from 'react-router-dom';

vi.mock('../contexts/CarrinhoContext');
vi.mock('../contexts/MesaContext');

const mockNavigate = vi.fn();

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual<typeof import('react-router-dom')>('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

describe('Pedido component', () => {
  const mockLimparCarrinho = vi.fn();

  const itensMock = [
    { id: 1, nome: 'Pizza', quantidade: 2, preco: 20 },
    { id: 2, nome: 'Coca-Cola', quantidade: 1, preco: 5 },
  ];

  beforeEach(() => {
    vi.clearAllMocks();


    (useCarrinho as unknown as jest.Mock).mockReturnValue({
      itens: itensMock,
      limparCarrinho: mockLimparCarrinho,
    });

    (useMesa as unknown as jest.Mock).mockReturnValue({
      mesa: '5',
    });
  });

  const renderComRouter = () =>
    render(
      <BrowserRouter>
        <Pedido />
      </BrowserRouter>
    );

  it('deve renderizar corretamente com mesa e itens', () => {
    renderComRouter();

    expect(screen.getByText('Mesa selecionada:')).toBeInTheDocument();
    expect(screen.getByText('Pizza')).toBeInTheDocument();
    expect(screen.getByText('Quantidade: 2')).toBeInTheDocument();
    expect(screen.getByText('Coca-Cola')).toBeInTheDocument();
    expect(screen.getByText('Quantidade: 1')).toBeInTheDocument();
  });

  it('deve mostrar status "enviado" com emoji', () => {
    renderComRouter();

    expect(screen.getByText('Pedido enviado para cozinha')).toBeInTheDocument();
    expect(screen.getByText('📝')).toBeInTheDocument();
  });

  it('deve limpar o carrinho e navegar ao clicar em "Voltar ao Cardápio"', () => {
    renderComRouter();

    const button = screen.getAllByText('Voltar ao Cardápio')[0];
    fireEvent.click(button);

    expect(mockLimparCarrinho).toHaveBeenCalled();
    expect(mockNavigate).toHaveBeenCalledWith('/cardapio');
  });
});
