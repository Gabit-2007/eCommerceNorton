
import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Pedido, NovoPedido } from '../model/pedido';
import { API_URL } from './api';

@Injectable({
  providedIn: 'root'
})
export class PedidoService {

  private http = inject(HttpClient);

  private readonly apiUrl = API_URL;

  // Buscar pedido pelo código
  buscarPorCodigo(codigo: number): Observable<Pedido> {
    return this.http.get<Pedido>(
      `${this.apiUrl}/pedido/${codigo}`
    );
  }

  // Cadastrar pedido
  criarPedido(pedido: NovoPedido): Observable<string> {
    return this.http.post(
      `${this.apiUrl}/pedido`,
      pedido,
      { responseType: 'text' }
    );
  }

  // Alterar pedido
  atualizarPedido(pedido: Pedido): Observable<string> {
    return this.http.put(
      `${this.apiUrl}/pedido`,
      pedido,
      { responseType: 'text' }
    );
  }

  // Excluir pedido
  excluirPedido(codigo: number): Observable<string> {
    return this.http.delete(
      `${this.apiUrl}/pedido/${codigo}`,
      { responseType: 'text' }
    );
  }
}
