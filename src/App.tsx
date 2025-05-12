import { BrowserRouter } from 'react-router-dom';
import { CarrinhoProvider } from './contexts/CarrinhoContext';
import { Router } from './Router';
import { MesaProvider } from './contexts/MesaContext';

export function App() {
  return (
    <BrowserRouter>
      <MesaProvider>
        <CarrinhoProvider>
          <Router />
        </CarrinhoProvider>
      </MesaProvider>
    </BrowserRouter>
  );
}