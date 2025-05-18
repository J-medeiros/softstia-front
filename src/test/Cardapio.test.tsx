import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Cardapio } from '../paginas/Cardapio';
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';
import { CarrinhoProvider } from '../contexts/CarrinhoContext';
import { MesaProvider } from '../contexts/MesaContext';

const renderComProviders = () => {
  return render(
    <MesaProvider>
      <CarrinhoProvider>
        <BrowserRouter>
          <Cardapio />
        </BrowserRouter>
      </CarrinhoProvider>
    </MesaProvider>
  );
};

describe('Componente Cardapio', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('deve renderizar os produtos da categoria padrão (pratos)', () => {
    renderComProviders();

    expect(screen.getByText('Pizza Margherita')).toBeInTheDocument();
    expect(screen.getByText('Hambúrguer Artesanal')).toBeInTheDocument();
  });

  it('deve mudar para a categoria "bebidas" quando clicado', () => {
    renderComProviders();

    const botaoBebidas = screen.getByRole('button', { name: /bebidas/i });
    fireEvent.click(botaoBebidas);

    expect(screen.getByText('Café Expresso')).toBeInTheDocument();
    expect(screen.queryByText('Pizza Margherita')).not.toBeInTheDocument();
  });

  it('deve mudar para a categoria "sobremesas" quando clicado', () => {
    renderComProviders();

    const botaoSobremesas = screen.getByRole('button', { name: /sobremesas/i });
    fireEvent.click(botaoSobremesas);

    expect(screen.getByText('Sorvete de Chocolate')).toBeInTheDocument();
  });
});
