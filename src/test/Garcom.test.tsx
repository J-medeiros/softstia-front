import React from "react";
import { render, screen } from '@testing-library/react';
import { Garcom } from '../paginas/Garcom';
import { MemoryRouter, Route, Routes } from 'react-router-dom';

describe('Garcom', () => {
  it('deve exibir o número da mesa', () => {
    render(
      <MemoryRouter initialEntries={['/garcom/10']}>
        <Routes>
          <Route path="/garcom/:mesa" element={<Garcom />} />
        </Routes>
      </MemoryRouter>
    );
    expect(screen.getByText(/Mesa selecionada/i)).toBeInTheDocument();
    expect(screen.getByText('10')).toBeInTheDocument();
  });
});