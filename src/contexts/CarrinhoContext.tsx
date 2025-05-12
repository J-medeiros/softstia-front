import { createContext, useContext, useState, ReactNode } from 'react';

interface ItemCarrinho {
  id: number;
  nome: string;
  preco: number;
  quantidade: number;
  imagem: string;
}

interface CarrinhoContextData {
  itens: ItemCarrinho[];
  adicionarItem: (item: Omit<ItemCarrinho, 'quantidade'>) => void;
  removerItem: (id: number) => void;
  atualizarQuantidade: (id: number, quantidade: number) => void;
  limparCarrinho: () => void;
}

const CarrinhoContext = createContext<CarrinhoContextData>({} as CarrinhoContextData);

export function CarrinhoProvider({ children }: { children: ReactNode }) {
  const [itens, setItens] = useState<ItemCarrinho[]>([]);

  const adicionarItem = (item: Omit<ItemCarrinho, 'quantidade'>) => {
    setItens(prevItens => {
      const itemExistente = prevItens.find(i => i.id === item.id);
      
      if (itemExistente) {
        return prevItens.map(i =>
          i.id === item.id ? { ...i, quantidade: i.quantidade + 1 } : i
        );
      }
      
      return [...prevItens, { ...item, quantidade: 1 }];
    });
  };

  const removerItem = (id: number) => {
    setItens(prevItens => prevItens.filter(item => item.id !== id));
  };

  const atualizarQuantidade = (id: number, quantidade: number) => {
    if (quantidade < 1) return;
    
    setItens(prevItens =>
      prevItens.map(item =>
        item.id === id ? { ...item, quantidade } : item
      )
    );
  };

  const limparCarrinho = () => {
    setItens([]);
  };

  return (
    <CarrinhoContext.Provider value={{ itens, adicionarItem, removerItem, atualizarQuantidade, limparCarrinho }}>
      {children}
    </CarrinhoContext.Provider>
  );
}

export function useCarrinho() {
  const context = useContext(CarrinhoContext);
  if (!context) {
    throw new Error('useCarrinho deve ser usado dentro de um CarrinhoProvider');
  }
  return context;
} 