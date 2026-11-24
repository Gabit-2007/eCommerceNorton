import { Injectable, inject } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'

import { Cliente } from '../model/cliente'
import { API_URL } from './api'

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  private http = inject(HttpClient)

  // POST /api/cliente -> devolve texto: "Cliente gravado com sucesso! <codigo>"
  gravar(obj: Cliente): Observable<string> {
    return this.http.post(`${API_URL}/cliente`, obj, { responseType: 'text' })
  }

  // PUT /api/cliente -> altera o cliente que tiver o mesmo "codigo"
  alterar(obj: Cliente): Observable<string> {
    return this.http.put(`${API_URL}/cliente`, obj, { responseType: 'text' })
  }

  // POST /api/cliente/login -> devolve o Cliente (codigo > 0) ou um Cliente vazio (codigo 0)
  login(obj: Pick<Cliente, 'email' | 'senha'>): Observable<Cliente> {
    return this.http.post<Cliente>(`${API_URL}/cliente/login`, obj)
  }

  resetarSenha(obj: Pick<Cliente, 'email'>): Observable<string> {
    return this.http.patch(`${API_URL}/cliente/resetarSenha`, obj, { responseType: 'text' })
  }

  alterarSenha(obj: Pick<Cliente, 'email' | 'senha' | 'documento'>): Observable<string> {
    return this.http.patch(`${API_URL}/cliente/alterarSenha`, obj, { responseType: 'text' })
  }
}
