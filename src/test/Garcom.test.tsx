// src/test/Garcom.test.tsx

import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { Garcom } from '../paginas/Garcom';

// 1) Spy singleton para useNavigate
const mockedNavigate = vi.fn();

// 2) Mock parcial de react-router-dom: mantemos tudo e só sobrescrevemos useNavigate
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual<typeof import('react-router-dom')>(
    'react-router-dom'
  );
  return {
    ...actual,
    useNavigate: () => mockedNavigate,  
  };
});

// 3) Mock do contexto MesaContext
vi.mock('../contexts/MesaContext', () => ({
  useMesa: () => ({ mesa: 'Mesa 5' }),
}));

describe('Componente Garçom', () => {
  beforeEach(() => {
    mockedNavigate.mockClear();
  });

  it('exibe título e mensagem de aguarde', () => {
    render(
      <MemoryRouter>
        <Garcom />
      </MemoryRouter>
    );

    expect(screen.getByText('Chamada do Garçom')).toBeInTheDocument();
    expect(screen.getByText('Garçom Chamado!')).toBeInTheDocument();
    expect(
      screen.getByText(/Um de nossos garçons irá até sua mesa em instantes/i)
    ).toBeInTheDocument();
  });

  it('mostra a mesa selecionada no topo', () => {
    render(
      <MemoryRouter>
        <Garcom />
      </MemoryRouter>
    );

    expect(screen.getByText('Mesa selecionada:')).toBeInTheDocument();
    expect(screen.getByText('Mesa 5')).toBeInTheDocument();
  });

  it('navega para /cardapio ao clicar no botão "Voltar ao Cardápio"', () => {
    render(
      <MemoryRouter>
        <Garcom />
      </MemoryRouter>
    );

    // Existem dois botões "Voltar ao Cardápio": top e bottom
    const botoes = screen.getAllByText('Voltar ao Cardápio');
    fireEvent.click(botoes[0]);
    expect(mockedNavigate).toHaveBeenCalledWith('/cardapio');

    mockedNavigate.mockClear();
    fireEvent.click(botoes[1]);
    expect(mockedNavigate).toHaveBeenCalledWith('/cardapio');
  });
});
