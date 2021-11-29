import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProdutoService } from '../services/produto.service';

import { ToastrService } from 'ngx-toastr';

import { Produto } from '../models/produto';

@Component({
  selector: 'app-excluir',
  templateUrl: './excluir.component.html'
})
export class ExcluirComponent  {

  produto: Produto;
  tamanho: string;
  fabricacao: string;


  constructor(private produtoService: ProdutoService,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService) {

    this.produto = this.route.snapshot.data['produto'];

    switch (this.produto.tamanho) {
      case 'P':
        this.tamanho = 'Pequeno';
        break;
      case 'M':
        this.tamanho = 'Médio';
        break;
      case 'G':
        this.tamanho = 'Grande';
    }

    switch (this.produto.fabricacao) {
      case 'N':
        this.fabricacao = 'Nacional';
        break;
      case 'I':
        this.fabricacao = 'Importado';
        break;
    }
  }

  public excluirProduto() {
    this.produtoService.excluirProduto(this.produto.id)
      .subscribe(
      evento => { this.sucessoExclusao(evento) },
      ()     => { this.falha() }
      );
  }

  public sucessoExclusao(evento: any) {

    const toast = this.toastr.success('Produto excluido com Sucesso!', 'Good bye :D');
    if (toast) {
      toast.onHidden.subscribe(() => {
        this.router.navigate(['/produtos/listar-todos']);
      });
    }
  }

  public falha() {
    this.toastr.error('Houve um erro no processamento!', 'Ops! :(');
  }
}

