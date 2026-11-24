
import { Injectable, inject } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'

import { Produto, ProdutoForm } from '../model/produto'
import { API_URL } from './api'

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {

  private http = inject(HttpClient)

  private readonly apiUrl = API_URL

  // Buscar produto pelo código
  buscarPorCodigo(codigo: number): Observable<Produto> {
    return this.http.get<Produto>(
      `${this.apiUrl}/produto/${codigo}`
    )
  }

  // Listar todos os produtos
  listar(): Observable<Produto[]> {
    return this.http.get<Produto[]>(
      `${this.apiUrl}/produtos`
    )
  }

  // Carregar produtos da vitrine
  carregarVitrine(): Observable<Produto[]> {
    return this.http.get<Produto[]>(
      `${this.apiUrl}/produto/vitrine`
    )
  }

  // Pesquisar produtos
  buscar(termo: string): Observable<Produto[]> {
    return this.http.get<Produto[]>(
      `${this.apiUrl}/produto/busca/${encodeURIComponent(termo)}`
    )
  }

  // Cadastrar produto
  cadastrar(produto: ProdutoForm): Observable<string> {
    return this.http.post(
      `${this.apiUrl}/produto`,
      produto,
      { responseType: 'text' }
    )
  }

  // Alterar produto
  alterar(produto: Produto): Observable<string> {
    return this.http.put(
      `${this.apiUrl}/produto`,
      produto,
      { responseType: 'text' }
    )
  }

  // Excluir produto
  excluir(codigo: number): Observable<string> {
    return this.http.delete(
      `${this.apiUrl}/produto/${codigo}`,
      { responseType: 'text' }
    )
  }
}
