import { createContext, useContext, useState } from 'react';

interface MesaContextType {
  mesa: number | null;
  setMesa: (mesa: number) => void;
}

export const MesaContext = createContext<MesaContextType>({ mesa: null, setMesa: () => {} });
export const useMesa = () => useContext(MesaContext);

export function MesaProvider({ children }: { children: React.ReactNode }) {
  const [mesa, setMesa] = useState<number | null>(null);
  return (
    <MesaContext.Provider value={{ mesa, setMesa }}>
      {children}
    </MesaContext.Provider>
  );
} 