export interface Produto {
  codigo: number
  nome: string
  descritivo: string
  valor: number
  valorPromo: number
  quantidade: number
  destaque: number
}

export type ProdutoForm = Omit<Produto, 'codigo'>