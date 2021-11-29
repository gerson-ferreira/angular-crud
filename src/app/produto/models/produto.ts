import { StringMap } from "@angular/compiler/src/compiler_facade_interface";

export interface Produto {
  id: string,
  nome: string,
  descricao: string,
  fabricacao: string,
  tamanho: String,
  valor: number
}

export interface Fornecedor{
  id: string,
  nome: string,
}
