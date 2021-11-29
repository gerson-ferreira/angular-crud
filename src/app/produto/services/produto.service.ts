import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { BaseService } from 'src/app/services/base.service';
import { Produto, Fornecedor } from '../models/produto';

@Injectable()
export class ProdutoService extends BaseService {
  constructor(private http: HttpClient) {
    super();
  }

  obterTodos(): Observable<Produto[]> {
    return this.http
      .get<Produto[]>(this.UrlServiceV1 + 'produto/listar.php')
      .pipe(catchError(super.serviceError));
  }

  obterPorId(id: string): Observable<Produto> {
    return this.http
      .get<Produto>(this.UrlServiceV1 + 'produto/carregar.php?id=' + id)
      .pipe(catchError(super.serviceError));
  }

  novoProduto(produto: Produto): Observable<Produto> {
    return this.http
      .post(this.UrlServiceV1 + 'produto/novo.php', produto)
      .pipe(map(super.extractData), catchError(super.serviceError));
  }

  excluirProduto(id: string): Observable<Produto> {
    return this.http
        .delete(this.UrlServiceV1 + "produto/excluir.php?id=" + id, super.ObterAuthHeaderJson())
        .pipe(
            map(super.extractData),
            catchError(super.serviceError));
}

  atualizarProduto(produto: Produto): Observable<Produto> {
    return this.http
      .put(this.UrlServiceV1 + 'produto/' + produto.id, produto)
      .pipe(map(super.extractData), catchError(super.serviceError));
  }
}
