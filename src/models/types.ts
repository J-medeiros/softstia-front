export interface Mesa {
  id?: number;
  numero: number;
  responsavel: string;
}
export interface ProdutoCarrinho {
  id_produto: number;
  nome: string;
  descricao: string;
  image: string;
  quantidade: number;
  totalvalor: number;
  mesa: number;
}
export interface Produto {
  id: number;
  nome: string;
  valor: number;
  image: string;
  categoria: string;
}

export interface ProdutoResponse {
  success: boolean;
  message: string;
  data: Produto[];
  totalCount: number;
}
export interface PedidoInput {
  idMesa: number;
  idProduto: number;
}
