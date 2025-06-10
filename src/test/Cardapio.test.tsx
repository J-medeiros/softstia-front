import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Cardapio } from '../paginas/Cardapio';
import * as ProdutoService from '../services/produtoService';
import * as CarrinhoService from '../services/carrinhoService';
import { BrowserRouter } from 'react-router-dom';
import { vi, Mock } from 'vitest';

vi.mock('../services/produtoService');
vi.mock('../services/carrinhoService');

const produtosMock = [
  { id: 1, nome: 'Pizza', descricao: 'Deliciosa', valor: 30, image: 'pizza.jpg' },
];

describe('Cardapio', () => {
  beforeEach(() => {
    vi.restoreAllMocks();

    // Corrigir aqui: retornar apenas o array
    (ProdutoService.ProdutoService.getProdutos as Mock).mockResolvedValue(produtosMock);

    (CarrinhoService.default.adicionarProdutoAoCarrinho as Mock).mockResolvedValue({});
  });

  it('deve renderizar produtos', async () => {
    render(<BrowserRouter><Cardapio /></BrowserRouter>);
    expect(await screen.findByText('Pizza')).toBeInTheDocument();
  });

  it('deve adicionar produto ao carrinho', async () => {
    render(<BrowserRouter><Cardapio /></BrowserRouter>);
    const btn = await screen.findByText('Adicionar');
    fireEvent.click(btn);
    await waitFor(() => {
      expect(CarrinhoService.default.adicionarProdutoAoCarrinho).toHaveBeenCalled();
    });
  });
});
