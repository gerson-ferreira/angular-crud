import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { BaseService } from 'src/app/services/base.service';

import { Cliente } from '../models/cliente';

@Injectable()
export class ClienteService extends BaseService {
  cliente: Cliente = new Cliente();

  constructor(private http: HttpClient) {
    super();
  }

  obterTodos(): Observable<Cliente[]> {
    return this.http
      .get<Cliente[]>(this.UrlServiceV1 + 'cliente/listar.php')
      .pipe(catchError(super.serviceError));
  }

  obterPorId(id: string): Observable<Cliente> {
    return this.http
      .get<Cliente>(
        this.UrlServiceV1 + 'cliente/carregar.php?id=' + id
      )
      .pipe(catchError(super.serviceError));
  }

  novoCliente(cliente: Cliente): Observable<Cliente> {
    return this.http
      .post(this.UrlServiceV1 + 'cliente/novo.php', cliente)
      .pipe(map(super.extractData), catchError(super.serviceError));
  }

  atualizarCliente(cliente: Cliente): Observable<Cliente> {
    return this.http
      .put(
        this.UrlServiceV1 + 'cliente/atualizar.php?id=' + cliente.id,
        cliente
      )
      .pipe(map(super.extractData), catchError(super.serviceError));
  }

  excluirCliente(id: string): Observable<Cliente> {
    return this.http
      .delete(this.UrlServiceV1 + 'cliente/excluir.php?id=' + id)
      .pipe(map(super.extractData), catchError(super.serviceError));
  }
}
