import { Component } from '@angular/core';
import { Produto } from '../models/produto';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-detalhes',
  templateUrl: './detalhes.component.html',
})
export class DetalhesComponent {
  produto: Produto;
  tamanho: string;
  fabricacao: string;

  constructor(private route: ActivatedRoute) {
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
}
